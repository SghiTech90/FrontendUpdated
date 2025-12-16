import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Toaster} from './Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, {Circle} from 'react-native-svg';
import ReactNativeBlobUtil from 'react-native-blob-util';
import XLSX from 'xlsx';
import {Platform} from 'react-native';
import {buildingAllHEADApi} from '../Api/MPRReportApi';
import {CrfMPRreportAllHEADApi} from '../Api/MPRReportApi';
import {ROADAllHEADApi} from '../Api/MPRReportApi';
import {NABARDAllHEADApi} from '../Api/MPRReportApi';
import {AunnityAllHEADApi} from '../Api/MPRReportApi';
import {MASTERHEADWISEREPOSTBuildingApi} from '../Api/ReportApi';
import {MASTERHEADWISEREPOSTCRFApi} from '../Api/ReportApi';
import {MASTERHEADWISEREPOSTAnnuityApi} from '../Api/ReportApi';
import {MASTERHEADWISEREPOSTRoadApi} from '../Api/ReportApi';
import {MASTERHEADWISEREPOSTNabardApi} from '../Api/ReportApi';

const {width, height} = Dimensions.get('window');

const AIModal = ({visible, onClose}) => {
  const translateY = useRef(new Animated.Value(500)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [location, setLocation] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [expandedButtons, setExpandedButtons] = useState(null);
  const [downloading, setDownloading] = useState(false);
  const [selectedButtonColor, setSelectedButtonColor] = useState(null);
  const progress = useRef(new Animated.Value(10)).current;
  const [progressValue, setProgressValue] = useState(10);
  const [selectedSection, setSelectedSection] = useState(null);
  const [showInstruction, setShowInstruction] = useState(false);

  const COLORS = {
    primary: '#007AFF',
    secondary: '#14b8a6',
    background: '#ffffff',
    text: '#333333',
    danger: '#ff5c5c',
  };
  const {width, height} = Dimensions.get('window');

  const locationLabelMap = {
    P_W_Circle_Akola: 'सा. बां. मंडळ, अकोला',
    P_W_Division_Akola: 'सा. बां. विभाग, अकोला',
    P_W_Division_WBAkola: 'जा. बँ. प्रकल्प विभाग, अकोला',
    P_W_Division_Washim: 'सा. बां. विभाग, वाशिम',
    P_W_Division_Buldhana: 'सा. बां. विभाग, बुलढाणा',
    P_W_Division_Khamgaon: 'सा. बां. विभाग, खामगांव',
  };

  const messages = [
    'सार्वजनिक बांधकाम मंडळ,अकोला',
    locationLabelMap[location] || 'सार्वजनिक बांधकाम मंडळ',
    'एआय जनरेट अर्थसंकल्पीय रिपोर्ट २०२५',
  ];

  const staticData = {
    Building: {fileName: 'Building_Report.xlsx'},
    CRF: {fileName: 'CRF_Report.xlsx'},
    Annuity: {fileName: 'Annuity_Report.xlsx'},
    NABARD: {fileName: 'NABARD_Report.xlsx'},
    Road: {fileName: 'Road_Report.xlsx'},
  };

  const HeadWiseData = {
    Building: {fileName: 'Headwise_Building_Report.xlsx'},
    CRF: {fileName: 'Headwise_CRF_Report.xlsx'},
    Annuity: {fileName: 'Headwise_Annuity_Report.xlsx'},
    NABARD: {fileName: 'Headwise_NABARD_Report.xlsx'},
    Road: {fileName: 'Headwise_Road_Report.xlsx'},
  };

  const AllHeadWiseData = {
    Building: {fileName: 'All_Headwise_Building_Report.xlsx'},
    CRF: {fileName: 'All_Headwise_CRF_Report.xlsx'},
    Annuity: {fileName: 'All_Headwise_Annuity_Report.xlsx'},
    NABARD: {fileName: 'All_Headwise_NABARD_Report.xlsx'},
    Road: {fileName: 'All_Headwise_Road_Report.xlsx'},
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedLocation = await AsyncStorage.getItem('LOCATION_ID');
        if (storedLocation) setLocation(storedLocation);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 800,
          easing: Easing.bezier(0.25, 1, 0.5, 1),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();

      setVisibleMessages([]);
      setShowButtons(false);
      setExpandedButtons(null);
      setShowInstruction(false);

      messages.forEach((msg, index) => {
        setTimeout(() => {
          setVisibleMessages(prev => [...prev, msg]);
          if (index === messages.length - 1) {
            setTimeout(() => setShowButtons(true), 1000);
          }
        }, (index + 1) * 1000);
      });
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 500,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const runProgress = () => {
    progress.removeAllListeners();
    const listener = progress.addListener(({value}) => {
      setProgressValue(Math.round(value));
    });

    progress.stopAnimation(() => {
      progress.setValue(10);
      setProgressValue(10);

      Animated.timing(progress, {
        toValue: 100,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start(() => {
        progress.removeListener(listener);
      });
    });
  };

  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        return true;
      }

      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);

        const readGranted =
          granted['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED;
        const writeGranted =
          granted['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED;

        if (!readGranted || !writeGranted) {
          Toaster('Storage permission denied ❌');
          return false;
        }
        return true;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const handleButtonPress = category => {
    const button = buttonData.find(button => button.label === category);
    setSelectedButtonColor(button?.color);
    setExpandedButtons(prev => (prev === category ? null : category));
    setSelectedSection(category);
  };

  const handleSubButtonPress = async (category, sub) => {
    if (downloading) return;
    setDownloading(true);

    const permission = await requestStoragePermission();
    if (!permission) {
      Toaster('Storage permission denied ❌');
      setDownloading(false);
      return;
    }

    Toaster('Excel sheet is downloading... 📥');
    runProgress();

    try {
      let response = null;
      const credentials = {office: location};

      if (category === 'MPR') {
        if (sub === 'Building') {
          response = await buildingAllHEADApi(credentials);
        } else if (sub === 'CRF') {
          response = await CrfMPRreportAllHEADApi(credentials);
        } else if (sub === 'Road') {
          response = await ROADAllHEADApi(credentials);
        } else if (sub === 'Annuity') {
          response = await AunnityAllHEADApi(credentials);
        } else if (sub === 'NABARD') {
          response = await NABARDAllHEADApi(credentials);
        }
      } else if (category === 'Headwise') {
        if (sub === 'Building') {
          response = await MASTERHEADWISEREPOSTBuildingApi(credentials);
        } else if (sub === 'CRF') {
          response = await MASTERHEADWISEREPOSTCRFApi(credentials);
        } else if (sub === 'Road') {
          response = await MASTERHEADWISEREPOSTRoadApi(credentials);
        } else if (sub === 'Annuity') {
          response = await MASTERHEADWISEREPOSTAnnuityApi(credentials);
        } else if (sub === 'NABARD') {
          response = await MASTERHEADWISEREPOSTNabardApi(credentials);
        }
      } else if (category === 'All') {
        if (sub === 'Building') {
          // response = await buildingAllReport(credentials);
        } else if (sub === 'CRF') {
          // response = await CrfAllReportApi(credentials);
        } else if (sub === 'Road') {
          // response = await RoadAllReportApi(credentials);
        } else if (sub === 'Annuity') {
          // response = await AnnuityAllReportApi(credentials);
        } else if (sub === 'NABARD') {
          // response = await NabardAllReportApi(credentials);
        }
      } else if (category === 'Abstract') {
        if (sub === 'Building') {
          // response = await buildingAllReport(credentials);
        } else if (sub === 'CRF') {
          // response = await CrfAllReportApi(credentials);
        } else if (sub === 'Road') {
          // response = await RoadAllReportApi(credentials);
        } else if (sub === 'Annuity') {
          // response = await AnnuityAllReportApi(credentials);
        } else if (sub === 'NABARD') {
          // response = await NabardAllReportApi(credentials);
        }
      } else {
        Toaster(
          'Please select a main category (MPR / Head wise / All/Abstract) ❌',
        );
        setDownloading(false);
        return;
      }

      if (response && response.data) {
        const jsonData = response.data;

        const ws = XLSX.utils.json_to_sheet(jsonData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        const wbout = XLSX.write(wb, {type: 'base64', bookType: 'xlsx'});

        const {dirs} = ReactNativeBlobUtil.fs;

        let fileName = `${category}_${sub}_Report_${Date.now()}.xlsx`;

        if (category === 'MPR' && staticData[sub]) {
          fileName = staticData[sub].fileName;
        } else if (category === 'Head wise' && HeadWiseData[sub]) {
          fileName = HeadWiseData[sub].fileName;
        } else if (category === 'All' && AllHeadWiseData[sub]) {
          fileName = AllHeadWiseData[sub].fileName;
        } else if (category === 'Abstract') {
          fileName = `Abstract${sub}_Report_${Date.now()}.xlsx`;
        }
        const path =
          Platform.OS === 'android'
            ? `${dirs.DownloadDir}/${fileName}`
            : `${dirs.DocumentDir}/${fileName}`;

        await ReactNativeBlobUtil.fs.writeFile(path, wbout, 'base64');

        Toaster(`Download successful Saved to: ${path}`);
      } else {
        Toaster('No data found.');
      }
    } catch (error) {
      console.error('Download error:', error);
      Toaster('Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  const buttonData = [
    {
      label: 'MPR',
      //color: '#F8BBD0',
      color: '#28a745',
      subButtons: ['Building', 'CRF', 'Annuity', 'NABARD', 'Road'],
    },
    {
      label: 'Headwise',
      //color: '#BBDEFB',
      color: '#fa9c19',
      subButtons: ['Building', 'CRF', 'Annuity', 'NABARD', 'Road'],
    },
    {
      label: 'All',
      //color: '#C8E6C9',
      color: '#14b8a6',
      subButtons: ['Building', 'CRF', 'Annuity', 'NABARD', 'Road'],
    },
    {
      label: 'Abstract',
      //color:'#b191ba',
      color: '#a78bfa',
      subButtons: ['Building', 'CRF', 'Annuity', 'NABARD', 'Road'],
    },
  ];

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[styles.modalContainer, {transform: [{translateY}], opacity}]}>
          <LinearGradient
            colors={['#F5D5E0', '#E3F2FD']}
            style={[styles.gradientBackground, {flex: 1}]}>
            {/* 
            <View style={styles.watermarkContainer}>
             <Text style={styles.watermarkText}>AI for महाराष्ट्र</Text> *
          </View> */}

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <View>
              <View style={styles.HeaderText}>
                <Text style={styles.Hedermsg}>महाराष्ट्र शासन</Text>
                <Text style={styles.Hedersubmsg}>
                  सार्वजनिक बांधकाम मंडळ, अकोला
                </Text>
                <Text style={styles.Hedersubmsg}>AI निर्मित अहवाल</Text>
              </View>
            </View>
            <View style={styles.messageContainer}>
              {visibleMessages.map((msg, index) => (
                <View key={index} style={styles.messageBubble}>
                  <Text style={styles.messageText}>{msg}</Text>
                </View>
              ))}
            </View>

            {showButtons && (
              <View>
                <View style={styles.buttonRow}>
                  {buttonData.map((button, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.button, {backgroundColor: button.color}]}
                      onPress={() => handleButtonPress(button.label)}>
                      <Text style={styles.buttonText}>{button.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.instructionBox}>
                  <Text style={styles.instructionText}>
                    Please select an option
                  </Text>
                </View>
              </View>
            )}

            {showInstruction && (
              <View style={styles.instructionBox}>
                <Text style={styles.instructionText}>
                  Please select an option
                </Text>
              </View>
            )}

            {expandedButtons && (
              <View style={styles.subButtonRow}>
                {buttonData
                  .find(button => button.label === expandedButtons)
                  ?.subButtons.map((sub, subIndex) => (
                    <TouchableOpacity
                      key={subIndex}
                      style={[
                        styles.subButton,
                        {backgroundColor: selectedButtonColor},
                      ]}
                      onPress={() => {
                        handleSubButtonPress(selectedSection, sub);
                      }}>
                      <Text style={styles.subButtonText}>{sub}</Text>
                    </TouchableOpacity>
                  ))}
              </View>
            )}

            {downloading && (
              <View style={styles.loaderContainer}>
                <Svg height="100" width="100" viewBox="0 0 100 100">
                  <Circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#ccc"
                    strokeWidth="10"
                    fill="none"
                  />
                  <AnimatedCircle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#007AFF"
                    strokeWidth="10"
                    strokeDasharray="251.2"
                    strokeDashoffset={progress.interpolate({
                      inputRange: [10, 100],
                      outputRange: [226, 0],
                    })}
                    fill="none"
                    strokeLinecap="round"
                  />
                </Svg>
                <Text style={styles.loaderText}>{progressValue}%</Text>
              </View>
            )}
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.85,
    height: height * 0.85,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  gradientBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  messageContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    marginTop: 40,
  },
  messageBubble: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    maxWidth: '80%',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 40,
    paddingBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
  },
  subButtonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  subButton: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    height: 40,
  },
  subButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 40,
    height: 40,
    backgroundColor: '#FFC0CB',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  loaderContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  HeaderText: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Hedermsg: {
    marginTop: 10,
    color: 'orange',
    fontSize: 20,
    fontWeight: 'bold',
  },
  Hedersubmsg: {
    marginTop: 10,
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  instructionBox: {
    marginTop: 10,
    backgroundColor: '#EAF4FF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionText: {
    fontSize: 16,
    color: '#336699',
    fontWeight: '500',
    textAlign: 'center',
  },
  // watermarkContainer: {
  //   position: 'absolute',
  //   top: '65%',
  //   left: '5%',
  //   zIndex: 0,
  // },
  // watermarkText: {
  //   fontSize: 60,
  //   color: 'black',
  //   opacity: 0.1,
  //   transform: [{ rotate: '-30deg' }],
  //   fontWeight: 'bold',
  //   pointerEvents: 'none',
  // },
});

export default AIModal;
