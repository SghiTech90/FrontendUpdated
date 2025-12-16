import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userId = await AsyncStorage.getItem('USER_ID');

        setTimeout(() => {
          if (userId) {
            navigation.replace('HomeScreen');
          } else {
            navigation.replace('DashBoardScreen');
          }
        }, 3000);
      } catch (error) {
        console.error('Error checking login status:', error);
        navigation.replace('DashBoardScreen');
      }
    };
    checkLoginStatus();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.imageRow}>
        <Image
          source={require('../assets/images/smartbudgetSplash.png')}
          style={[styles.logo, { height: 140, width: 130 }]}
        />
        <Image
          source={require('../assets/images/maharashtra.png')}
          style={styles.logo}
        />
      </View>
      <Text style={styles.msTxt}> महाराष्ट्र शासन</Text>
      <View style={{ width: '80%' }}>
        <Text style={styles.message}>
          आपण Smart Budget ॲपमध्ये यशस्वीरित्या प्रवेश {'\n'} केला आहे. आपली
          माहिती सुरक्षित आहे. {'\n'} आपल्या कामासाठी आवश्यक असलेले {'\n'}
          अपडेट्स आणि सेवा येथे सहज {'\n'}उपलब्ध आहेत.
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.footerRow}>
          <Text
            style={[
              styles.message,
              { fontSize: 11, color: 'black', textAlign: 'left', flex: 1, fontWeight:'bold'},
            ]}
          >
            Copyright@ 2025 All rights reserved by {'\n'}
            Public Work Department Maharashtra {'\n'}
            Design by SWAPSOFT SGHITECH PVT, LTD
          </Text>
          <Text style={styles.versionText}>V 2.0</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  message: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    top: 20,
    padding: 10,
  },
  msTxt: {
    color: 'orange',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    top: '24%',
    paddingHorizontal: 20,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  versionText: {
    fontSize: 12,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'right',
    top: 20,
  },
});

export default SplashScreen;