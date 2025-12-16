import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  PanResponder,
  Animated,
} from 'react-native';

const {width} = Dimensions.get('window');
const CONTAINER_HEIGHT = 370;
const CENTER_RADIUS = 70;
const ITEM_RADIUS = 42;
const ORBIT_RADIUS = 165;

const CircularSociogram = ({onFocusChange}) => {
  const centerX = width / 2;
  const centerY = CONTAINER_HEIGHT / 2;

  const angleOffset = useRef(new Animated.Value(0)).current;
  const [highlightIndex, setHighlightIndex] = useState(0);
  const panStart = useRef(0);

  const data = [
    {
      label: 'सा. बां. विभाग, अकोला',
      value: 'P_W_Division_Akola',
      color: '#A066FF',
    },
    {
      label: 'जा. बँ. प्रकल्प विभाग, अकोला',
      value: 'P_W_Division_WBAkola',
      color: '#2EC4B6',
    },
    {
      label: 'सा. बां. विभाग, वाशिम',
      value: 'P_W_Division_Washim',
      color: '#FF6B6B',
    },
    {
      label: 'सा. बां. विभाग, बुलढाणा',
      value: 'P_W_Division_Buldhana',
      color: '#FFD93D',
    },
    {
      label: 'सा. बां. विभाग, खामगांव',
      value: 'P_W_Division_Khamgaon',
      color: '#00A8E8',
    },
    {label: 'सा. बां. मं, अकोला', value: 'P_W_Circle_Akola', color: '#FF9F1C'},
  ];

  const visibleArc = Math.PI;
  const anglePerItem = visibleArc / (data.length - 1.5);
  const startAngle = Math.PI;

  const currentAngleOffset = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        angleOffset.stopAnimation(value => {
          panStart.current = value;
          currentAngleOffset.current = value;
        });
      },
      onPanResponderMove: (_, gestureState) => {
        let newOffset = panStart.current - gestureState.dx / 150;
        // newOffset = Math.max(0, Math.min(data.length - 1, newOffset));
        const maxOffset = data.length - 1;
        newOffset = Math.max(0, Math.min(maxOffset, newOffset));
        angleOffset.setValue(newOffset);
        currentAngleOffset.current = newOffset;
        setHighlightIndex(Math.round(newOffset));
      },
      onPanResponderRelease: () => {
        const index = Math.round(currentAngleOffset.current);
        const clampedIndex = Math.max(0, Math.min(data.length - 1, index));
        Animated.spring(angleOffset, {
          toValue: clampedIndex,
          useNativeDriver: false,
          friction: 6,
          tension: 40,
        }).start();
        setHighlightIndex(clampedIndex);
        currentAngleOffset.current = clampedIndex;
      },
    }),
  ).current;

  useEffect(() => {
    const id = angleOffset.addListener(() => {
      setHighlightIndex(Math.round(currentAngleOffset.current));
    });
    return () => {
      angleOffset.removeListener(id);
    };
  }, [angleOffset]);

  useEffect(() => {
    if (onFocusChange && data[highlightIndex]) {
      onFocusChange(data[highlightIndex].value);
    }
  }, [highlightIndex]);

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <View
        style={[
          styles.centerCircle,
          {
            top: centerY - CENTER_RADIUS,
            left: centerX - CENTER_RADIUS,
          },
        ]}>
        <Text style={styles.centerText}>सार्वजनिक बांधकाम विभाग अकोला</Text>
      </View>

      {data.map((item, index) => {
        const offsetValue = currentAngleOffset.current;
        const angle = startAngle + anglePerItem * (index - offsetValue);

        const scale = index === highlightIndex ? 1.4 : 1;

        const x =
          centerX + ORBIT_RADIUS * Math.cos(angle) - ITEM_RADIUS * scale;
        const y =
          centerY + ORBIT_RADIUS * Math.sin(angle) - ITEM_RADIUS * scale;

        const zIndex =
          Math.round(1000 + 100 * Math.sin(angle)) +
          (index === highlightIndex ? 1000 : 0);

        return (
          <View
            key={item.value}
            style={[
              styles.itemWrapper,
              {
                left: x,
                top: y,
                zIndex,
              },
            ]}>
            <Animated.View
              style={[
                styles.itemCircle,
                {
                  backgroundColor: item.color,
                  transform: [{scale}],
                  borderColor: index === highlightIndex ? '#fff' : '#ccc',
                  shadowOpacity: index === highlightIndex ? 0.5 : 0.3,
                  shadowRadius: index === highlightIndex ? 10 : 5,
                },
              ]}>
              <Text
                style={[
                  styles.itemText,
                  {
                    fontSize: index === highlightIndex ? 14 : 12,
                  },
                ]}
                numberOfLines={2}>
                {item.label}
              </Text>
            </Animated.View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: CONTAINER_HEIGHT,
    width: '100%',
    // backgroundColor: '#E9F8FF',
    position: 'relative',
    paddingTop: 30,
  },
  centerCircle: {
    position: 'absolute',
    width: CENTER_RADIUS * 2,
    height: CENTER_RADIUS * 2,
    borderRadius: CENTER_RADIUS,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 10,
  },
  centerText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  itemWrapper: {
    position: 'absolute',
    width: ITEM_RADIUS * 2 * 1.5,
    height: ITEM_RADIUS * 2 * 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCircle: {
    width: ITEM_RADIUS * 2,
    height: ITEM_RADIUS * 2,
    borderRadius: ITEM_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    elevation: 10,
  },
  itemText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CircularSociogram;
