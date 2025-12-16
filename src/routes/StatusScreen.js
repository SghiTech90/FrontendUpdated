import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  TextInput,
  Modal,
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  PermissionsAndroid,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Circleget2515Api,
  CirclegetAuntyApi,
  CirclegetBuildingApi,
  CirclegetCRFApi,
  CirclegetDepositFundApi,
  CirclegetDPDCApi,
  CirclegetGATAApi,
  CirclegetGATDApi,
  CirclegetGATFBCApi,
  CirclegetMLAApi,
  CirclegetNABARDApi,
  CirclegetNonResidentialBuildingApi,
  CirclegetResidentialBuildingApi,
  CirclegetRoadApi,
  ContUpdPanelAuntyApi,
  ContUpdPanelBuildingApi,
  ContUpdPanelCrfApi,
  ContUpdPanelDeposite_fundApi,
  ContUpdPanelNABARDApi,
  ContUpdPanelROADApi,
  ConUploadImageApi,
  ContUpdPanel2515Api,
  ContUpdPanelDPDCApi,
  ContUpdPanelGAT_AApi,
  ContUpdPanelGAT_DApi,
  ContUpdPanelGAT_FBCApi,
  ContUpdPanelMLAApi,
  ContUpdPanelMPApi,
  ContUpdPanelNonResBuiApi,
  ContUpdPanelResBuiApi,
  EEUpdPanelAuntyApi,
  EEUpdPanelBuildingApi,
  EEUpdPanelCRFApi,
  EEUpdPanelDPDCApi,
  EEUpdPanelDepositeFundApi,
  EEUpdPanelGatAApi,
  EEUpdPanelGatDApi,
  EEUpdPanelGatFBCApi,
  EEUpdPanelMLAApi,
  EEUpdPanelMPApi,
  EEUpdPanelNRBApi,
  EEUpdPanelRBApi,
  EEUpdPanel2515Api,
  EEUpdPanelNABARDApi,
  EEUpdPanelROADApi,
  UpdateStatusAnnuityApi,
  UpdateStatus2515Api,
  UpdateStatusBilidingApi,
  UpdateStatusCrfApi,
  UpdateStatusDepositeFundApi,
  UpdateStatusDPDCApi,
  UpdateStatusGatAApi,
  UpdateStatusGatBApi,
  UpdateStatusGatFBCApi,
  UpdateStatusMLAApi,
  UpdateStatusMPApi,
  UpdateStatusNRBApi,
  UpdateStatusRBApi,
  UpdateStatusNabardApi,
  UpdateStatusRoadApi,
} from '../Api/StatusReportApi';
import {Toaster} from '../components/Toast';
import Geolocation from 'react-native-geolocation-service';
import {encode as btoa} from 'base-64';
import RNFS from 'react-native-fs';
import {
  PERMISSIONS,
  RESULTS,
  check,
  request,
  openSettings,
} from 'react-native-permissions';

