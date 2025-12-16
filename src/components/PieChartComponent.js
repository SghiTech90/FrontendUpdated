import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const locationLabels = {
  P_W_Division_Akola: 'सा. बां. विभाग, अकोला',
  P_W_Division_WBAkola: 'जा. बँ. प्रकल्प विभाग, अकोला',
  P_W_Division_Washim: 'सा. बां. विभाग, वाशिम',
  P_W_Division_Buldhana: 'सा. बां. विभाग, बुलढाणा',
  P_W_Division_Khamgaon: 'सा. बां. विभाग, खामगांव',
};

const PieChartComponent = ({data, selectedLocationId}) => {
  const locationLabel = locationLabels[selectedLocationId] || '';
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const pieData = data.map((item, index) => {
  const percentage = ((item.value / total) * 100).toFixed(1);
    return {
      // name: `${item.label} (${percentage}%)`,
      name: `${item.label}`,
      population: item.value,
      color: `hsl(${(index * 360) / data.length}, 70%, ${
        index % 2 === 0 ? '55%' : '65%'
      })`,
      legendFontColor: '#333',
      legendFontSize: 13,
    };
  });

  return (
    <View style={styles.container}>
      {locationLabel !== '' && (
        <Text style={styles.title}>{locationLabel}</Text>
      )}
      <Text style={styles.subtitle}>उपविभाग नुसार कामे</Text>

      <View style={{position: 'relative'}}>
        <PieChart
          data={pieData}
          width={screenWidth - 20}
          height={250}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
});

export default PieChartComponent;
