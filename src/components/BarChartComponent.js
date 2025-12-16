import React from 'react';
import {View, ScrollView, Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: () => '#333',
  style: {
    borderRadius: 16,
  },
  propsForBackgroundLines: {
    stroke: '#ccc',
    strokeDasharray: '',
  },
};

const BarChartComponent = ({data}) => {
  const labels = data.map(item =>
    item.label.length > 10 ? item.label.slice(0, 10) + '…' : item.label,
  );
  const values = data.map(item => item.value);

  const randomColor = index => {
    const colors = [
      '#4682B4',
      '#6B5B95',
      '#88B04B',
      '#FFA07A',
      '#20B2AA',
      '#FFB347',
      '#DC143C',
      '#00CED1',
      '#FF3366',
      '#FF8C00',
      '#20B2AA',
      '#FFD700',
      '#FF4500',
      '#32CD32',
      '#4682B4',
    ];
    return colors[index % colors.length];
  };

  const colors = data.map((_, index) => randomColor(index));
  const dynamicWidth = Math.max(screenWidth, data.length * 60);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        style={{
          borderRadius: 30,
          borderColor: '#ffa500',
          borderWidth: 5,
          marginTop: 50,
        }}>
        <BarChart
          data={{
            labels,
            datasets: [
              {
                data: values,
                colors: colors.map(c => () => c),
              },
            ],
          }}
          width={dynamicWidth}
          height={280}
          chartConfig={chartConfig}
          fromZero
          withInnerLines
          showValuesOnTopOfBars={true}
          verticalLabelRotation={0}
          yAxisSuffix=""
          withCustomBarColorFromData={true}
          segments={8}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default BarChartComponent;
