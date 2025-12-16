import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Linking,
} from 'react-native';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
import {OtpInput} from 'react-native-otp-entry';
import {resendOtpApi, verificationOtpSendApi} from '../Api/loginApi';
import {useRoute} from '@react-navigation/native';
import {Toaster} from '../components/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpScreen = ({navigation}) => {
  const route = useRoute();
  const [timer, setTimer] = useState(120);
  const [showResend, setShowResend] = useState(false);
  const [otp, setOtp] = useState('');
  const {userId, userPhoneNum} = route.params;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTime => prevTime - 1);
      }, 1000);
    } else {
      setShowResend(true);
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const fetchUserLocationId = async () => {
      try {
        const storedLocation = await AsyncStorage.getItem("LOCATION_ID");
        if (storedLocation) {
          setLocation(storedLocation);
        } else {
          console.error("Error: Retrieved location is null or undefined");
        }
      } catch (error) {
        console.error("Error fetching user location ID:", error);
      }
    };

    fetchUserLocationId();
  }, []);

  const handleOtp = async () => {
    try {
      const data = await verificationOtpSendApi({
        userId: route.params.userId,
        otp: otp,
      });
      if (data && data.success === true) {
        const role = await AsyncStorage.getItem('userRole');
        navigation.navigate('HomeScreen');
      } else {
        Toaster('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
      Toaster('OTP Verification Failed. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    try {
      const data = await resendOtpApi({
        userId: userId,
        office: location,
        // mobileNo: userPhoneNum,
      });
      if (data && data.sucess === 'true') {
        Toaster('Valied OTP');
      } else {
        Toaster('Invalid OTP');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Toaster('Login Failed', 'Please check your credentials.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.topWaveContainer}>
        <Svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={styles.svgWave}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0%" stopColor="#00c6ff" />
              <Stop offset="100%" stopColor="#0072ff" />
            </LinearGradient>
          </Defs>
          <Path
            fill="url(#grad)"
            d="M0,96L80,112C160,128,320,160,480,154.7C640,149,800,107,960,101.3C1120,96,1280,128,1360,144L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </Svg>
        <Text style={styles.title}>Enter OTP</Text>
      </View>

      <View style={styles.formContainer}>
        <OtpInput numberOfDigits={6} onTextChange={text => setOtp(text)} />

        <View style={styles.timerContainer}>
          {showResend ? (
            <TouchableOpacity
              onPress={() => {
                handleResendOtp();
              }}>
              <Text style={styles.resendText}>
                Didn’t get OTP?{'   '}
                <Text style={styles.resendButton}>Resend OTP</Text>
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.timerText}>Resend OTP in {timer}s</Text>
          )}
        </View>

        <TouchableOpacity
          onPress={() => {
            handleOtp();
          }}
          activeOpacity={0.8}
          style={styles.signInButton}>
          <Text style={styles.signInText}>Submit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomWaveContainer}>
        <Svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          style={styles.svgBottomWave}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0%" stopColor="#00c6ff" />
              <Stop offset="100%" stopColor="#0072ff" />
            </LinearGradient>
          </Defs>
          <Path
            fill="url(#grad)"
            d="M0,192 C360,280 720,80 1080,160 C1440,240 1440,120 1440,120 L1440,320 L0,320 Z"
          />
        </Svg>

        <View>
          <Text style={styles.signUpText}>
            Don't have an account? Plz visit{'\n'}
            <Text
              onPress={() =>
                Linking.openURL('https://circle.pwdwispune.com/')
              }
              style={styles.linkText}>
              {' '}
              www.circle.pwdwispune.com
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  topWaveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 330,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
  },
  svgWave: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '180%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
    position: 'absolute',
    top: 80,
    left: 20,
  },
  formContainer: {flex: 1, justifyContent: 'center', paddingHorizontal: 25},
  signInButton: {
    backgroundColor: '#00c6ff',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
    top: 50,
  },
  signInText: {color: 'white', fontSize: 18, fontWeight: 'bold'},
  timerContainer: {alignItems: 'center', marginVertical: 10, top: 30},
  timerText: {color: 'red', fontSize: 16, fontWeight: 'bold'},
  resendText: {color: 'red', fontSize: 16, fontWeight: 'bold'},
  resendButton: {
    color: 'orange',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  bottomWaveContainer: {
    height: 150,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  svgBottomWave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '170%',
  },
  signUpText: {color: 'white', fontSize: 15, top: 80},
  linkText: {
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default OtpScreen;
