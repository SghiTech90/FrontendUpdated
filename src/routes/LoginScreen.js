import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
  Linking,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {loginApi} from '../Api/loginApi';
import {Toaster} from '../components/Toast';
import {
  setAsyncRoleId,
  setAsyncUserEmail,
  setAsyncUserId,
  setAsyncUserMobile,
  setAsyncUserName,
} from '../../utils/AsyncStorage';
import NetInfo from '@react-native-community/netinfo';

const LoginScreen = ({navigation, route}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState(null);
  const {selectedLocation} = route.params || {};
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUserLocationId = async () => {
      try {
        const storedLocation = await AsyncStorage.getItem('LOCATION_ID');
        if (storedLocation) {
          setLocation(storedLocation);
        } else {
          console.error('Error: Retrieved location is null or undefined');
        }
      } catch (error) {
        console.error('Error fetching user location ID:', error);
      }
    };

    fetchUserLocationId();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Toaster('Please enter Registered UserId and Password.');
      return;
    }
    try {
      const data = await loginApi({
        userId: email,
        password: password,
        office: location,
      });

      if (data && data.success === true) {
        await setAsyncUserId(data.userId);
        await setAsyncRoleId(data.post);
        await setAsyncUserName(data.Name);
        if (data.email) {
          await setAsyncUserEmail(data.email);
        }
        if (data.mobileNo) {
          await setAsyncUserMobile(data.mobileNo);
        }
        navigation.navigate('OtpScreen', {
          userId: data.userId,
          userPhoneNum: data.mobileNo,
          selectedLocation: selectedLocation,
        });
      } else {
        Toaster('Invalid Credentials, Please Try Again.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Toaster('Login Failed', 'Please check your credentials.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isConnected && (
        <View style={styles.noInternetContainer}>
          <Text style={styles.noInternetText}>No Internet Connection</Text>
        </View>
      )}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
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
              <Text style={styles.title}>
                Goverment of Maharastra,{'\n'}Log in!
              </Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Icon name="user" size={20} color="gray" style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter Email"
                  value={email}
                  onChangeText={val => setEmail(val)}
                  autoCapitalize="none"
                  placeholderTextColor="gray"
                />
              </View>
              <View style={styles.line} />

              <View style={styles.inputContainer}>
                <Icon name="lock" size={20} color="gray" style={styles.icon} />

                <TextInput
                  style={styles.input}
                  placeholder="Enter Password"
                  value={password}
                  onChangeText={val => setPassword(val)}
                  secureTextEntry={true}
                  placeholderTextColor="gray"
                />
              </View>
              <View style={styles.line} />

              <TouchableOpacity
                onPress={() => {
                  handleLogin();
                }}
                activeOpacity={0.8}
                style={styles.signInButton}>
                <Text style={styles.signInText}>Log In</Text>
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
                      Linking.openURL('https://www.circle.pwdwispune.com')
                    }
                    style={styles.linkText}>
                    {' '}
                    www.circle.pwdwispune.com
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
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
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    color: 'black',
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    textAlignVertical: 'center',
    color: 'black',
  },
  icon: {
    marginRight: 10,
  },
  line: {
    height: 1,
    backgroundColor: '#ddd',
    marginBottom: 15,
  },
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
    top: 30,
  },
  signInText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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
  signUpText: {
    color: 'white',
    fontSize: 15,
    top: 80,
  },
  linkText: {
    color: 'white',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  noInternetContainer: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  noInternetText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
