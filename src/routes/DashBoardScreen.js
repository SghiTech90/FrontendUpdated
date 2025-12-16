import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Menu from 'react-native-vector-icons/Entypo';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';

const leaders = [
  {
    name: 'मा.ना.श्री.देवेंद्र फडणवीस',
    position: 'मुख्यमंत्री, महाराष्ट्र राज्य',
    image: require('../assets/images/Devendra-Fadnavis.png'),
  },
  {
    name: 'मा. ना. श्री.एकनाथ शिंदे',
    position: 'उपमुख्यमंत्री, महाराष्ट्र राज्य',
    image: require('../assets/images/Eknath.png'),
  },
  {
    name: 'मा. ना. श्री.अजित पवार',
    position: 'उपमुख्यमंत्री, महाराष्ट्र राज्य',
    image: require('../assets/images/aaaa.png'),
  },
  {
    name: 'मा. ना.श्री. शिवेंद्रसिंहराजे भोसले',
    position: 'मंत्री, सार्वजनिक बांधकाम, महाराष्ट्र राज्य',
    image: require('../assets/images/raje11.png'),
  },
];

const sliderImages = [
  require('../assets/images/firstimage.jpg'),
  require('../assets/images/secondimage.jpg'),
  require('../assets/images/Thiredimage.jpg'),
  require('../assets/images/Fourthimg.jpg'),
  // require('../assetss/images/slider2.png'),
  // require('../assets/images/slider3.png'),
];

const DashBoardScreen = ({navigation, route}) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % sliderImages.length;
        if (flatListRef.current) {
          flatListRef.current.scrollToIndex({
            index: nextIndex,
            animated: true,
            viewPosition: 0.5,
          });
        }
        return nextIndex;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <HeaderComponent />

      <View style={styles.leaderContainer}>
        {leaders.map((leader, index) => (
          <View key={index} style={styles.leaderCard}>
            <Image style={styles.leaderImg} source={leader.image} />
            <View style={styles.leaderNameContainer}>
              <Text style={styles.leaderName}>{leader.name}</Text>
              <Text style={styles.leaderPosition}>{leader.position}</Text>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.menuContainer}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate('LocationScreen');
        }}>
        <Menu name="menu" size={40} color="orange" />
      </TouchableOpacity>

      <View style={styles.greenSection}>
        <FlatList
          ref={flatListRef}
          data={sliderImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => (
            <View style={{width: 420, height: 200}}>
              <Image source={item} style={styles.sliderImage} />
            </View>
          )}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          {sliderImages.map((_, index) => (
            <View
              key={index}
              style={{
                height: 8,
                width: 8,
                borderRadius: 4,
                backgroundColor: currentIndex === index ? 'orange' : '#ccc',
                margin: 5,
              }}
            />
          ))}
        </View>
      </View>
      <FooterComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
  },
  leaderContainer: {
    width: '95%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  //   leaderCard: {
  //    width: '25%',
  //    alignItems: 'center',
  //    marginVertical: 5,
  //    borderWidth: 2,
  //    borderColor: 'black',
  //    borderRadius: 10,
  //    padding: 5,
  //   },
  leaderCard: {
    width: '42%',
    backgroundColor: '#fff8f0',
    alignItems: 'center',
    margin: 8,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffa500',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  // leaderImg: {
  //   height: 65,
  //   width: 65,
  //   borderRadius: 40,
  //    borderWidth: 2,
  //  borderColor: 'black',
  //  },
  leaderImg: {
    height: 70,
    width: 70,
    borderRadius: 35,
  },
  leaderNameContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
  leaderName: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  leaderPosition: {
    color: 'black',
    fontSize: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  greenSection: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '10%',
  },
  menuContainer: {
    padding: 10,
    bottom: 30,
    right: 10,
    alignSelf: 'flex-end',
  },
  sliderImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderWidth: 3,
    borderColor: 'black',
  },
});

export default DashBoardScreen;