const StatusScreen = ({navigation, navigator}) => {
  const [selectedReportType, setSelectedReportType] = useState('Building');
  const [location, setLocation] = useState(null);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [userName, setUserName] = useState(null);
  const [statusreportbuildingData, setBuildingData] = useState([]);
  const [statusreportCrfData, setCrfData] = useState([]);
  const [statusreportAnnuityData, setAnnuityData] = useState([]);
  const [statusreportNabardData, setNabardData] = useState([]);
  const [statusreportRoaddata, setRoadData] = useState([]);
  const [statusreport2515Data, set2515Data] = useState([]);
  const [statusreportDepositData, setDepositData] = useState([]);
  const [statusreportDPDCData, setDPDCData] = useState([]);
  const [statusreportGatAData, setGatAData] = useState([]);
  const [statusreportGatBData, setGatBData] = useState([]);
  const [statusreportGatFBCData, setGatFBCData] = useState([]);
  const [statusreportMLAData, setMLAData] = useState([]);
  const [statusreportMPData, setMPData] = useState([]);
  const [statusreportNRBData, setNRBData] = useState([]);
  const [statusreportRBData, setRBData] = useState([]);
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [remarkText, setRemarkText] = useState('');
  const modalAnim = useState(new Animated.Value(0))[0];
  const [statusupdateBuildingdata, setUpdateStatusdata] = useState([]);
  const [statusupdateroadData, setUpdateRoaddata] = useState([]);
  const [statusupdatecrfdata, setUpdatecrfdata] = useState([]);
  const [statusupdateAnnuitydata, setUpdatecAnnuitydata] = useState([]);
  const [statusupdateNabarddata, setUpdatecNabarddata] = useState([]);
  const [statusupdate2515Data, setUpdate2515Data] = useState([]);
  const [statusupdateDepositData, setUpdateDepositData] = useState([]);
  const [statusupdateDPDCData, setUpdateDPDCData] = useState([]);
  const [statusupdateGatAData, setUpdateGatAData] = useState([]);
  const [statusupdateGatBData, setUpdateGatBData] = useState([]);
  const [statusupdateGatFBCData, setUpdateGatFBCData] = useState([]);
  const [statusupdateMLAData, setUpdateMLAData] = useState([]);
  const [statusupdateMPData, setUpdateMPData] = useState([]);
  const [statusupdateNRBData, setUpdateNRBData] = useState([]);
  const [statusupdateRBData, setUpdateRBData] = useState([]);
  const [selectedKanName, setSelectedKanName] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);
  const [sections, setSections] = useState([]);
  const [circleBuildingData, setCircleBuildingData] = useState([]);
  const [circleCRFData, setCircleCRFData] = useState([]);
  const [circleAuntyData, setCircleAuntyData] = useState([]);
  const [circleNabardData, setCircleNabardData] = useState([]);
  const [circleRoadData, setCircleRoadData] = useState([]);
  const [circleDepositFundData, setCircleDepositFundData] = useState([]);
  const [circleDPDCData, setCircleDPDCData] = useState([]);
  const [circleGATAData, setCircleGATAData] = useState([]);
  const [circleGATFBCData, setCircleGATFBCData] = useState([]);
  const [circleGATDData, setCircleGATDData] = useState([]);
  const [circleMLAData, setCircleMLAData] = useState([]);
  const [circle2515Data, setCircle2515Data] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [
    circleResidentialBuilding2216Data,
    setCircleResidentialBuilding2216Data,
  ] = useState([]);
  const [
    circleNonResidentialBuilding2059Data,
    setCirclegetNonResidentialBuilding2059Data,
  ] = useState([]);
  const EEApiMap = {
    Building: EEUpdPanelBuildingApi,
    CRF: EEUpdPanelCRFApi,
    Annuity: EEUpdPanelAuntyApi,
    Nabard: EEUpdPanelNABARDApi,
    Road: EEUpdPanelROADApi,
    '2515': EEUpdPanel2515Api,
    Deposit: EEUpdPanelDepositeFundApi,
    DPDC: EEUpdPanelDPDCApi,
    Gat_A: EEUpdPanelGatAApi,
    Gat_BCF: EEUpdPanelGatFBCApi,
    Gat_D: EEUpdPanelGatDApi,
    MLA: EEUpdPanelMLAApi,
    MP2: EEUpdPanelMPApi,
    2216: EEUpdPanelNRBApi,
    2059: EEUpdPanelRBApi,
  };

  const ContApiMap = {
    Building: ContUpdPanelBuildingApi,
    CRF: ContUpdPanelCrfApi,
    Annuity: ContUpdPanelAuntyApi,
    Nabard: ContUpdPanelNABARDApi,
    Road: ContUpdPanelROADApi,
    '2515': ContUpdPanel2515Api,
    Deposit: ContUpdPanelDeposite_fundApi,
    DPDC: ContUpdPanelDPDCApi,
    Gat_A: ContUpdPanelGAT_AApi,
    Gat_BCF: ContUpdPanelGAT_FBCApi,
    Gat_D: ContUpdPanelGAT_DApi,
    MLA: ContUpdPanelMLAApi,
    MP2: ContUpdPanelMPApi,
    2216: ContUpdPanelResBuiApi,
    2059: ContUpdPanelNonResBuiApi,
  };

  const setDataMap = {
    Building: setBuildingData,
    CRF: setCrfData,
    Annuity: setAnnuityData,
    Nabard: setNabardData,
    Road: setRoadData,
    '2515': set2515Data,
    Deposit: setDepositData,
    DPDC: setDPDCData,
    Gat_A: setGatAData,
    Gat_BCF: setGatFBCData,
    Gat_D: setGatBData,
    MLA: setMLAData,
    MP2: setMPData,
    2216: setNRBData,
    2059: setRBData,
  };

  const circleApiMap = {
    Building: {api: CirclegetBuildingApi, set: setCircleBuildingData},
    CRF: {api: CirclegetCRFApi, set: setCircleCRFData},
    Annuity: {api: CirclegetAuntyApi, set: setCircleAuntyData},
    Nabard: {api: CirclegetNABARDApi, set: setCircleNabardData},
    Road: {api: CirclegetRoadApi, set: setCircleRoadData},
    Deposit: {api: CirclegetDepositFundApi, set: setCircleDepositFundData},
    DPDC: {api: CirclegetDPDCApi, set: setCircleDPDCData},
    Gat_A: {api: CirclegetGATAApi, set: setCircleGATAData},
    Gat_BCF: {api: CirclegetGATFBCApi, set: setCircleGATFBCData},
    Gat_D: {api: CirclegetGATDApi, set: setCircleGATDData},
    MLA: {api: CirclegetMLAApi, set: setCircleMLAData},
    MP2: {api: CirclegetMLAApi, set: setCircleMLAData},
    2216: {
      api: CirclegetResidentialBuildingApi,
      set: setCircleResidentialBuilding2216Data,
    },
    2059: {
      api: CirclegetNonResidentialBuildingApi,
      set: setCirclegetNonResidentialBuilding2059Data,
    },
    2515: {api: Circleget2515Api, set: setCircle2515Data},
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('USER_ID');
        if (storedUserId) {
          setUserId(storedUserId);
        }

        const storedRole = await AsyncStorage.getItem('userRole');
        if (storedRole) {
          setRole(storedRole);
        }

        const storedLocation = await AsyncStorage.getItem('LOCATION_ID');
        if (storedLocation) {
          setLocation(storedLocation);
        }

        const storedUserName = await AsyncStorage.getItem('USER_NAME');
        if (storedUserName) {
          setUserName(storedUserName);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (
      [
        'Executive Engineer',
        'Contractor',
        'Sectional Engineer',
        'Deputy Engineer',
      ].includes(role)
    ) {
      fetchReportData(role, selectedReportType, location, userName);
    }
    if (role === 'Supreintending Engiener') {
      setSections([
        'Building',
        'CRF',
        'Annuity',
        'Nabard',
        'Road',
        '2216',
        '2059',
        'Deposit',
        'DPDC',
        'Gat_A',
        'Gat_BCF',
        'Gat_D',
        'MLA',
        'MP2',
        '2515',
      ]);
      fetchCircleData(selectedReportType, location);
    } else {
      setSections([
        'Building',
        'CRF',
        'Annuity',
        'Nabard',
        'Road',
        '2216',
        '2059',
        'Deposit',
        'DPDC',
        'Gat_A',
        'Gat_BCF',
        'Gat_D',
        'MLA',
        'MP2',
        '2515',
      ]);
    }
  }, [selectedReportType, role]);

  const fetchReportData = async (role, reportType, location, userName) => {
    setLoading(true);
    try {
      let apiFn = null;
      const payload = {office: location};
      if (role === 'Executive Engineer') apiFn = EEApiMap[reportType];
      else if (
        ['Contractor', 'Sectional Engineer', 'Deputy Engineer'].includes(role)
      ) {
        apiFn = ContApiMap[reportType];
        payload.name = userName;
      }
      if (apiFn) {
        const response = await apiFn(payload);
        const setData = setDataMap[reportType];
        if (response?.success && Array.isArray(response.data)) {
          const groupedData = groupByWorkId(response.data);
          setData(groupedData);
        } else {
          setData([]);
        }
      }
    } catch (error) {
      console.error(`Error fetching ${reportType} data:`, error);
      setDataMap[reportType]([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCircleData = async (reportType, location) => {
    const entry = circleApiMap[reportType];
    if (!entry) return;
    try {
      setLoading(true);
      const response = await entry.api({office: location});
      if (response?.success) {
        entry.set(response.data);
      } else {
        console.warn(`Circle API failed for ${reportType}`);
      }
    } catch (error) {
      console.error(`Error fetching Circle ${reportType} data:`, error);
    } finally {
      setLoading(false);
    }
  };

  const groupByWorkId = data => {
    const grouped = {};
    data.forEach(item => {
      const workId = item['वर्क आयडी'] || item.WorkId;
      if (!workId) return;
      if (!grouped[workId]) {
        grouped[workId] = {...item, प्रतिमा: []};
      }

      const imageField =
        item.प्रतिमा || item.ImageUrl || item.imageUrl || item.Image;

      if (imageField) {
        if (Array.isArray(imageField)) {
          grouped[workId].प्रतिमा.push(...imageField);
        } else {
          grouped[workId].प्रतिमा.push(imageField);
        }
      }
    });
    return Object.values(grouped);
  };

  const bufferToBase64 = buffer => {
    if (!buffer || !buffer.data) return null;

    const binary = buffer.data.reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      '',
    );
    return `data:image/jpeg;base64,${btoa(binary)}`;
  };

  const normalizeImages = image => {
    if (!image) return [];

    if (Array.isArray(image)) {
      return image
        .map(img => {
          if (typeof img === 'string') return img;
          if (img && img.data) return bufferToBase64(img);
          return null;
        })
        .filter(Boolean);
    }

    if (typeof image === 'string') return [image];

    if (image && image.data) {
      const base64 = bufferToBase64(image);
      return base64 ? [base64] : [];
    }

    return [];
  };

  const getCurrentLocation = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          throw new Error('Location permission denied');
        }
      } else if (Platform.OS === 'ios') {
        const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (status !== RESULTS.GRANTED) {
          throw new Error('Location permission denied');
        }
      }

      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => resolve(position.coords),
          error => reject(error),
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 1000,
          },
        );
      });
    } catch (error) {
      console.log('📍 Location error:', error.message);
      throw error;
    }
  };

  const handleUploadImage = item => {
    Alert.alert(
      'Upload Photo',
      'Please choose an option',
      [
        {
          text: 'Camera',
          onPress: () => openImagePicker(item, 'camera'),
        },
        {
          text: 'Gallery',
          onPress: () => openImagePicker(item, 'gallery'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };


  const openImagePicker = async (item, source) => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
    };
  
    const callback = async response => {
      console.log('📸 Response:', response);
  
      if (response.didCancel) {
        console.log('User cancelled image picker');
        return;
      }
  
      if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorMessage);
        Toaster('Error selecting image.');
        return;
      }
  
      try {
        setUploading(true);
  
        const image = response.assets[0];
        const { latitude, longitude } = await getCurrentLocation();
        const rawFileName = image.fileName || `image_${Date.now()}.jpg`;
        const shortFileName =
          rawFileName.length > 50 ? rawFileName.slice(-50) : rawFileName;
  
        const requestBody = {
          office: location,
          WorkId: item['वर्क आयडी'],
          Data: image.base64,
          filename: shortFileName,
          Content: 'image/jpeg',
          Longitude: longitude,
          Latitude: latitude,
          Type: selectedReportType,
          Description: item['शेरा'],
        };
  
        const result = await ConUploadImageApi(requestBody);

        if (result?.success) {
          Toaster('Photo uploaded successfully...');

          const uploadedImage = result?.imageUrl || result?.ImageUrl || image.base64;
          const updatedImages = normalizeImages([
            ...(item.प्रतिमा || []),
            uploadedImage,
          ]);

          const updatedItem = {
            ...item,
            प्रतिमा: updatedImages,
            ImageUrl: uploadedImage,
            imageUrl: uploadedImage,
          };
  
          const updateMap = {
            Building: { data: statusreportbuildingData, set: setBuildingData },
            CRF: { data: statusreportCrfData, set: setCrfData },
            Annuity: { data: statusreportAnnuityData, set: setAnnuityData },
            Nabard: { data: statusreportNabardData, set: setNabardData },
            Road: { data: statusreportRoaddata, set: setRoadData },
          };
  
          const { data, set } = updateMap[selectedReportType] || {};
          if (data && set) {
            const updatedData = data.map(d =>
              (d['वर्क आयडी'] || d.WorkId) === item['वर्क आयडी'] ? updatedItem : d
            );
            set(updatedData);
          }
  
          // ✅ Fetch latest report data from API again
          if (
            [
              'Executive Engineer',
              'Contractor',
              'Sectional Engineer',
              'Deputy Engineer',
            ].includes(role)
          ) {
            fetchReportData(role, selectedReportType, location, userName);
          }
  
          if (role === 'Supreintending Engiener') {
            setSections([
              'Building',
              'CRF',
              'Annuity',
              'Nabard',
              'Road',
              '2216',
              '2059',
              'Deposit',
              'DPDC',
              'Gat_A',
              'Gat_BCF',
              'Gat_D',
              'MLA',
              'MP2',
              '2515',
            ]);
            fetchCircleData(selectedReportType, location);
          } else {
            setSections(['Building',
              'CRF',
              'Annuity',
              'Nabard',
              'Road',
              '2216',
              '2059',
              'Deposit',
              'DPDC',
              'Gat_A',
              'Gat_BCF',
              'Gat_D',
              'MLA',
              'MP2',
              '2515',]);
          }
        } else {
          Toaster('Photo not uploaded successfully...');
        }
      } catch (err) {
        console.error('Upload error:', err.message);
        Toaster('An error occurred during upload.');
      } finally {
        setUploading(false);
      }
    };
  
    // Launch Camera or Gallery
    try {
      if (source === 'camera') {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            Toaster('Camera permission denied.');
            return;
          }
        } else if (Platform.OS === 'ios') {
          try {
            const currentStatus = await check(PERMISSIONS.IOS.CAMERA);
            console.log('Camera permission status:', currentStatus);
            
            if (currentStatus === RESULTS.BLOCKED || currentStatus === RESULTS.DENIED) {
              Alert.alert(
                'Camera Permission',
                'Camera access is required to take photos. Please enable it in Settings.',
                [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Open Settings', onPress: () => openSettings() },
                ]
              );
              return;
            }
            
            if (currentStatus !== RESULTS.GRANTED) {
              const granted = await request(PERMISSIONS.IOS.CAMERA);
              console.log('Camera permission request result:', granted);
              
              if (granted !== RESULTS.GRANTED) {
                if (granted === RESULTS.BLOCKED) {
                  Alert.alert(
                    'Camera Permission',
                    'Camera access is blocked. Please enable it in Settings.',
                    [
                      { text: 'Cancel', style: 'cancel' },
                      { text: 'Open Settings', onPress: () => openSettings() },
                    ]
                  );
                } else {
                  Toaster('Camera permission denied.');
                }
                return;
              }
            }
          } catch (permError) {
            console.error('Permission check/request error:', permError);
            // Fallback: try to launch camera anyway (react-native-image-picker might handle it)
            console.log('Attempting to launch camera despite permission error...');
          }
        }
        launchCamera(options, callback);
      } else {
        launchImageLibrary(options, callback);
      }
    } catch (err) {
      console.error('Image Picker error:', err.message);
      console.error('Full error:', err);
      Toaster('Failed to launch image picker: ' + (err.message || 'Unknown error'));
    }
  };


  const requestStoragePermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to download images.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const handleDownloadAllImages = async (images = []) => {
    const hasPermission = await requestStoragePermission();
    if (!hasPermission) {
      Toaster('Storage permission denied');
      return;
    }
    try {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const fileName = `image_${Date.now()}_${i}.jpg`;

        const path =
          Platform.OS === 'android'
            ? `${RNFS.DownloadDirectoryPath}/${fileName}`
            : `${RNFS.DocumentDirectoryPath}/${fileName}`;

        if (typeof image === 'string' && image.startsWith('http')) {
          await RNFS.downloadFile({fromUrl: image, toFile: path}).promise;
        } else if (typeof image === 'string') {
          await RNFS.writeFile(
            path,
            image.replace(/^data:image\/\w+;base64,/, ''),
            'base64',
          );
        }
      }
      Toaster(
        `All ${images.length} images downloaded to ${
          Platform.OS === 'android' ? 'Downloads' : 'Files'
        }.`,
      );
    } catch (error) {
      console.error('Download error:', error);
      Toaster('Failed to download one or more images.');
    }
  };

  const handleSaveRemark = async () => {
    let apiFunction = null;
    let setDataFunction = null;
    let setLocalDataFunction = null;

    switch (selectedReportType) {
      case 'Building':
        apiFunction = UpdateStatusBilidingApi;
        setDataFunction = setUpdateStatusdata;
        setLocalDataFunction = setBuildingData;
        break;
      case 'Road':
        apiFunction = UpdateStatusRoadApi;
        setDataFunction = setUpdateRoaddata;
        setLocalDataFunction = setRoadData;
        break;
      case 'CRF':
        apiFunction = UpdateStatusCrfApi;
        setDataFunction = setUpdatecrfdata;
        setLocalDataFunction = setCrfData;
        break;
      case 'Annuity':
        apiFunction = UpdateStatusAnnuityApi;
        setDataFunction = setUpdatecAnnuitydata;
        setLocalDataFunction = setAnnuityData;
        break;
      case 'Nabard':
        apiFunction = UpdateStatusNabardApi;
        setDataFunction = setUpdatecNabarddata;
        setLocalDataFunction = setNabardData;
        break;
      case '2515':
        apiFunction = UpdateStatus2515Api;
        setDataFunction = setUpdate2515Data;
        setLocalDataFunction = set2515Data;
        break;
      case 'Deposit':
        apiFunction = UpdateStatusDepositeFundApi;
        setDataFunction = setUpdateDepositData;
        setLocalDataFunction = setDepositData;
        break;
      case 'DPDC':
        apiFunction = UpdateStatusDPDCApi;
        setDataFunction = setUpdateDPDCData;
        setLocalDataFunction = setDPDCData;
        break;
      case 'Gat_A':
        apiFunction = UpdateStatusGatAApi;
        setDataFunction = setUpdateGatAData;
        setLocalDataFunction = setGatAData;
        break;
      case 'Gat_BCF':
        apiFunction = UpdateStatusGatFBCApi;
        setDataFunction = setUpdateGatFBCData;
        setLocalDataFunction = setGatFBCData;
        break;
      case 'Gat_D':
        apiFunction = UpdateStatusGatBApi;
        setDataFunction = setUpdateGatBData;
        setLocalDataFunction = setGatBData;
        break;
      case 'MLA':
        apiFunction = UpdateStatusMLAApi;
        setDataFunction = setUpdateMLAData;
        setLocalDataFunction = setMLAData;
        break;
      case 'MP2':
        apiFunction = UpdateStatusMPApi;
        setDataFunction = setUpdateMPData;
        setLocalDataFunction = setMPData;
        break;
      case '2216':
        apiFunction = UpdateStatusNRBApi;
        setDataFunction = setUpdateNRBData;
        setLocalDataFunction = setNRBData;
        break;
      case '2059':
        apiFunction = UpdateStatusRBApi;
        setDataFunction = setUpdateRBData;
        setLocalDataFunction = setRBData;
        break;
      default:
        console.warn('Unknown report type:', selectedReportType);
        return;
    }
    const workID = selectedItem;

    if (!workID) {
      console.error('Work ID is missing from selected item:', selectedItem);
      return;
    }
    try {
      const response = await apiFunction({
        office: location,
        workID,
        status: remarkText,
      });

      if (response?.success && Array.isArray(response.data)) {
        setDataFunction(response.data);
      } else {
        setDataFunction([]);
      }
      setLocalDataFunction(prev =>
        prev.map(item =>
          item['वर्क आयडी'] === workID ? {...item, ['शेरा']: remarkText} : item,
        ),
      );
    } catch (error) {
      console.error('Error updating status:', error);
      setDataFunction([]);
    }
    setModalVisible(false);
    setSelectedItem(null);
    setRemarkText('');
  };

  const renderHeader = () => {
    return (
      <View style={[styles.tableRow, {backgroundColor: '#f2f2f2'}]}>
        <Text style={[styles.headerCell, {width: 100}]}>अ:क्र</Text>
        <Text style={[styles.headerCell, {width: 140}]}>वर्क आयडी</Text>
        <Text style={[styles.headerCell, {width: 140}]}>अर्थसंकल्पीय वर्ष</Text>
        <Text style={[styles.headerCell, {width: 450}]}>कामाचे नाव</Text>
        <Text style={[styles.headerCell, {width: 300}]}>शेरा</Text>

        {activeTab === 'upload' ? (
          <>
            <Text style={[styles.headerCell, {width: 140}]}>प्रतिमा पहा</Text>
            <Text style={[styles.headerCell, {width: 140}]}>प्रतिमा अपलोड</Text>
          </>
        ) : null}
      </View>
    );
  };

  const renderCircleHeader = () => {
    return (
      <View style={[styles.tableRow, {backgroundColor: '#f2f2f2'}]}>
        <Text style={[styles.headerCell, {width: 80}]}>अनु क्र.</Text>
        <Text style={[styles.headerCell, {width: 140}]}>वर्क आयडी</Text>
        <Text style={[styles.headerCell, {width: 450}]}>कामाचे नाव</Text>
      </View>
    );
  };

  const renderItem = ({item, index}) => {
    const workId = item['वर्क आयडी'] || item.WorkId || '';
    const year = item['अर्थसंकल्पीय वर्ष'] || item.Arthsankalpiyyear || '';
    const kamacheName = item['कामाचे नाव'] || item.KamacheName || '';
    const shera = item['शेरा'] || item.Shera || '';
    const image =
      item['प्रतिमा'] ||
      item.ImageUrl ||
      item.imageUrl ||
      item.Image ||
      null;
    const contentType = item['ContentType'] || item.ContentType || '';
    const normalizedImages = normalizeImages(image);

    return (
      <View style={styles.tableRow}>
        <Text style={[styles.cell, {width: 100}]}>{index + 1}</Text>
        <Text style={[styles.cell, {width: 140}]}>{workId}</Text>
        <Text style={[styles.cell, {width: 140}]}>{year}</Text>
        <Text style={[styles.cell, {width: 450}]}>{kamacheName}</Text>

        <View
          style={[
            styles.cell,
            {width: 300, flexDirection: 'row', alignItems: 'center'},
          ]}>
          <Text style={{flex: 1, flexWrap: 'wrap'}}>{shera}</Text>

          {activeTab !== 'upload' && (
            <TouchableOpacity
              style={{paddingHorizontal: 5}}
              onPress={() => {
                setSelectedItem(workId);
                setSelectedKanName(kamacheName);
                setRemarkText(shera);
                setModalType('remark');
                setModalVisible(true);
                Animated.timing(modalAnim, {
                  toValue: 1,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
              }}>
              <Icon name="edit" size={18} color="black" />
            </TouchableOpacity>
          )}
        </View>

        {activeTab === 'upload' && (
          <>
            <View style={[styles.cell, {width: 140}]}>
              {/* <TouchableOpacity
                onPress={() => {
                  let formattedImages = [];

                  if (Array.isArray(image)) {
                    formattedImages = image
                      .map(img => bufferToBase64(img))
                      .filter(Boolean);
                  } else if (image && image.data) {
                    const base64 = bufferToBase64(image);
                    if (base64) formattedImages = [base64];
                  }

                  setSelectedImages(formattedImages);
                  setSelectedItem(workId);
                  setSelectedKanName(kamacheName);
                  setModalType('images');
                  setModalVisible(true);

                  Animated.timing(modalAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                  }).start();
                }}
                style={styles.viewImgBtn}>
                <Text style={styles.viewImgBtnTxt}>View Image</Text>
              </TouchableOpacity>   */}
              <TouchableOpacity
                onPress={() => {
                  if (!normalizedImages.length) return;

                  setSelectedImages(normalizedImages);
                  setSelectedItem(workId);
                  setSelectedKanName(kamacheName);
                  setModalType('images');
                  setModalVisible(true);

                  Animated.timing(modalAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                  }).start();
                }}
                style={[
                  styles.viewImgBtn,
                  {
                    backgroundColor:
                      normalizedImages.length > 0 ? '#007bff' : '#ccc',
                    opacity: normalizedImages.length > 0 ? 1 : 0.6,
                  },
                ]}
                disabled={!normalizedImages.length}>
                <Text
                  style={[
                    styles.viewImgBtnTxt,
                    {
                      color: normalizedImages.length > 0 ? 'white' : '#888',
                    },
                  ]}>
                  View Image
                </Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.cell, {width: 140}]}>
              <TouchableOpacity
                onPress={() => handleUploadImage(item)}
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  backgroundColor: '#e0e0e0',
                  borderRadius: 4,
                }}>
                <Text style={{textAlign: 'center', fontSize: 12}}>
                  Upload Image
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };

  const renderCircleItem = ({item, index}) => {
    const workId = item.WorkId || item['वर्क आयडी'] || '';
    const kamacheName =
      item.KamacheName?.trim() || item['कामाचे नाव']?.trim() || '';

    return (
      <View style={styles.simpleRow}>
        <Text style={[styles.cell, {width: 70}]}>{index + 1}</Text>
        <Text style={[styles.cell, {width: 140}]}>{workId}</Text>
        <Text style={[styles.cell, {width: 450}]}>{kamacheName}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={[styles.header]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Status</Text>
      </View>

      <View style={[styles.contentContainer]}>
        {role !== 'Supreintending Engiener' && (
          <View style={[styles.buttomContiner]}>
            <TouchableOpacity
              style={[
                styles.imageButtonContiner,
                {backgroundColor: activeTab === 'upload' ? 'black' : '#ccc'},
              ]}
              onPress={() => setActiveTab('upload')}>
              <Text
                style={[
                  styles.buttonTxt,
                  {color: activeTab === 'upload' ? 'white' : 'black'},
                ]}>
                Upload Image
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.imageButtonContiner,
                {backgroundColor: activeTab === 'status' ? 'black' : '#ccc'},
              ]}
              onPress={() => setActiveTab('status')}>
              <Text
                style={[
                  styles.buttonTxt,
                  {color: activeTab === 'status' ? 'white' : 'black'},
                ]}>
                Status
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={[styles.mainFlatlistContiner]}>
          <View>
            <View style={styles.reportTypeContainer}>
              {sections.map((type, index) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.reportButton,
                    {width: '30%', marginBottom: 10},
                    selectedReportType === type && {backgroundColor: '#000'},
                  ]}
                  onPress={() => setSelectedReportType(type)}>
                  <Text
                    style={{
                      color: selectedReportType === type ? 'white' : 'black',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {loading || uploading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 50,
                }}>
                <ActivityIndicator size="large" color="#007AFF" />
              </View>
            ) : role === 'Supreintending Engiener' ? (
              <ScrollView horizontal style={{top: 15, marginBottom: 420}}>
                <FlatList
                  style={{marginTop: 15, marginBottom: 170}}
                  ListHeaderComponent={renderCircleHeader}
                  data={
                    selectedReportType === 'Building'
                      ? circleBuildingData
                      : selectedReportType === 'CRF'
                      ? circleCRFData
                      : selectedReportType === 'Annuity'
                      ? circleAuntyData
                      : selectedReportType === 'Nabard'
                      ? circleNabardData
                      : selectedReportType === 'Road'
                      ? circleRoadData
                      : selectedReportType === 'Deposit'
                      ? circleDepositFundData
                      : selectedReportType === 'Deposit'
                      ? circleDPDCData
                      : selectedReportType === 'DPDC'
                      ? circleDPDCData
                      : selectedReportType === 'Gat_A'
                      ? circleGATAData
                      : selectedReportType === 'Gat_BCF'
                      ? circleGATFBCData
                      : selectedReportType === 'Gat_D'
                      ? circleGATDData
                      : selectedReportType === 'MLA'
                      ? circleMLAData
                      : selectedReportType === '2515'
                      ? circle2515Data
                      : selectedReportType === '2216'
                      ? circleResidentialBuilding2216Data
                      : selectedReportType === '2059'
                      ? circleNonResidentialBuilding2059Data
                      : []
                  }
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) =>
                    renderCircleItem({item, index})
                  }
                />
              </ScrollView>
            ) : (
              <ScrollView horizontal style={{top: 15, marginBottom: 140}}>
                <FlatList
                  style={{marginTop: 15, marginBottom: 170}}
                  data={
                    selectedReportType === 'Building'
                      ? statusreportbuildingData
                      : selectedReportType === 'CRF'
                      ? statusreportCrfData
                      : selectedReportType === 'Annuity'
                      ? statusreportAnnuityData
                      : selectedReportType === 'Nabard'
                      ? statusreportNabardData
                      : selectedReportType === 'Road'
                      ? statusreportRoaddata
                      : selectedReportType === '2515'
                      ? statusreport2515Data
                      : selectedReportType === 'Deposit'
                      ? statusreportDepositData
                      : selectedReportType === 'DPDC'
                      ? statusreportDPDCData
                      : selectedReportType === 'Gat_A'
                      ? statusreportGatAData
                      : selectedReportType === 'Gat_BCF'
                      ? statusreportGatFBCData
                      : selectedReportType === 'Gat_D'
                      ? statusreportGatBData
                      : selectedReportType === 'MLA'
                      ? statusreportMLAData
                      : selectedReportType === 'MP2'
                      ? statusreportMPData
                      : selectedReportType === '2216'
                      ? statusreportNRBData
                      : selectedReportType === '2059'
                      ? statusreportRBData
                      : []
                  }
                  extraData={
                    selectedReportType === 'Building'
                      ? statusupdateBuildingdata
                      : selectedReportType === 'CRF'
                      ? statusupdatecrfdata
                      : selectedReportType === 'Annuity'
                      ? statusupdateAnnuitydata
                      : selectedReportType === 'Nabard'
                      ? statusupdateNabarddata
                      : selectedReportType === 'Road'
                      ? statusupdateroadData
                      : selectedReportType === '2515'
                      ? statusupdate2515Data
                      : selectedReportType === 'Deposit'
                      ? statusupdateDepositData
                      : selectedReportType === 'DPDC'
                      ? statusupdateDPDCData
                      : selectedReportType === 'Gat_A'
                      ? statusupdateGatAData
                      : selectedReportType === 'Gat_BCF'
                      ? statusupdateGatFBCData
                      : selectedReportType === 'Gat_D'
                      ? statusupdateGatBData
                      : selectedReportType === 'MLA'
                      ? statusupdateMLAData
                      : selectedReportType === 'MP2'
                      ? statusupdateMPData
                      : selectedReportType === '2216'
                      ? statusupdateNRBData
                      : selectedReportType === '2059'
                      ? statusupdateRBData
                      : null
                  }
                  keyExtractor={(item, index) => index.toString()}
                  ListHeaderComponent={renderHeader}
                  renderItem={renderItem}
                />
              </ScrollView>
            )}
          </View>
        </View>

        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.modalWrapper}>
            <Animated.View
              style={[
                styles.modalContainer,
                {
                  transform: [
                    {
                      translateY: modalAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [500, 0],
                      }),
                    },
                  ],
                },
              ]}>
              <TouchableOpacity
                style={styles.closeIcon}
                onPress={() => setModalVisible(false)}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>वर्क आयडी {selectedItem}</Text>
              <Text style={styles.modalSubtitle}>
                कामाचे नाव : {selectedKanName}
              </Text>

              {modalType === 'remark' && (
                <>
                  <TextInput
                    style={styles.modalInput}
                    value={remarkText}
                    onChangeText={setRemarkText}
                    multiline
                  />
                  <View style={styles.modalButtonRow}>
                    <TouchableOpacity
                      style={[styles.modalButton, {backgroundColor: 'green'}]}
                      onPress={handleSaveRemark}>
                      <Text style={styles.modalButtonText}>Update</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}

              {modalType === 'images' &&
              selectedImages &&
              selectedImages.length > 0 ? (
                <View>
                  <FlatList
                    ref={flatListRef}
                    data={selectedImages}
                    horizontal
                    pagingEnabled
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                      <Image source={{uri: item}} style={styles.imageView} />
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{padding: 10}}
                    onScroll={e => {
                      const index = Math.round(
                        e.nativeEvent.contentOffset.x /
                          e.nativeEvent.layoutMeasurement.width,
                      );
                      setCurrentIndex(index);
                    }}
                    scrollEventThrottle={16}
                  />

                  {selectedImages.length > 1 && currentIndex > 0 && (
                    <TouchableOpacity
                      onPress={() => {
                        if (flatListRef.current) {
                          flatListRef.current.scrollToIndex({
                            index: currentIndex - 1,
                            animated: true,
                          });
                        }
                      }}>
                      <Icon name="arrow-left" size={22} color="#000" />
                    </TouchableOpacity>
                  )}

                  {selectedImages.length > 1 &&
                    currentIndex < selectedImages.length - 1 && (
                      <TouchableOpacity
                        onPress={() => {
                          if (flatListRef.current) {
                            flatListRef.current.scrollToIndex({
                              index: currentIndex + 1,
                              animated: true,
                            });
                          }
                        }}
                        style={styles.rightArrowbtn}>
                        <Icon name="arrow-right" size={22} color="#000" />
                      </TouchableOpacity>
                    )}
                  <TouchableOpacity
                    style={styles.downloadBtn}
                    onPress={() => handleDownloadAllImages(selectedImages)}>
                    <Icon name="download" size={20} color="#000" />
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.noImageContainer}>
                  <Text style={styles.noImageText}>प्रतिमा उपलब्ध नाहीत.</Text>
                </View>
              )}
            </Animated.View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'black',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 15,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  buttomContiner: {
    height: '6%',
    width: '95%',
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  imageButtonContiner: {
    height: '90%',
    width: '35%',
    backgroundColor: 'black',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTxt: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  headerCell: {
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 10,
    borderRightWidth: 1,
    borderColor: '#ccc',
    fontSize: 15,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    minHeight: 60,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  remarkText: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
  },
  mainFlatlistContiner: {
    width: '100%',
    marginTop: 10,
    paddingBottom: 100,
  },
  modalWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    height: 100,
    marginBottom: 15,
  },
  modalButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    padding: 5,
  },
  reportTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    padding: 10,
  },
  reportButton: {
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: 'center',
    fontSize: 14,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  viewImgBtn: {
    width: 130,
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  viewImgBtnTxt: {color: '#fff', fontSize: 14, fontWeight: 'bold'},
  imageView: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginRight: 10,
    borderRadius: 8,
  },
  noImageContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noImageText: {
    fontSize: 16,
    color: '#888',
  },
  leftArrowbtn: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{translateY: -20}],
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    elevation: 3,
    zIndex: 10,
  },
  rightArrowbtn: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{translateY: -20}],
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    elevation: 3,
    zIndex: 10,
  },
  downloadBtn: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 50,
    elevation: 4,
    zIndex: 5,
  },
  simpleRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    alignItems: 'center',
  },
  simpleCell: {
    fontSize: 14,
    paddingHorizontal: 8,
  },
});

export default StatusScreen;
