import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const HeaderComponent = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        style={styles.mainLogoImg}
        source={require('../assets/images/maharashtra.png')}
      />
      <View style={styles.mainTxt}>
        <Text style={styles.msTxt}>महाराष्ट्र शासन</Text>
        <Text style={styles.govTxt}>
          सार्वजनिक बांधकाम प्रादेशिक विभाग, अमरावती {'\n'}
          सार्वजनिक बांधकाम मंडळ, अकोला
        </Text>
      </View>
      <Image
        style={styles.mainLogoImg}
        source={require('../assets/images/smartbudget_logo_circle.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainLogoImg: {
    height: 70,
    width: 70,
    resizeMode: 'contain',
  },
  mainTxt: {
    width: '60%',
    alignItems: 'center',
  },
  msTxt: {
    color: 'orange',
    fontSize: 20,
    fontWeight: 'bold',
  },
  govTxt: {
    color: 'black',
    fontSize: 11,
    textAlign: 'center',
    fontWeight:'bold'
  },
});

export default HeaderComponent;