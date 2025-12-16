import React, {useState} from 'react';
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
import {Dropdown} from 'react-native-element-dropdown';
import {Toaster} from '../components/Toast';
import {setAsyncUserLocationId} from '../../utils/AsyncStorage';

const LocationScreen = ({navigation}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    {label: 'सा. बां. मंडळ, अकोला', value: 'P_W_Circle_Akola'},
    {label: 'सा. बां. विभाग, अकोला', value: 'P_W_Division_Akola'},
    {label: 'जा. बँ. प्रकल्प विभाग, अकोला', value: 'P_W_Division_WBAkola'},
    {label: 'सा. बां. विभाग, वाशिम', value: 'P_W_Division_Washim'},
    {label: 'सा. बां. विभाग, बुलढाणा', value: 'P_W_Division_Buldhana'},
    {label: 'सा. बां. विभाग, खामगांव', value: 'P_W_Division_Khamgaon'},
  ];

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
        <Text style={styles.title}>Select Location</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.ofcTxt}> Select Office </Text>
        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
        <TouchableOpacity
          onPress={async () => {
            if (value) {
              try {
                await setAsyncUserLocationId(value);
                navigation.navigate('LoginScreen');
              } catch (error) {
                console.error('Error storing location:', error);
              }
            } else {
              Toaster('Please select a location first');
            }
          }}
          activeOpacity={0.8}
          style={styles.signInButton}>
          <Text style={styles.signInText}>Next</Text>
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
              onPress={() => Linking.openURL('https://circle.pwdwispune.com')}
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
  ofcTxt: {
    fontSize: 20,
    left: 20,
    fontWeight: 'bold',
  },
  dropdown: {
    height: 50,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    left: 20,
    top: 30,
    paddingHorizontal: 8,
    marginTop: 10,
    backgroundColor: 'white',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
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
    marginVertical: 20,
    top: 60,
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
});

export default LocationScreen;
