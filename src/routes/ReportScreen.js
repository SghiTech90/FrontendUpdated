import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  ContractorAunnityReportApi,
  ContractorBuildingReportApi,
  ContractorCRFReportApi,
  ContractorNabardReportApi,
  ContractorRoadReportApi,
  MASTERHEADWISEREPOST2515Api,
  MASTERHEADWISEREPOSTAnnuityApi,
  MASTERHEADWISEREPOSTBuildingApi,
  MASTERHEADWISEREPOSTCRFApi,
  MASTERHEADWISEREPOSTDPDCApi,
  MASTERHEADWISEREPOSTDepositeFundApi,
  MASTERHEADWISEREPOSTGatAApi,
  MASTERHEADWISEREPOSTGatDApi,
  MASTERHEADWISEREPOSTGatFBCApi,
  MASTERHEADWISEREPOSTMLAApi,
  MASTERHEADWISEREPOSTMPApi,
  MASTERHEADWISEREPOSTNabardApi,
  MASTERHEADWISEREPOSTNRBApi,
  MASTERHEADWISEREPOSTRBApi,
  MASTERHEADWISEREPOSTRoadApi,
} from '../Api/ReportApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenHeight = Dimensions.get('window').height;

const ReportScreen = ({navigation, route}) => {
  const [location, setLocation] = useState(null);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [reportBuildingData, setReportBuildingData] = useState([]);
  const [reportCRFData, setReportCRFData] = useState([]);
  const [reportAnnuityData, setReportAnnuityData] = useState([]);
  const [reportNabardData, setReportNabardData] = useState([]);
  const [reportRoadData, setReportRoadData] = useState([]);
  const [report2515Data, setReport2515Data] = useState([]);
  const [reportDepositData, setReportDepositData] = useState([]);
  const [reportDPDCData, setReportDPDCData] = useState([]);
  const [reportGatAData, setReportGatAData] = useState([]);
  const [reportGatDData, setReportGatDData] = useState([]);
  const [reportGatFBCData, setReportGatFBCData] = useState([]);
  const [reportMLAData, setReportMLAData] = useState([]);
  const [reportMPData, setReportMPData] = useState([]);
  const [reportNRBData, setReportNRBData] = useState([]);
  const [reportRBData, setReportRBData] = useState([]);
  const [contactorBuildingData, setcontractBuildingData] = useState([]);
  const [contactorCrfdata, setcontractCrfDaya] = useState([]);
  const [contactorAnnuitydata, setcontractAnnuitydata] = useState([]);
  const [ContractorNabarddata, setcontractorNabardData] = useState([]);
  const [Contractorroaddata, setcontractorRoadData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState('Building');
  const [sections, setSections] = useState([]);
  const [page, setPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const [pageGroup, setPageGroup] = useState(0);
  const sectionDataMap = {
    Building: reportBuildingData,
    CRF: reportCRFData,
    Annuity: reportAnnuityData,
    Nabard: reportNabardData,
    Road: reportRoadData,
    '2515': report2515Data,
    Deposit: reportDepositData,
    DPDC: reportDPDCData,
    Gat_A: reportGatAData,
    Gat_D: reportGatDData,
    Gat_BCF: reportGatFBCData,
    MLA: reportMLAData,
    MP: reportMPData,
    '2216': reportNRBData,
    '2059': reportRBData,
  };
  console.log('role', role);
  const pageSize = 10;
  const currentSectionData = sectionDataMap[selectedSection] || [];
  const totalPages = Math.ceil(currentSectionData.length / pageSize);
  const pagesPerGroup = 10;

  const handleSectionChange = section => {
    setSelectedSection(section);
    setPage(1);
    setPageGroup(0);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const startPage = pageGroup * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 10,
        }}>
        {pageGroup > 0 && (
          <TouchableOpacity onPress={() => setPageGroup(prev => prev - 1)}>
            <Text style={{marginHorizontal: 10}}>{'<< Prev'}</Text>
          </TouchableOpacity>
        )}
        {pageNumbers.map(num => (
          <TouchableOpacity key={num} onPress={() => setPage(num)}>
            <Text
              style={{
                marginHorizontal: 5,
                fontWeight: page === num ? 'bold' : 'normal',
                color: page === num ? 'blue' : 'black',
              }}>
              {num}
            </Text>
          </TouchableOpacity>
        ))}
        {endPage < totalPages && (
          <TouchableOpacity onPress={() => setPageGroup(prev => prev + 1)}>
            <Text style={{marginHorizontal: 10}}>{'Next >>'}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  useEffect(() => {
    const data = sectionDataMap[selectedSection] || [];
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const currentPageData = data.slice(start, end);
    setPaginatedData(currentPageData);
  }, [page, selectedSection, sectionDataMap[selectedSection]]);

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
    const fetchData = async () => {
      setLoading(true);
      if (
        ['Contractor', 'Sectional Engineer', 'Deputy Engineer'].includes(role)
      ) {
        ContractorReportBuilding();
        ContractorReportCRF();
        ContractorReportAnnuity();
        ContractorReportNabard();
        ContractorReportRoad();
      } else if (role === 'Executive Engineer') {
        MASTERHEADWISEREPOSTBuilding();
        MASTERHEADWISEREPOSTCRF();
        MASTERHEADWISEREPOSTAnnuity();
        MASTERHEADWISEREPOSTNabard();
        MASTERHEADWISEREPOSTRoad();
        MASTERHEADWISEREPOST2515();
        MASTERHEADWISEREPOSTDepositeFund();
        MASTERHEADWISEREPOSTDPDC();
        MASTERHEADWISEREPOSTGatA();
        MASTERHEADWISEREPOSTGatD();
        MASTERHEADWISEREPOSTGatFBC();
        MASTERHEADWISEREPOSTMLA();
        MASTERHEADWISEREPOSTMP();
        MASTERHEADWISEREPOSTNRB();
        MASTERHEADWISEREPOSTRB();
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
          'MP',
          '2515',
        ]);
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
          'MP',
          '2515',
        ]);
      } else {
        setSections(['Building', 'CRF', 'Annuity', 'Nabard', 'Road', '2216',
          '2059',
          'Deposit',
          'DPDC',
          'Gat_A',
          'Gat_BCF',
          'Gat_D',
          'MLA',
          'MP',
          '2515',]);
      }
      setLoading(false);
    };
    fetchData();
  }, [userId, role, location, userName]);

  const MASTERHEADWISEREPOSTBuilding = async () => {
    try {
      const response = await MASTERHEADWISEREPOSTBuildingApi({
        office: location,
      });
      if (response?.success) {
        setReportBuildingData(response.data);
      } else {
        console.warn('API did not return success:', response?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error(
        'Error fetching MASTERHEADWISEREPOSTBuildingApi data:',
        error,
      );
      return {success: false, data: []};
    }
  };

  const MASTERHEADWISEREPOSTCRF = async () => {
    try {
      const response = await MASTERHEADWISEREPOSTCRFApi({
        office: location,
      });
      if (response?.success) {
        setReportCRFData(response.data);
      } else {
        console.warn('API did not return success:', response?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching MASTERHEADWISEREPOSTCRFApi data:', error);
      return {success: false, data: []};
    }
  };

  const MASTERHEADWISEREPOSTAnnuity = async () => {
    try {
      const response = await MASTERHEADWISEREPOSTAnnuityApi({
        office: location,
      });
      if (response?.success) {
        setReportAnnuityData(response.data);
      } else {
        console.warn('API failed');
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  const MASTERHEADWISEREPOSTNabard = async () => {
    try {
      const response = await MASTERHEADWISEREPOSTNabardApi({
        office: location,
      });
      if (response?.success) {
        setReportNabardData(response.data);
        console.log('response?.success',response.data)
      } else {
        console.warn('API did not return success:', response?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error(
        'Error fetching MASTERHEADWISEREPOSTNabardApi data:',
        error,
      );
      return {success: false, data: []};
    }
  };

  const MASTERHEADWISEREPOSTRoad = async () => {
    try {
      const response = await MASTERHEADWISEREPOSTRoadApi({
        office: location,
      });
      if (response?.success) {
        setReportRoadData(response.data);
      } else {
        console.warn('API did not return success:', response?.success);
        return {success: false, response: []};
      }
    } catch (error) {
      console.error('Error fetching MASTERHEADWISEREPOSTRoadApi data:', error);
      return {success: false, data: []};
    }
  };

  const MASTERHEADWISEREPOST2515 = async () => {
    try {
      const response = await MASTERHEADWISEREPOST2515Api({office: location});
      if (response?.success) {
        setReport2515Data(response.data);
      } else {
        console.warn('API did not return success:', response?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching MASTERHEADWISEREPOST2515Api data:', error);
      return {success: false, data: []};
    }
  };

  const MASTERHEADWISEREPOSTDepositeFund = async () => {
    try {
      const response = await MASTERHEADWISEREPOSTDepositeFundApi({
        office: location,
      });
      if (response?.success) {
        setReportDepositData(response.data);
      } else {
        console.warn('API did not return success:', response?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error(
        'Error fetching MASTERHEADWISEREPOSTDepositeFundApi data:',
        error,
      );
      return {success: false, data: []};
    }
  };

  const MASTERHEADWISEREPOSTDPDC = async () => {
    try {
      const response = await MASTERHEADWISEREPOSTDPDCApi({office: location});
      if (response?.success) {
        setReportDPDCData(response.data);
      } else {
        console.warn('API did not return success:', response?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching MASTERHEADWISEREPOSTDPDCApi data:', error);
      return {success: false, data: []};
    }
  };

  const MASTERHEADWISEREPOSTGatA = async () => {
    try {
      const response = await MASTERHEADWISEREPOSTGatAApi({office: location});
      if (response?.success) {
        setReportGatAData(response.data);
      } else {
        console.warn('API did not return success:', response?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching MASTERHEADWISEREPOSTGatAApi data:', error);
      return {success: false, data: []};
    }
  };

  const MASTERHEADWISEREPOSTGatD = async () => {
    try {
      const response = await MASTERHEADWISEREPOSTGatDApi({office: location});
      if (response?.success) {
        setReportGatDData(response.data);
      } else {
        console.warn('API did not return success:', response?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching MASTERHEADWISEREPOSTGatDApi data:', error);
      return {success: false, data: []};
    }
  };

  const MASTERHEADWISEREPOSTGatFBC = async () => {
    try {
      const response = await MASTERHEADWISEREPOSTGatFBCApi({office: location});
      if (response?.success) {
        setReportGatFBCData(response.data);
      } else {
        console.warn('API did not return success:', response?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching MASTERHEADWISEREPOSTGatFBCApi data:', error);
      return {success: false, data: []};
    }
  };

  const MASTERHEADWISEREPOSTMLA = async () => {
    try {
      const response = await MASTERHEADWISEREPOSTMLAApi({office: location});
      if (response?.success) {
        setReportMLAData(response.data);
      } else {
        console.warn('API did not return success:', response?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching MASTERHEADWISEREPOSTMLAApi data:', error);
      return {success: false, data: []};
    }
  };

  const MASTERHEADWISEREPOSTMP = async () => {
    try {
      const response = await MASTERHEADWISEREPOSTMPApi({office: location});
      if (response?.success) {
        setReportMPData(response.data);
      } else {
        console.warn('API did not return success:', response?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching MASTERHEADWISEREPOSTMPApi data:', error);
      return {success: false, data: []};
    }
  };

  const MASTERHEADWISEREPOSTNRB = async () => {
    try {
      const response = await MASTERHEADWISEREPOSTNRBApi({office: location});
      if (response?.success) {
        setReportNRBData(response.data);
      } else {
        console.warn('API did not return success:', response?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching MASTERHEADWISEREPOSTNRBApi data:', error);
      return {success: false, data: []};
    }
  };

  const MASTERHEADWISEREPOSTRB = async () => {
    try {
      const response = await MASTERHEADWISEREPOSTRBApi({office: location});
      if (response?.success) {
        setReportRBData(response.data);
      } else {
        console.warn('API did not return success:', response?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching MASTERHEADWISEREPOSTRBApi data:', error);
      return {success: false, data: []};
    }
  };

  const ContractorReportBuilding = async () => {
    try {
      const response = await ContractorBuildingReportApi({
        office: location,
        post: role,
        year: '2025-2026',
        name: userName,
      });
      if (response?.success) {
        setcontractBuildingData(response.data);
      } else {
        console.warn('API did not return success:', response?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching ContractorBuildingReportApi data:', error);
      return {success: false, data: []};
    }
  };

  const ContractorReportCRF = async () => {
    try {
      const response = await ContractorCRFReportApi({
        office: location,
        post: role,
        year: '2025-2026',
        name: userName,
      });
      if (response?.success) {
        setcontractCrfDaya(response.data);
      } else {
        console.warn('API did not return success:', response?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching  ContractorCRFReportApi data:', error);
      return {success: false, data: []};
    }
  };

  const ContractorReportAnnuity = async () => {
    try {
      const response = await ContractorAunnityReportApi({
        office: location,
        post: role,
        year: '2025-2026',
        name: userName,
      });
      if (response?.success) {
        setcontractAnnuitydata(response.data);
      } else {
        console.warn('API did not return success:', response?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching  ContractorAunnityReportApi data:', error);
      return {success: false, data: []};
    }
  };

  const ContractorReportNabard = async () => {
    try {
      const response = await ContractorNabardReportApi({
        office: location,
        post: role,
        year: '2025-2026',
        name: userName,
      });
      if (response?.success) {
        setcontractorNabardData(response.data);
      } else {
        console.warn('API did not return success:', response?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching  ContractorNabardReportApi data:', error);
      return {success: false, data: []};
    }
  };

  const ContractorReportRoad = async () => {
    try {
      const response = await ContractorRoadReportApi({
        office: location,
        post: role,
        year: '2025-2026',
        name: userName,
      });
      if (response?.success) {
        setcontractorRoadData(response.data);
      } else {
        console.warn('API did not return success:', response?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching  ContractorRoadReportApi data:', error);
      return {success: false, data: []};
    }
  };

  const renderBuildingHeader = () => (
    <View style={[styles.tableRow, {backgroundColor: '#f2f2f2'}]}>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>SrNo</Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        वर्क आयडी
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>U_WIN</Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        अर्थसंकल्पीय वर्ष
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 600}]}>
        कामाचे नाव
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 600}]}>
        लेखाशीर्ष नाव
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>विभाग</Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        उपविभाग
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>तालुका</Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        अर्थसंकल्पीय बाब
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 220}]}>
        शाखा अभियंता नाव
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 220}]}>
        उपअभियंता नाव
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 220}]}>
        आमदारांचे नाव
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 220}]}>
        खासदारांचे नाव
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 220}]}>
        कंत्राटदार नाव
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
        प्रशासकीय मान्यता रक्कम
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
        प्रशासकीय मान्यता रक्कम /दिनांक
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
        तांत्रिक मान्यता रक्कम
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
        कामाचा वाव
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        कार्यारंभ आदेश दिनांक
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        निविदा रक्कम % कमी/ जास्त
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        बांधकाम कालावधी
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        काम पूर्ण तारीख
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        "मुदतवाढ बाबत
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        मंजूर अंदाजित किंमत
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        मार्च अखेर खर्च 2021
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        उर्वरित किंमत
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        चालु खर्च
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        मागील खर्च
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        सन 2023-2024 मधील माहे एप्रिल/मे अखेरचा खर्च
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        एकुण कामावरील खर्च
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        प्रथम तिमाही तरतूद
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        द्वितीय तिमाही तरतूद
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        तृतीय तिमाही तरतूद
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        चतुर्थ तिमाही तरतूद
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        अर्थसंकल्पीय तरतूद
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        वितरित तरतूद
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>मागणी</Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        विद्युतीकरणावरील प्रमा
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        विद्युतीकरणावरील वितरित
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        इतर खर्च
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        दवगुनी ज्ञापने
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        पाहणी क्रमांक
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        पाहणीमुद्ये
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
        देयकाची सद्यस्थिती
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 600}]}>
        शेरा / कामाची सद्यस्थिती
      </Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>C</Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>P</Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>TS</Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Apr</Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>May</Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Jun</Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Jul</Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Aug</Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Sep</Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Oct</Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Nov</Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Dec</Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>jan</Text>
      <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Feb</Text>
    </View>
  );

  const renderBuildingItem = ({item}) => (
    <View style={styles.tableRow}>
      <Text style={[styles.cell, {width: 100}]}>{item['SrNo']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['वर्क आयडी']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['U_WIN']}</Text>
      <Text style={[styles.cell, {width: 100}]}>
        {item['अर्थसंकल्पीय वर्ष']}
      </Text>
      <Text style={[styles.cell, {width: 600}]}>{item['कामाचे नाव']}</Text>
      <Text style={[styles.cell, {width: 600}]}>{item['लेखाशीर्ष नाव']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['विभाग']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['उपविभाग']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['तालुका']}</Text>
      <Text style={[styles.cell, {width: 100}]}>
        {item['अर्थसंकल्पीय बाब']}
      </Text>
      <Text style={[styles.cell, {width: 220}]}>
        {item['शाखा अभियंता नाव']}
      </Text>
      <Text style={[styles.cell, {width: 220}]}>{item['उपअभियंता नाव']}</Text>
      <Text style={[styles.cell, {width: 220}]}>{item['आमदारांचे नाव']}</Text>
      <Text style={[styles.cell, {width: 220}]}>{item['खासदारांचे नाव']}</Text>
      <Text style={[styles.cell, {width: 220}]}>{item['कंत्राटदार नाव']}</Text>
      <Text style={[styles.cell, {width: 150}]}>
        {item['प्रशासकीय मान्यता रक्कम']}
      </Text>
      <Text style={[styles.cell, {width: 150}]}>
        {item['प्रशासकीय मान्यता रक्कम /दिनांक']}
      </Text>
      <Text style={[styles.cell, {width: 150}]}>
        {item['तांत्रिक मान्यता रक्कम']}
      </Text>
      <Text style={[styles.cell, {width: 150}]}>{item['कामाचा वाव']}</Text>
      <Text style={[styles.cell, {width: 100}]}>
        {item['कार्यारंभ आदेश दिनांक']}
      </Text>
      <Text style={[styles.cell, {width: 100}]}>
        {item['निविदा रक्कम % कमी/ जास्त']}
      </Text>
      <Text style={[styles.cell, {width: 100}]}>{item['बांधकाम कालावधी']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['काम पूर्ण तारीख']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['"मुदतवाढ बाबत']}</Text>
      <Text style={[styles.cell, {width: 100}]}>
        {item['मंजूर अंदाजित किंमत']}
      </Text>
      <Text style={[styles.cell, {width: 100}]}>
        {item['मार्च अखेर खर्च 2021']}
      </Text>
      <Text style={[styles.cell, {width: 100}]}>{item['उर्वरित किंमत']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['चालु खर्च']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['मागील खर्च']}</Text>
      <Text style={[styles.cell, {width: 100}]}>
        {item['सन 2023-2024 मधील माहे एप्रिल/मे अखेरचा खर्च']}
      </Text>
      <Text style={[styles.cell, {width: 100}]}>
        {item['एकुण कामावरील खर्च']}
      </Text>
      <Text style={[styles.cell, {width: 100}]}>
        {item['प्रथम तिमाही तरतूद']}
      </Text>
      <Text style={[styles.cell, {width: 100}]}>
        {item['द्वितीय तिमाही तरतूद']}
      </Text>
      <Text style={[styles.cell, {width: 100}]}>
        {item['तृतीय तिमाही तरतूद']}
      </Text>
      <Text style={[styles.cell, {width: 100}]}>
        {item['चतुर्थ तिमाही तरतूद']}
      </Text>
      <Text style={[styles.cell, {width: 100}]}>
        {item['अर्थसंकल्पीय तरतूद']}
      </Text>
      <Text style={[styles.cell, {width: 100}]}>{item['वितरित तरतूद']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['मागणी']}</Text>
      <Text style={[styles.cell, {width: 100}]}>
        {item['विद्युतीकरणावरील प्रमा']}
      </Text>
      <Text style={[styles.cell, {width: 100}]}>
        {item['विद्युतीकरणावरील वितरित']}
      </Text>
      <Text style={[styles.cell, {width: 100}]}>{item['इतर खर्च']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['दवगुनी ज्ञापने']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['पाहणी क्रमांक']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['पाहणीमुद्ये']}</Text>
      <Text style={[styles.cell, {width: 100}]}>
        {item['देयकाची सद्यस्थिती']}
      </Text>
      <Text style={[styles.cell, {width: 600}]}>
        {item['शेरा / कामाची सद्यस्थिती']}
      </Text>
      <Text style={[styles.cell, {width: 100}]}>{item['C']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['P']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['TS']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['Apr']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['May']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['Jun']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['Jul']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['Aug']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['Sep']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['Oct']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['Nov']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['Dec']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['jan']}</Text>
      <Text style={[styles.cell, {width: 100}]}>{item['Feb']}</Text>
    </View>
  );

  const renderCRFHeader = () => {
    return (
      <View style={[styles.tableRow, {backgroundColor: '#f2f2f2'}]}>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>SrNo</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          WorkId
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          U_WIN
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Budget of Item
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Budget of Year
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 600}]}>
          Name of Work
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Head</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Headwise
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Type</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          SubType
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Sub Division
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Taluka
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Sectional Engineer
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Deputy Engineer
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>MLA</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>MP</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Contractor
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Administrative No
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          A A Date
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          A A Amount
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Technical Sanction No
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          T S Date
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          T S Amount
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          Scope of Work
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Work Order
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          Tender No
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          Tender Amount
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Tender Date
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Work Order Date
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Work Completion Date
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Extension Month
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          SanctionDate
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          SanctionAmount
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Estimated Cost Approved
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          MarchEndingExpn 2021
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Remaining Cost
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Annual Expense
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Previous Month
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Previous Cost
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Current Month
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Current Cost
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          Total Expense
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          First Provision Month
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          First Provision
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Second Provision Month
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Second Provision
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Third Provision Month
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Third Provision
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Fourth Provision Month
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Fourth Provision
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Grand Provision
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Total Grand
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Demand
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Other Expense
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Electricity Cost
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Electricity Expense
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          JobNo
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          Road Category
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Road Length
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          W.B.M Wide Phy Scope
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          W.B.M Wide Commulative
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          W.B.M Wide Target
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          W.B.M Wide Achievement
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          B.T Phy Scope
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          B.T Commulative
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          B.T Target
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          B.T Achievement
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          C.D Phy Scope
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          C.D Commulative
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          C.D Target
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          C.D Achievement
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          Minor Bridges Phy Scope(Nos)
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          Minor Bridges Commulative(Nos)
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          Minor Bridges Target(Nos)
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          Minor Bridges Achievement(Nos)
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          Major Bridges Phy Scope(Nos)
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          Major Bridges Commulative(Nos)
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          Major Bridges Target(Nos)
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          Major Bridges Achievement(Nos)
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Bill Status
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Observation No
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Observation Memo
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>C</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>P</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>NS</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>ES</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>TS</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Remark
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Remark
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Apr</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>May</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Jun</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Jul</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Aug</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Sep</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Oct</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Nov</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Dec</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Jan</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Feb</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Mar</Text>
      </View>
    );
  };

  const renderCRFItem = ({item}) => {
    return (
      <View style={styles.tableRow}>
        <Text style={[styles.cell, {width: 100}]}>{item['SrNo']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['WorkId']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['U_WIN']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Budget of Item']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Budget of Year']}
        </Text>
        <Text style={[styles.cell, {width: 600}]}>{item['Name of Work']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Head']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Headwise']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Type']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['SubType']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Sub Division']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Taluka']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Sectional Engineer']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Deputy Engineer']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['MLA']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['MP']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Contractor']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Administrative No']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['A A Date']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['A A Amount']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Technical Sanction No']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['T S Date']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['T S Amount']}</Text>
        <Text style={[styles.cell, {width: 200}]}>{item['Scope of Work']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Work Order']}</Text>
        <Text style={[styles.cell, {width: 200}]}>{item['Tender No']}</Text>
        <Text style={[styles.cell, {width: 200}]}>{item['Tender Amount']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Tender Date']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Work Order Date']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Work Completion Date']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Extension Month']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['SanctionDate']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['SanctionAmount']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Estimated Cost Approved']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['MarchEndingExpn 2021']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Remaining Cost']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Annual Expense']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Previous Month']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Previous Cost']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Current Month']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Current Cost']}</Text>
        <Text style={[styles.cell, {width: 200}]}>{item['Total Expense']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['First Provision Month']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['First Provision']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Second Provision Month']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Second Provision']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Third Provision Month']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Third Provision']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Fourth Provision Month']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Fourth Provision']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Grand Provision']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Total Grand']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Demand']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Other Expense']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Electricity Cost']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Electricity Expense']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['JobNo']}</Text>
        <Text style={[styles.cell, {width: 200}]}>{item['Road Category']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Road Length']}</Text>
        <Text style={[styles.cell, {width: 200}]}>
          {item['W.B.M Wide Phy Scope']}
        </Text>
        <Text style={[styles.cell, {width: 200}]}>
          {item['W.B.M Wide Commulative']}
        </Text>
        <Text style={[styles.cell, {width: 200}]}>
          {item['W.B.M Wide Target']}
        </Text>
        <Text style={[styles.cell, {width: 200}]}>
          {item['W.B.M Wide Achievement']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['B.T Phy Scope']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['B.T Commulative']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['B.T Target']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['B.T Achievement']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['C.D Phy Scope']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['C.D Commulative']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['C.D Target']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['C.D Achievement']}
        </Text>
        <Text style={[styles.cell, {width: 200}]}>
          {item['Minor Bridges Phy Scope(Nos)']}
        </Text>
        <Text style={[styles.cell, {width: 200}]}>
          {item['Minor Bridges Commulative(Nos)']}
        </Text>
        <Text style={[styles.cell, {width: 200}]}>
          {item['Minor Bridges Target(Nos)']}
        </Text>
        <Text style={[styles.cell, {width: 200}]}>
          {item['Minor Bridges Achievement(Nos)']}
        </Text>
        <Text style={[styles.cell, {width: 200}]}>
          {item['Major Bridges Phy Scope(Nos)']}
        </Text>
        <Text style={[styles.cell, {width: 200}]}>
          {item['Major Bridges Commulative(Nos)']}
        </Text>
        <Text style={[styles.cell, {width: 200}]}>
          {item['Major Bridges Target(Nos)']}
        </Text>
        <Text style={[styles.cell, {width: 200}]}>
          {item['Major Bridges Achievement(Nos)']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Bill Status']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Observation No']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Observation Memo']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['C']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['P']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['NS']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['ES']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['TS']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Remark']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Apr']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['May']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Jun']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Jul']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Aug']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Sep']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Oct']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Nov']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Dec']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Jan']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Feb']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Mar']}</Text>
      </View>
    );
  };

  const renderAnnuityHeader = () => {
    return (
      <View style={[styles.tableRow, {backgroundColor: '#f2f2f2'}]}>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          अ क्र
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          वर्क आयडी
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          U_WIN
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          पेज क्र
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          बाब क्र
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          जुलै/ बाब क्र./पान क्र.
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          अर्थसंकल्पीय वर्ष
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 600}]}>
          कामाचे नाव
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 600}]}>
          लेखाशीर्ष नाव
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          विभाग
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          उपविभाग
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          तालुका
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 220}]}>
          शाखा अभियंता नाव
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 220}]}>
          उपअभियंता नाव
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 220}]}>
          आमदारांचे नाव
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 220}]}>
          खासदारांचे नाव
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 220}]}>
          कंत्राटदार नाव
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          प्रशासकीय मान्यता रक्कम
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          प्रशासकीय मान्यता क्र/रक्कम/दिनांक
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          तांत्रिक मान्यता रक्कम
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          तांत्रिक मान्यता क्र/रक्कम/दिनांक
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          कामाचा वाव
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          निविदा क्र/दिनांक
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          निविदा रक्कम % कमी / जास्त
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          कार्यारंभ आदेश
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          बांधकाम कालावधी
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          काम पूर्ण तारीख
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          मुदतवाढ बाबत
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          मंजूर अंदाजित किंमत
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          मार्च अखेर खर्च
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          उर्वरित किंमत
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          चालु खर्च
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          मागील खर्च
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          सन 2023-2024 मधील माहे एप्रिल/मे अखेरचा खर्च
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          एकुण कामावरील खर्च
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          2023-2024 मधील अर्थसंकल्पीय तरतूद मार्च 2021
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          202023-2024 मधील अर्थसंकल्पीय तरतूद जुलै 2020
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          तृतीय तिमाही तरतूद
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          चतुर्थ तिमाही तरतूद
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          एकूण अर्थसंकल्पीय तरतूद
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          2023-2024 साठी मागणी
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          विद्युतीकरणावरील प्रमा
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          विद्युतीकरणावरील वितरित
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          इतर खर्च
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          दवगुनी ज्ञापने
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          पाहणी क्रमांक
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          पाहणीमुद्ये
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          देयकाची सद्यस्थिती
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>शेरा</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>C</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>P</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>NS</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>ES</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>TS</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Apr</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>May</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Jun</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Jul</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Aug</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Sep</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Oct</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Nov</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Dec</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Jan</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Feb</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Mar</Text>
      </View>
    );
  };

  const renderAnnuityItem = ({item}) => {
    return (
      <View style={styles.tableRow}>
        <Text style={[styles.cell, {width: 100}]}>{item['अ क्र']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['वर्क आयडी']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['U_WIN']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['पेज क्र']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['बाब क्र']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['जुलै/ बाब क्र./पान क्र.']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['अर्थसंकल्पीय वर्ष']}
        </Text>
        <Text style={[styles.cell, {width: 600}]}>{item['कामाचे नाव']}</Text>
        <Text style={[styles.cell, {width: 600}]}>{item['लेखाशीर्ष नाव']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['विभाग']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['उपविभाग']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['तालुका']}</Text>
        <Text style={[styles.cell, {width: 220}]}>
          {item['शाखा अभियंता नाव']}
        </Text>
        <Text style={[styles.cell, {width: 220}]}>{item['उपअभियंता नाव']}</Text>
        <Text style={[styles.cell, {width: 220}]}>{item['आमदारांचे नाव']}</Text>
        <Text style={[styles.cell, {width: 220}]}>
          {item['खासदारांचे नाव']}
        </Text>
        <Text style={[styles.cell, {width: 220}]}>
          {item['कंत्राटदार नाव']}
        </Text>
        <Text style={[styles.cell, {width: 150}]}>
          {item['प्रशासकीय मान्यता रक्कम']}
        </Text>
        <Text style={[styles.cell, {width: 150}]}>
          {item['प्रशासकीय मान्यता क्र/रक्कम/दिनांक']}
        </Text>
        <Text style={[styles.cell, {width: 150}]}>
          {item['तांत्रिक मान्यता रक्कम']}
        </Text>
        <Text style={[styles.cell, {width: 150}]}>
          {item['तांत्रिक मान्यता क्र/रक्कम/दिनांक']}
        </Text>
        <Text style={[styles.cell, {width: 150}]}>{item['कामाचा वाव']}</Text>
        <Text style={[styles.cell, {width: 150}]}>
          {item['निविदा क्र/दिनांक']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['निविदा रक्कम % कमी / जास्त']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['कार्यारंभ आदेश']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['बांधकाम कालावधी']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['काम पूर्ण तारीख']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['मुदतवाढ बाबत']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['मंजूर अंदाजित किंमत']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['मार्च अखेर खर्च']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['उर्वरित किंमत']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['चालु खर्च']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['मागील खर्च']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['सन 2023-2024 मधील माहे एप्रिल/मे अखेरचा खर्च']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['एकुण कामावरील खर्च']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['2023-2024 मधील अर्थसंकल्पीय तरतूद मार्च 2021']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['202023-2024 मधील अर्थसंकल्पीय तरतूद जुलै 2020']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['तृतीय तिमाही तरतूद']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['चतुर्थ तिमाही तरतूद']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['एकूण अर्थसंकल्पीय तरतूद']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['2023-2024 साठी मागणी']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['विद्युतीकरणावरील प्रमा']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['विद्युतीकरणावरील वितरित']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['इतर खर्च']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['दवगुनी ज्ञापने']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['पाहणी क्रमांक']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['पाहणीमुद्ये']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['देयकाची सद्यस्थिती']}
        </Text>
        <Text style={[styles.cell, {width: 200}]}>{item['शेरा']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['C']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['P']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['NS']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['ES']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['TS']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Apr']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['May']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Jun']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Jul']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Aug']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Sep']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Oct']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Nov']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Dec']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Jan']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Feb']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Mar']}</Text>
      </View>
    );
  };

  const renderNabardHeader = () => {
    return (
      <View style={[styles.tableRow, {backgroundColor: '#f2f2f2'}]}>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>SrNo</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Work Id
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          U_WIN
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          RIDF NO
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>srno</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          BBudget of Year
        </Text>

        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          District
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          Taluka
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Budget of Item
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 600}]}>
          Name of Work
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          Scope of Work
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Headwise
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          Division
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          Sub Division
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          Sectional Engineer
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          Deputy Engineer
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>MLA</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>MP</Text>
        <Text style={[styles.cell, styles.headerCell, , {width: 150}]}>
          Contractor
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          Administrative No
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          A A Date
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 600}]}>
          PIC No
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 600}]}>
          AA cost Rs in lakhs
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          Technical Sanction Cost Rs in Lakh{' '}
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          Technical Sanction No and Date
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          Tender No
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          Tender Amount
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          Work Order
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          Work Order Date
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          Work Completion Date
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          Extension Month
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          Estimated Cost Approved
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          Expenditure up to MAR 2026
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          Remaining Cost
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          एकुण कामावरील खर्च
        </Text>
        <Text style={[styles.cell, styles.headerCell, , {width: 150}]}>
          Current Cost
        </Text>
        <Text style={[styles.cell, styles.headerCell, , {width: 150}]}>
          Previous Cost
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Expenditure up to 8/2020 during year 20-21 Rs in Lakhs
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Total Expense
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Budget Provision in 2026-22 Rs in Lakhs
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Second Provision
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Third Provision
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Fourth Provision
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Total Provision
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Total Grand
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Demand for 2026-22 Rs in Lakhs
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 600}]}>
          Observation Memo
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Probable date of completion
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Bill Status
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Physical Progress of work
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Road Category
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Road Length
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Road Type
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          WBMI Km
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          WBMIII Km
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          BBM Km
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Carpet Km
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          Surface Km
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          CD_Works_No
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          PCR submitted or not
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 500}]}>
          Remark
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>C</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>P</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>NS</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>ES</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>TS</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Apr</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>May</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Jun</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Jul</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Aug</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Sep</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Oct</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Nov</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Dec</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Jan</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Feb</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Mar</Text>
      </View>
    );
  };

  const renderNabardItem = ({item}) => {
    return (
      <View style={styles.tableRow}>
        <Text style={[styles.cell, {width: 100}]}>{item['SrNo']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Work Id']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['U_WIN']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['RIDF NO']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['srno']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Budget of Year']}
        </Text>

        <Text style={[styles.cell, {width: 100}]}>{item['District']}</Text>
        <Text style={[styles.cell, {width: 150}]}>{item['Taluka']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Budget of Item']}
        </Text>
        <Text style={[styles.cell, {width: 600}]}>{item['Name of Work']}</Text>
        <Text style={[styles.cell, {width: 150}]}>{item['Scope of Work']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Headwise']}</Text>
        <Text style={[styles.cell, {width: 150}]}>{item['Division']}</Text>
        <Text style={[styles.cell, {width: 150}]}>{item['Sub Division']}</Text>
        <Text style={[styles.cell, {width: 150}]}>
          {item['Sectional Engineer']}
        </Text>
        <Text style={[styles.cell, {width: 150}]}>
          {item['Deputy Engineer']}
        </Text>
        <Text style={[styles.cell, {width: 150}]}>{item['MLA']}</Text>
        <Text style={[styles.cell, {width: 150}]}>{item['MP']}</Text>
        <Text style={[styles.cell, {width: 150}]}>{item['Contractor']}</Text>
        <Text style={[styles.cell, {width: 200}]}>
          {item['Administrative No']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['A A Date']}</Text>
        <Text style={[styles.cell, {width: 600}]}>{item['PIC No']}</Text>
        <Text style={[styles.cell, {width: 600}]}>
          {item['AA cost Rs in lakhs']}
        </Text>
        <Text style={[styles.cell, {width: 150}]}>
          {item['Technical Sanction Cost Rs in Lakh']}
        </Text>

        <Text style={[styles.cell, {width: 150}]}>
          {item['Technical Sanction No and Date']}
        </Text>
        <Text style={[styles.cell, {width: 150}]}>{item['Tender No']}</Text>
        <Text style={[styles.cell, {width: 150}]}>{item['Tender Amount']}</Text>
        <Text style={[styles.cell, {width: 150}]}>{item['Work Order']}</Text>
        <Text style={[styles.cell, {width: 150}]}>{item['Tender Date']}</Text>
        <Text style={[styles.cell, {width: 150}]}>
          {item['Work Order Date']}
        </Text>
        <Text style={[styles.cell, {width: 150}]}>
          {item['Work Completion Date']}
        </Text>
        <Text style={[styles.cell, , {width: 150}]}>
          {item['Extension Month']}
        </Text>
        <Text style={[styles.cell, {width: 150}]}>
          {item['Estimated Cost Approved']}
        </Text>
        <Text style={[styles.cell, , {width: 150}]}>
          {item['Expenditure up to MAR 2026']}
        </Text>
        <Text style={[styles.cell, , {width: 150}]}>
          {item['Remaining Cost']}
        </Text>
        <Text style={[styles.cell, {width: 150}]}>{item['Current Cost']}</Text>
        <Text style={[styles.cell, , {width: 150}]}>
          {item['Previous Cost']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Expenditure up to 8/2020 during year 20-21 Rs in Lakhs']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Total Expense']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Budget Provision in 2026-22 Rs in Lakhs']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Second Provision']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Third Provision']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Fourth Provision']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Total Provision']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Total Grand']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Demand for 2026-22 Rs in Lakhs']}
        </Text>
        <Text style={[styles.cell, {width: 600}]}>
          {item['Observation Memo']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Probable date of completion']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Bill Status']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['Physical Progress of work']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Road Category']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Road Length']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Road Type']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['WBMI Km']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['WBMII Km']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['WBMIII Km']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['BBM Km']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Carpet Km']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Surface Km']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['CD_Works_No']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['PCR submitted or not']}
        </Text>
        <Text style={[styles.cell, {width: 500}]}>{item['Remark']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['C']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['P']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['NS']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['ES']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['TS']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Apr']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['May']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Jun']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Jul']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Aug']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Sep']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Oct']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Nov']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Dec']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Jan']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Feb']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Mar']}</Text>
      </View>
    );
  };

  const renderRoadHeader = () => {
    return (
      <View style={[styles.tableRow, {backgroundColor: '#f2f2f2'}]}>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          अ.क्र
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          वर्क आयडी
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          U_WIN
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          पान क्र
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          बाब क्र
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          जुलै/ बाब क्र./पान क्र.
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          अर्थसंकल्पीय वर्ष
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 600}]}>
          कामाचे नाव
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 600}]}>
          लेखाशीर्ष नाव
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          विभाग
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          उपविभाग
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          तालुका
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          शाखा अभियंता नाव
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          उपअभियंता नाव
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          आमदारांचे नाव
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          खासदारांचे नाव
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 200}]}>
          कंत्राटदार नाव
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          प्रशासकीय मान्यता रक्कम
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          प्रशासकीय मान्यता क्र/रक्कम/दिनांक
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          तांत्रिक मान्यता रक्कम
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          तांत्रिक मान्यता क्र/रक्कम/दिनांक
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          कामाचा वाव
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          कार्यारंभ आदेश
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          निविदा रक्कम % कमी / जास्त
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          निविदा क्र/दिनांक
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 150}]}>
          निविदा रक्कम % कमी / जास्त
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          बांधकाम कालावधी
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          काम पूर्ण तारीख
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          मुदतवाढ बाबत
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          मंजूर अंदाजित किंमत
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          सुरवाती पासून मार्च 2021 अखेरचा खर्च
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          उर्वरित किंमत
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          सन 2023-2024 मधील माहे एप्रिल/मे अखेरचा खर्च
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          मागील खर्च
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          एकुण कामावरील खर्च
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          2023-2024 मधील अर्थसंकल्पीय तरतूद मार्च 2021
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          2023-2024 मधील अर्थसंकल्पीय तरतूद जुलै 2021
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          तृतीय तिमाही तरतूद
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          चतुर्थ तिमाही तरतूद
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          एकूण अर्थसंकल्पीय तरतूद
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          2023-2024 मधील वितरीत तरतूद
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          2023-2024 साठी मागणी
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          विद्युतीकरणावरील प्रमा
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          विद्युतीकरणावरील वितरित
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          इतर खर्च
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          दवगुनी ज्ञापने
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          पाहणीमुद्ये
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>
          पाहणी क्रमांक
        </Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>C</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>P</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>NS</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>ES</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>TS</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 600}]}>शेरा</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Apr</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>May</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Jun</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Jul</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Aug</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Sep</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Oct</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Nov</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Dec</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Jan</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Feb</Text>
        <Text style={[styles.cell, styles.headerCell, {width: 100}]}>Mar</Text>
      </View>
    );
  };

  const renderRoadItem = ({item}) => {
    return (
      <View style={styles.tableRow}>
        <Text style={[styles.cell, {width: 100}]}>{item['अ.क्र']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['वर्क आयडी']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['U_WIN']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['पान क्र']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['बाब क्र']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['जुलै/ बाब क्र./पान क्र.']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['अर्थसंकल्पीय वर्ष']}
        </Text>
        <Text style={[styles.cell, {width: 600}]}>{item['कामाचे नाव']}</Text>
        <Text style={[styles.cell, {width: 600}]}>{item['लेखाशीर्ष नाव']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['विभाग']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['उपविभाग']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['तालुका']}</Text>
        <Text style={[styles.cell, {width: 200}]}>
          {item['शाखा अभियंता नाव']}
        </Text>
        <Text style={[styles.cell, {width: 200}]}>{item['उपअभियंता नाव']}</Text>
        <Text style={[styles.cell, {width: 200}]}>{item['आमदारांचे नाव']}</Text>
        <Text style={[styles.cell, {width: 200}]}>
          {item['खासदारांचे नाव']}
        </Text>
        <Text style={[styles.cell, {width: 200}]}>
          {item['कंत्राटदार नाव']}
        </Text>
        <Text style={[styles.cell, {width: 150}]}>
          {item['प्रशासकीय मान्यता रक्कम']}
        </Text>
        <Text style={[styles.cell, {width: 150}]}>
          {item['प्रशासकीय मान्यता क्र/रक्कम/दिनांक']}
        </Text>
        <Text style={[styles.cell, {width: 150}]}>
          {item['तांत्रिक मान्यता रक्कम']}
        </Text>
        <Text style={[styles.cell, {width: 150}]}>
          {item['तांत्रिक मान्यता क्र/रक्कम/दिनांक,']}
        </Text>
        <Text style={[styles.cell, {width: 150}]}>{item['कामाचा वाव']}</Text>
        <Text style={[styles.cell, {width: 150}]}>
          {item['कार्यारंभ आदेश']}
        </Text>
        <Text style={[styles.cell, {width: 150}]}>
          {item['निविदा रक्कम % कमी / जास्त']}
        </Text>

        <Text style={[styles.cell, {width: 150}]}>
          {item['निविदा क्र/दिनांक']}
        </Text>
        <Text style={[styles.cell, {width: 150}]}>
          {item['निविदा रक्कम % कमी / जास्त']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['बांधकाम कालावधी']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['काम पूर्ण तारीख']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['मुदतवाढ बाबत']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['मंजूर अंदाजित किंमत']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['सुरवाती पासून मार्च 2021 अखेरचा खर्च']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['उर्वरित किंमत']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['सन 2023-2024 मधील माहे एप्रिल/मे अखेरचा खर्च']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['मागील खर्च']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['एकुण कामावरील खर्च']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['2023-2024 मधील अर्थसंकल्पीय तरतूद मार्च 2021']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['2023-2024 मधील अर्थसंकल्पीय तरतूद जुलै 2021']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['तृतीय तिमाही तरतूद']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['चतुर्थ तिमाही तरतूद']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['एकूण अर्थसंकल्पीय तरतूद']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['2023-2024 मधील वितरीत तरतूद']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['2023-2024 साठी मागणी']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['विद्युतीकरणावरील प्रमा']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['विद्युतीकरणावरील वितरित']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['इतर खर्च']}</Text>
        <Text style={[styles.cell, {width: 100}]}>
          {item['दवगुनी ज्ञापने']}
        </Text>
        <Text style={[styles.cell, {width: 100}]}>{item['पाहणीमुद्ये']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['पाहणी क्रमांक']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['C']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['P']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['NS']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['ES']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['TS']}</Text>
        <Text style={[styles.cell, {width: 600}]}>{item['शेरा']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Apr']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['May']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Jun']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Jul']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Aug']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Sep']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Oct']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Nov']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Dec']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Jan']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Feb']}</Text>
        <Text style={[styles.cell, {width: 100}]}>{item['Mar']}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Report</Text>
      </View>

      <View style={{paddingVertical: 10}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.buttonContainer}>
            {sections?.map(section => (
              <TouchableOpacity
                key={section}
                onPress={() => handleSectionChange(section)}
                style={[
                  styles.sectionButton,
                  selectedSection === section && styles.activeButton,
                ]}>
                <Text style={styles.buttonText}>{section}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={styles.contentContainer}>
          {role === 'Executive Engineer' && (
            <>
              {selectedSection === 'Building' && (
                <>
                  <Text style={styles.sectionTitle}>Building</Text>
                  <ScrollView horizontal>
                    <View style={{height: screenHeight * 0.6}}>
                      {renderBuildingHeader()}
                      <FlatList
                        data={paginatedData}
                        renderItem={renderBuildingItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={renderPagination()}
                        ListEmptyComponent={
                          <Text style={styles.noDataText}>
                            No data available
                          </Text>
                        }
                        contentContainerStyle={{paddingBottom: 80}}
                      />
                    </View>
                  </ScrollView>
                  ListFooterComponent={renderPagination()}
                </>
              )}

              {selectedSection === 'CRF' && (
                <>
                  <Text style={styles.sectionTitle}>CRF</Text>
                  <ScrollView horizontal>
                    <View style={{height: screenHeight * 0.6}}>
                      {renderCRFHeader()}
                      <FlatList
                        data={paginatedData}
                        renderItem={renderCRFItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={renderPagination()}
                        ListEmptyComponent={
                          <Text style={styles.noDataText}>
                            No data available
                          </Text>
                        }
                        contentContainerStyle={{paddingBottom: 80}}
                      />
                    </View>
                  </ScrollView>
                  ListFooterComponent={renderPagination()}
                </>
              )}

              {selectedSection === 'Annuity' && (
                <>
                  <Text style={styles.sectionTitle}>Annuity</Text>
                  <ScrollView horizontal>
                    <View style={{height: screenHeight * 0.6}}>
                      {renderAnnuityHeader()}
                      <FlatList
                        data={paginatedData}
                        renderItem={renderAnnuityItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={renderPagination()}
                        ListEmptyComponent={
                          <Text style={styles.noDataText}>
                            No data available
                          </Text>
                        }
                        contentContainerStyle={{paddingBottom: 80}}
                      />
                    </View>
                  </ScrollView>
                  ListFooterComponent={renderPagination()}
                </>
              )}

              {selectedSection === 'Nabard' && (
                <>
                  <Text style={styles.sectionTitle}>Nabard</Text>
                  <ScrollView horizontal>
                    <View style={{height: screenHeight * 0.6}}>
                      {renderNabardHeader()}
                      <FlatList
                        data={paginatedData}
                        renderItem={renderNabardItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={renderPagination()}
                        ListEmptyComponent={
                          <Text style={styles.noDataText}>
                            No data available
                          </Text>
                        }
                        contentContainerStyle={{paddingBottom: 80}}
                      />
                    </View>
                  </ScrollView>
                  ListFooterComponent={renderPagination()}
                </>
              )}

              {selectedSection === 'Road' && (
                <>
                  <Text style={styles.sectionTitle}>Road</Text>
                  <ScrollView horizontal>
                    <View style={{height: screenHeight * 0.6}}>
                      {renderRoadHeader()}
                      <FlatList
                        data={paginatedData}
                        renderItem={renderRoadItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={renderPagination()}
                        ListEmptyComponent={
                          <Text style={styles.noDataText}>
                            No data available
                          </Text>
                        }
                        contentContainerStyle={{paddingBottom: 80}}
                      />
                    </View>
                  </ScrollView>
                  ListFooterComponent={renderPagination()}
                </>
              )}

              {[
                '2515',
                'Deposit',
                'DPDC',
                'Gat_A',
                'Gat_BCF',
                'Gat_D',
                'MLA',
                'MP',
                '2216',
                '2059',
              ].includes(selectedSection) && (
                <>
                  <Text style={styles.sectionTitle}>{selectedSection}</Text>
                  <ScrollView horizontal>
                    <View style={{height: screenHeight * 0.6}}>
                      {renderBuildingHeader()}
                      <FlatList
                        data={paginatedData}
                        renderItem={renderBuildingItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={renderPagination()}
                        ListEmptyComponent={
                          <Text style={styles.noDataText}>No data available</Text>
                        }
                        contentContainerStyle={{paddingBottom: 80}}
                      />
                    </View>
                  </ScrollView>
                  ListFooterComponent={renderPagination()}
                </>
              )}
            </>
          )}

          {['Contractor', 'Sectional Engineer', 'Deputy Engineer'].includes(
            role,
          ) && (
            <>
              {selectedSection === 'Building' && (
                <>
                  <Text style={styles.sectionTitle}>Building</Text>
                  <ScrollView horizontal>
                    <View style={{height: screenHeight * 0.6}}>
                      {renderBuildingHeader()}
                      <FlatList
                        data={contactorBuildingData}
                        renderItem={renderBuildingItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={renderPagination()}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={5}
                        removeClippedSubviews={true}
                        ListEmptyComponent={
                          <Text style={styles.noDataText}>
                            No data available
                          </Text>
                        }
                        contentContainerStyle={{paddingBottom: 80}}
                      />
                    </View>
                  </ScrollView>
                  ListFooterComponent={renderPagination()}
                </>
              )}

              {selectedSection === 'CRF' && (
                <>
                  <Text style={styles.sectionTitle}>CRF</Text>
                  <ScrollView horizontal>
                    <View style={{height: screenHeight * 0.6}}>
                      {renderCRFHeader()}
                      <FlatList
                        data={contactorCrfdata}
                        renderItem={renderCRFItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={renderPagination()}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={5}
                        removeClippedSubviews={true}
                        ListEmptyComponent={
                          <Text style={styles.noDataText}>
                            No data available
                          </Text>
                        }
                        contentContainerStyle={{paddingBottom: 80}}
                      />
                    </View>
                  </ScrollView>
                  ListFooterComponent={renderPagination()}
                </>
              )}

              {selectedSection === 'Annuity' && (
                <>
                  <Text style={styles.sectionTitle}>Annuity</Text>
                  <ScrollView horizontal>
                    <View style={{height: screenHeight * 0.6}}>
                      {renderAnnuityHeader()}
                      <FlatList
                        data={contactorAnnuitydata}
                        renderItem={renderAnnuityItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={renderPagination()}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={5}
                        removeClippedSubviews={true}
                        ListEmptyComponent={
                          <Text style={styles.noDataText}>
                            No data available
                          </Text>
                        }
                        contentContainerStyle={{paddingBottom: 80}}
                      />
                    </View>
                  </ScrollView>
                  ListFooterComponent={renderPagination()}
                </>
              )}

              {selectedSection === 'Nabard' && (
                <>
                  <Text style={styles.sectionTitle}>Nabard</Text>
                  <ScrollView horizontal>
                    <View style={{height: screenHeight * 0.6}}>
                      {renderNabardHeader()}
                      <FlatList
                        data={ContractorNabarddata}
                        renderItem={renderNabardItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={renderPagination()}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={5}
                        removeClippedSubviews={true}
                        ListEmptyComponent={
                          <Text style={styles.noDataText}>
                            No data available
                          </Text>
                        }
                        contentContainerStyle={{paddingBottom: 80}}
                      />
                    </View>
                  </ScrollView>
                  ListFooterComponent={renderPagination()}
                </>
              )}

              {selectedSection === 'Road' && (
                <>
                  <Text style={styles.sectionTitle}>Road</Text>
                  <ScrollView horizontal>
                    <View style={{height: screenHeight * 0.6}}>
                      {renderRoadHeader()}
                      <FlatList
                        data={Contractorroaddata}
                        renderItem={renderRoadItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListFooterComponent={renderPagination()}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        windowSize={5}
                        removeClippedSubviews={true}
                        ListEmptyComponent={
                          <Text style={styles.noDataText}>
                            No data available
                          </Text>
                        }
                        contentContainerStyle={{paddingBottom: 80}}
                      />
                    </View>
                  </ScrollView>
                  ListFooterComponent={renderPagination()}
                </>
              )}
            </>
          )}
        </ScrollView>
      )}
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
    //flex: 1,
    backgroundColor: 'white',
    // padding: 10,
    flexGrow: 1,
    paddingBottom: 80,
  },
  noDataText: {
    fontSize: 16,
    color: 'black',
    top:100,
    left:170   
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  cell: {
    minWidth: 120,
    padding: 8,
    borderRightWidth: 1,
    borderColor: '#eee',
    fontSize: 12,
    height: 50,
  },
  headerCell: {
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  sectionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'black',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ReportScreen;
