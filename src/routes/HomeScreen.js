/* eslint-disable react-native/no-inline-styles */
/* eslint-disable dot-notation */
import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BarChart} from 'react-native-chart-kit';
import LinearGradient from 'react-native-linear-gradient';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import ProfileComponent from '../components/ProfileComponent';
import AIModal from '../components/AIModal';
import {countApi, perSubDivCountApi} from '../Api/dashBoardApi';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  BudgetMaster2515Api,
  BudgetMasterAggregateApi,
  BudgetMasterAuntyApi,
  BudgetMasterBuildingApi,
  BudgetMasterCRFApi,
  BudgetMasterDepositFundApi,
  BudgetMasterDPDCApi,
  BudgetMasterGAT_AApi,
  BudgetMasterGAT_DApi,
  BudgetMasterGAT_FBCApi,
  BudgetMasterMLAApi,
  BudgetMasterMPApi,
  BudgetMasterNABARDApi,
  BudgetMasterRoadApi,
} from '../Api/HeadWiseReportApi';
import ImageViewing from 'react-native-image-viewing';
import {HomeAllimageapi} from '../Api/AllImageApi';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = ({navigation}) => {
  const [graphData, setGraphData] = useState([]);
  const [animatedGraphData, setAnimatedGraphData] = useState([]);
  const [stackedBarChartData, setStackedBarChartData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [location, setLocation] = useState(null);
  const [role, setRole] = useState(null);
  const [, setSelectedHeadWiseData] = useState([]);
  const [expandedHead, setExpandedHead] = useState(null);
  const [headWiseDataResult, setHeadWiseDataResult] = useState([]);
  const [headWiseMessage, setHeadWiseMessage] = useState('');
  const [totalHeadAbstractData, setTotalHeadAbstractData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = imageData.map(img => ({
    uri:
      img.imageUrl ||
      img.ImageUrl ||
      img.image ||
      (img.Image ? `data:image/jpeg;base64,${img.Image}` : ''),
  }));
  const COLUMN_WIDTHS = {
    status: 100,
    totalWork: 80,
    estimate: 100,
    tsCost: 100,
    budget: 120,
    expenditure: 120,
  };

  const headWiseData = [
    {title: 'Building'},
    {title: 'CRF'},
    {title: 'Annuity'},
    {title: 'Nabard'},
    {title: 'SH & DOR'},
    {title: 'NonPlan'},
    {title: '2515'},
    {title: 'Deposit'},
    {title: 'DPDC'},
    {title: 'Gat_D'},
    {title: 'Gat_B|C|F'},
    {title: 'MLA'},
    {title: '2059'},
    {title: '2216'},
    {title: 'MP'},
    {title: 'Total Head Abstract Report'},
  ];

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => {
        setCurrentIndex(index);
        setVisible(true);
      }}
      style={styles.imageContainer}>
      <Image
        source={{
          uri:
            item.imageUrl ||
            item.ImageUrl ||
            item.image ||
            (item.Image ? `data:image/jpeg;base64,${item.Image}` : null),
        }}
        style={styles.image}
      />
    </TouchableOpacity>
  );

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

        const storedUserName = await AsyncStorage.getItem('USER_NAME');
        if (storedUserName) {
          setUserName(storedUserName);
        }

        const storedLocation = await AsyncStorage.getItem('LOCATION_ID');
        if (storedLocation) {
          setLocation(storedLocation);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (!graphData || graphData.length === 0) {
      return;
    }
    let startTime;
    const duration = 2000;
    const animateBars = timestamp => {
      if (!startTime) {
        startTime = timestamp;
      }
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setAnimatedGraphData(
        graphData.map(item => Math.floor(item.count * progress)),
      );

      if (progress < 1) {
        requestAnimationFrame(animateBars);
      }
    };
    requestAnimationFrame(animateBars);
  }, [graphData]);

  const homeAllImage = useCallback(async () => {
    setLoadingImages(true);
    try {
      const response = await HomeAllimageapi({office: location});
      if (response?.success && Array.isArray(response.data)) {
        if (response.data[0]?.imageBase64) {
        }
        setImageData(response.data);
      } else {
        console.warn('⚠️ API did not return valid data');
        setImageData([]);
      }
    } catch (error) {
      console.error('🔥 Error in HomeAllimage:', error);
      setImageData([]);
    } finally {
      setLoadingImages(false);
    }
  }, [location]);

  const fetchGraphData = useCallback(async () => {
    try {
      const data = await countApi({office: location});
      if (data?.success === true || data?.success === 'true') {
        if (Array.isArray(data.data)) {
          setGraphData(data.data);
        } else {
          setGraphData([]);
        }
      } else {
        setGraphData([]);
        console.warn('API did not return success:', data?.success);
      }
    } catch (error) {
      console.error('Error fetching graph data:', error);
      setGraphData([]);
    }
  }, [location]);

  const fetchperSubDivCountData = useCallback(async () => {
    try {
      const data = await perSubDivCountApi({office: location});

      if (data?.success === true && Array.isArray(data.data)) {
        const labels = data.data.map(item => item.Upvibhag).slice(0, 6);
        const values = data.data.map(item => [item.count]).slice(0, 6);
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
        setStackedBarChartData({
          labels,
          legend: ['Count'],
          data: values,
          barColors: labels.map((_, i) => colors[i % colors.length]),
        });
      } else {
        setStackedBarChartData(null);
      }
    } catch (error) {
      console.error('Error fetching sub-division data:', error);
      setStackedBarChartData(null);
    }
  }, [location]);

  useEffect(() => {
    if (!location) {
      return;
    }
    fetchGraphData();
    fetchperSubDivCountData();
    homeAllImage();
  }, [location, fetchGraphData, fetchperSubDivCountData, homeAllImage]);

  const fetchBudgetMaster2515 = async () => {
    try {
      const data = await BudgetMaster2515Api({
        office: location,
        position: role,
      });
      if (data?.success === true || data?.success === 'true') {
        return data;
      } else {
        console.warn('API did not return success:', data?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching 2515 data:', error);
      return {success: false, data: []};
    }
  };

  const fetchBudgetMasterNABARD = async () => {
    try {
      const data = await BudgetMasterNABARDApi({
        office: location,
        position: role,
      });
      if (data?.success === true || data?.success === 'true') {
        return data;
      } else {
        console.warn('API did not return success:', data?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching NABARD data:', error);
      return {success: false, data: []};
    }
  };

  const fetchBudgetMasterRoad = async () => {
    try {
      const data = await BudgetMasterRoadApi({
        office: location,
        position: role,
      });
      if (data?.success === true || data?.success === 'true') {
        return data;
      } else {
        console.warn('API did not return success:', data?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching NABARD data:', error);
      return {success: false, data: []};
    }
  };

  const fetchBudgetMasterMP = async () => {
    try {
      const data = await BudgetMasterMPApi({
        office: location,
        position: role,
      });
      if (data?.success === true || data?.success === 'true') {
        return data;
      } else {
        console.warn('API did not return success:', data?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching NABARD data:', error);
      return {success: false, data: []};
    }
  };

  const fetchBudgetMasterMLA = async () => {
    try {
      const data = await BudgetMasterMLAApi({
        office: location,
        position: role,
      });
      if (data?.success === true || data?.success === 'true') {
        return data;
      } else {
        console.warn('API did not return success:', data?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching NABARD data:', error);
      return {success: false, data: []};
    }
  };

  const fetchBudgetMasterGAT_FBC = async () => {
    try {
      const data = await BudgetMasterGAT_FBCApi({
        office: location,
        position: role,
      });
      if (data?.success === true || data?.success === 'true') {
        return data;
      } else {
        console.warn('API did not return success:', data?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching NABARD data:', error);
      return {success: false, data: []};
    }
  };

  const fetchBudgetMasterGAT_D = async () => {
    try {
      const data = await BudgetMasterGAT_DApi({
        office: location,
        position: role,
      });
      if (data?.success === true || data?.success === 'true') {
        return data;
      } else {
        console.warn('API did not return success:', data?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching NABARD data:', error);
      return {success: false, data: []};
    }
  };

  const fetchBudgetMasterGAT_A = async () => {
    try {
      const data = await BudgetMasterGAT_AApi({
        office: location,
        position: role,
      });
      if (data?.success === true || data?.success === 'true') {
        return data;
      } else {
        console.warn('API did not return success:', data?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching NABARD data:', error);
      return {success: false, data: []};
    }
  };

  const fetchBudgetMasterDPDC = async () => {
    try {
      const data = await BudgetMasterDPDCApi({
        office: location,
        position: role,
      });
      if (data?.success === true || data?.success === 'true') {
        return data;
      } else {
        console.warn('API did not return success:', data?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching NABARD data:', error);
      return {success: false, data: []};
    }
  };

  const fetchBudgetMasterDepositFund = async () => {
    try {
      const data = await BudgetMasterDepositFundApi({
        office: location,
        position: role,
      });
      if (data?.success === true || data?.success === 'true') {
        return data;
      } else {
        console.warn('API did not return success:', data?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching NABARD data:', error);
      return {success: false, data: []};
    }
  };

  const fetchBudgetMasterCRF = async () => {
    try {
      const data = await BudgetMasterCRFApi({
        office: location,
        position: role,
      });
      if (data?.success === true || data?.success === 'true') {
        return data;
      } else {
        console.warn('API did not return success:', data?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching NABARD data:', error);
      return {success: false, data: []};
    }
  };

  const fetchBudgetMasterBuilding = async () => {
    try {
      const data = await BudgetMasterBuildingApi({
        office: location,
        position: role,
      });
      if (data?.success === true || data?.success === 'true') {
        return data;
      } else {
        console.warn('API did not return success:', data?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching NABARD data:', error);
      return {success: false, data: []};
    }
  };

  const fetchBudgetMasterAunty = async () => {
    try {
      const data = await BudgetMasterAuntyApi({
        office: location,
        position: role,
      });
      if (data?.success === true || data?.success === 'true') {
        return data;
      } else {
        console.warn('API did not return success:', data?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching NABARD data:', error);
      return {success: false, data: []};
    }
  };

  const fetchBudgetMasterAggregate = async () => {
    try {
      const data = await BudgetMasterAggregateApi({
        office: location,
        position: role,
      });
      if (data?.success === true || data?.success === 'true') {
        setTotalHeadAbstractData(data.data);
        return data;
      } else {
        console.warn('API did not return success:', data?.success);
        return {success: false, data: []};
      }
    } catch (error) {
      console.error('Error fetching NABARD data:', error);
      return {success: false, data: []};
    }
  };

  const handleHeadWiseSelection = async title => {
    if (expandedHead === title) {
      setExpandedHead(null);
      setHeadWiseDataResult([]);
      setHeadWiseMessage('');
      return;
    }
    setExpandedHead(title);
    setSelectedHeadWiseData([title]);
    setHeadWiseMessage('');
    let result = null;
    if (title === '2515') {
      result = await fetchBudgetMaster2515();
    } else if (title === 'Nabard') {
      result = await fetchBudgetMasterNABARD();
    } else if (title === 'MP') {
      result = await fetchBudgetMasterMP();
    } else if (title === 'MLA') {
      result = await fetchBudgetMasterMLA();
    } else if (title === 'Gat_B|C|F') {
      result = await fetchBudgetMasterGAT_FBC();
    } else if (title === 'Gat_D') {
      result = await fetchBudgetMasterGAT_D();
    } else if (title === 'NonPlan') {
      result = await fetchBudgetMasterGAT_A();
    } else if (title === 'DPDC') {
      result = await fetchBudgetMasterDPDC();
    } else if (title === 'Deposit') {
      result = await fetchBudgetMasterDepositFund();
    } else if (title === 'CRF') {
      result = await fetchBudgetMasterCRF();
    } else if (title === 'Building') {
      result = await fetchBudgetMasterBuilding();
    } else if (title === 'Annuity') {
      result = await fetchBudgetMasterAunty();
    } else if (title === 'SH & DOR') {
      result = await fetchBudgetMasterRoad();
    } else if (title === 'Total Head Abstract Report') {
      result = await fetchBudgetMasterAggregate();
    }
    if (result?.data && Array.isArray(result.data) && result.data.length > 0) {
      setHeadWiseDataResult(result.data);
      setHeadWiseMessage('');
    } else {
      setHeadWiseDataResult([]);
      setHeadWiseMessage('No data found');
    }
  };

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

  const totalRow = {
    status: 'Total',
    totalWork: 0,
    estimatedCost: 0,
    tsCost: 0,
    budget: 0,
    expenditure: 0,
  };

  headWiseDataResult?.forEach(row => {
    totalRow.totalWork += Number(row['Total Work'] || 0);
    totalRow.estimatedCost += Number(row['Estimated Cost'] || 0);
    totalRow.tsCost += Number(row['T.S Cost'] || 0);
    totalRow.budget += Number(row['Budget Provision 2023-2024'] || 0);
    totalRow.expenditure += Number(row['Expenditure 2023-2024'] || 0);
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.container}>
        <HeaderComponent />
        <ProfileComponent
          profileImage={require('../assets/images/profile.png')}
          userName={userName}
          onProfilePress={() => navigation.navigate('ProfileScreen')}
          onNotificationPress={() => navigation.navigate('NotificationScreen')}
        />

        <View style={styles.scrollContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {Array.isArray(graphData) && graphData.length > 0 ? (
              <>
                <Text style={styles.chartHeading}>
                  Smart Budget Head Wise Count
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View
                    style={[
                      styles.chartContainer,
                      {width: Math.max(screenWidth, graphData.length * 60)},
                    ]}>
                    <BarChart
                      data={{
                        labels: graphData.map(item => item.title || 'N/A'),
                        datasets: [
                          {
                            data: animatedGraphData.length
                              ? animatedGraphData
                              : graphData.map(() => 0),
                            colors: graphData.map(
                              (_, i) => () => randomColor(i),
                            ),
                          },
                        ],
                      }}
                      width={Math.max(screenWidth, graphData.length * 60)}
                      height={250}
                      fromZero
                      showValuesOnTopOfBars
                      withCustomBarColorFromData
                      flatColor
                      chartConfig={chartConfig}
                    />
                  </View>
                </ScrollView>
              </>
            ) : (
              <Text style={styles.noDataTxt}>No Data Available</Text>
            )}

            {stackedBarChartData?.labels?.length > 0 ? (
              <>
                <Text style={styles.chartHeading}>Sub-Division Count</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={{width: stackedBarChartData.labels.length * 80}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        paddingBottom: 4,
                      }}>
                      {stackedBarChartData?.labels?.length > 0 ? (
                        <>
                          <View style={styles.horizontalBarChartWrapper}>
                            {stackedBarChartData.labels.map((label, index) => {
                              const value = stackedBarChartData.data[index][0];
                              const maxValue = Math.max(
                                ...stackedBarChartData.data.map(d => d[0]),
                              );
                              const barWidth = (value / maxValue) * 100;

                              return (
                                <View key={index} style={[styles.barRow]}>
                                  <Text style={styles.barLabel}>
                                    {label.replace(',', ',\n')}
                                  </Text>

                                  <View style={styles.barAndValue}>
                                    <View
                                      style={[
                                        styles.barFill,
                                        {
                                          width: `${barWidth}%`,
                                          backgroundColor: randomColor(index),
                                          maxWidth: '85%',
                                        },
                                      ]}
                                    />
                                    <Text style={styles.barValue}>{value}</Text>
                                  </View>
                                </View>
                              );
                            })}
                          </View>
                        </>
                      ) : (
                        <Text style={styles.noDataTxt}>No Data Available</Text>
                      )}
                    </View>
                  </View>
                </ScrollView>
              </>
            ) : (
              <Text style={styles.noDataTxt}>No Data Available</Text>
            )}

            <View style={styles.headWiseContainer}>
              <Text style={styles.headWiseTitle}>
                Head Wise Abstract Report
              </Text>

              {headWiseData?.map((item, index) => (
                <View key={index}>
                  <View style={styles.headRow}>
                    <TouchableOpacity
                      style={styles.plusIconContainer}
                      onPress={() => {
                        handleHeadWiseSelection(item.title);
                      }}>
                      <Icon
                        name={expandedHead === item.title ? 'minus' : 'plus'}
                        size={14}
                        color="#fff"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('HeadWiseReportScreen', {
                          selectedHead: item.title,
                        });
                      }}>
                      <Text style={styles.headRowText}>{item.title}</Text>
                    </TouchableOpacity>
                  </View>

                  {expandedHead === item.title && (
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={styles.tableContainer}>
                      {item.title === 'Total Head Abstract Report' ? (
                        <View>
                          <View style={[styles.tableHeader]}>
                            <Text style={[styles.tableCell, {width: 120}]}>
                              Head Name
                            </Text>
                            <Text style={[styles.tableCell, {width: 100}]}>
                              Completed
                            </Text>
                            <Text style={[styles.tableCell, {width: 100}]}>
                              Incompleted
                            </Text>
                            <Text style={[styles.tableCell, {width: 100}]}>
                              In Progress
                            </Text>
                            <Text style={[styles.tableCell, {width: 100}]}>
                              Tender Stage
                            </Text>
                            <Text style={[styles.tableCell, {width: 120}]}>
                              Estimated Stage
                            </Text>
                            <Text style={[styles.tableCell, {width: 100}]}>
                              Not Started
                            </Text>
                            <Text style={[styles.tableCell, {width: 100}]}>
                              No Status
                            </Text>
                            <Text style={[styles.tableCell, {width: 100}]}>
                              No. of Works
                            </Text>
                            <Text style={[styles.tableCell, {width: 140}]}>
                              Estimated Cost{'\n'}2025-2026
                            </Text>
                            <Text style={[styles.tableCell, {width: 140}]}>
                              T.S Cost{'\n'}2025-2026
                            </Text>
                            <Text style={[styles.tableCell, {width: 160}]}>
                              Budget Provision{'\n'}2025-2026
                            </Text>
                            <Text style={[styles.tableCell, {width: 160}]}>
                              Expenditure{'\n'}2025-2026
                            </Text>
                          </View>

                          {totalHeadAbstractData?.map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.tableRow}>
                              <Text style={[styles.tableCell, {width: 120}]}>
                                {row['Head Name']}
                              </Text>
                              <Text style={[styles.tableCell, {width: 100}]}>
                                {row['Completed']}
                              </Text>
                              <Text style={[styles.tableCell, {width: 100}]}>
                                {row['Incomplete']}
                              </Text>
                              <Text style={[styles.tableCell, {width: 100}]}>
                                {row['Inprogress']}
                              </Text>
                              <Text style={[styles.tableCell, {width: 100}]}>
                                {row['Tender Stage']}
                              </Text>
                              <Text style={[styles.tableCell, {width: 120}]}>
                                {row['Estimated Stage']}
                              </Text>
                              <Text style={[styles.tableCell, {width: 100}]}>
                                {row['Not Started']}
                              </Text>
                              <Text style={[styles.tableCell, {width: 100}]}>
                                {row['No Status']}
                              </Text>
                              <Text style={[styles.tableCell, {width: 100}]}>
                                {row['No.of.works']}
                              </Text>
                              <Text style={[styles.tableCell, {width: 140}]}>
                                {row['Estimated Cost 2025-2026']}
                              </Text>
                              <Text style={[styles.tableCell, {width: 140}]}>
                                {row['T.S Cost 2025-2026']}
                              </Text>
                              <Text style={[styles.tableCell, {width: 160}]}>
                                {row['Budget Provision 2025-2026']}
                              </Text>
                              <Text style={[styles.tableCell, {width: 160}]}>
                                {row['Expenditure 2025-2026']}
                              </Text>
                            </View>
                          ))}
                        </View>
                      ) : (
                        <View>
                          <View style={styles.tableHeader}>
                            <Text
                              style={[
                                styles.tableCell,
                                {width: COLUMN_WIDTHS.status},
                              ]}>
                              Work Status
                            </Text>
                            <Text
                              style={[
                                styles.tableCell,
                                {width: COLUMN_WIDTHS.totalWork},
                              ]}>
                              Total Work
                            </Text>
                            <Text
                              style={[
                                styles.tableCell,
                                {width: COLUMN_WIDTHS.estimate},
                              ]}>
                              Estimated Cost
                            </Text>
                            <Text
                              style={[
                                styles.tableCell,
                                {width: COLUMN_WIDTHS.tsCost},
                              ]}>
                              T.S Cost
                            </Text>
                            <Text
                              style={[
                                styles.tableCell,
                                {width: COLUMN_WIDTHS.budget},
                              ]}>
                              Budget Provision
                            </Text>
                            <Text
                              style={[
                                styles.tableCell,
                                {width: COLUMN_WIDTHS.expenditure},
                              ]}>
                              Expenditure
                            </Text>
                          </View>

                          {headWiseDataResult?.map((row, rowIndex) => (
                            <View key={rowIndex} style={styles.tableRow}>
                              <Text
                                style={[
                                  styles.tableCell,
                                  {width: COLUMN_WIDTHS.status},
                                ]}>
                                {row['Work Status']}
                              </Text>
                              <Text
                                style={[
                                  styles.tableCell,
                                  {width: COLUMN_WIDTHS.totalWork},
                                ]}>
                                {row['Total Work']}
                              </Text>
                              <Text
                                style={[
                                  styles.tableCell,
                                  {width: COLUMN_WIDTHS.estimate},
                                ]}>
                                {row['Estimated Cost']}
                              </Text>
                              <Text
                                style={[
                                  styles.tableCell,
                                  {width: COLUMN_WIDTHS.tsCost},
                                ]}>
                                {row['T.S Cost']}
                              </Text>
                              <Text
                                style={[
                                  styles.tableCell,
                                  {width: COLUMN_WIDTHS.budget},
                                ]}>
                                {row['Budget Provision 2023-2024']}
                              </Text>
                              <Text
                                style={[
                                  styles.tableCell,
                                  {width: COLUMN_WIDTHS.expenditure},
                                ]}>
                                {row['Expenditure 2023-2024']}
                              </Text>
                            </View>
                          ))}

                          {headWiseDataResult?.length === 0 && (
                            <View style={styles.noDataContainer}>
                              <Text style={styles.noDataText}>
                                {headWiseMessage || 'No data found'}
                              </Text>
                            </View>
                          )}

                          {headWiseDataResult?.length > 0 && (
                            <View style={[styles.tableRow]}>
                              <Text
                                style={[
                                  styles.tableCell,
                                  {
                                    width: COLUMN_WIDTHS.status,
                                    fontWeight: 'bold',
                                  },
                                ]}>
                                एकूण
                              </Text>
                              <Text
                                style={[
                                  styles.tableCell,
                                  {width: COLUMN_WIDTHS.totalWork},
                                ]}>
                                {totalRow.totalWork}
                              </Text>
                              <Text
                                style={[
                                  styles.tableCell,
                                  {width: COLUMN_WIDTHS.estimate},
                                ]}>
                                {totalRow.estimatedCost.toFixed(2)}
                              </Text>
                              <Text
                                style={[
                                  styles.tableCell,
                                  {width: COLUMN_WIDTHS.tsCost},
                                ]}>
                                {totalRow.tsCost.toFixed(2)}
                              </Text>
                              <Text
                                style={[
                                  styles.tableCell,
                                  {width: COLUMN_WIDTHS.budget},
                                ]}>
                                {totalRow.budget.toFixed(2)}
                              </Text>
                              <Text
                                style={[
                                  styles.tableCell,
                                  {width: COLUMN_WIDTHS.expenditure},
                                ]}>
                                {totalRow.expenditure.toFixed(2)}
                              </Text>
                            </View>
                          )}
                        </View>
                      )}
                    </ScrollView>
                  )}
                </View>
              ))}
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.heading}>Image Grid</Text>

              {loadingImages ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size="large" color="#007bff" />
                  <Text>Loading images...</Text>
                </View>
              ) : (
                <FlatList
                  data={imageData}
                  renderItem={renderItem}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={3}
                  contentContainerStyle={styles.imageGridContent}
                />
              )}
            </View>
          </ScrollView>
        </View>

        <ImageViewing
          images={images}
          imageIndex={currentIndex}
          visible={visible}
          onRequestClose={() => setVisible(false)}
        />

        <TouchableOpacity
          style={styles.aiButtonContainer}
          onPress={() => setModalVisible(true)}>
          <LinearGradient
            colors={['#4A90E2', '#FFC0CB', '#FFFFFF', '#87CEFA']}
            start={{x: 0.1, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.aiButton}>
            <Text style={styles.aiButtonText}>A.I</Text>
          </LinearGradient>
        </TouchableOpacity>

        <AIModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
        <FooterComponent />
      </View>
    </SafeAreaView>
  );
};

const chartConfig = {
  backgroundColor: 'white',
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    height: '78%',
    width: '100%',
    padding: 10,
  },
  scrollViewContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  chartContainer: {
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffa500',
  },
  chart: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#ffa500',
  },
  aiButtonContainer: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    zIndex: 10,
  },
  aiButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  aiButtonText: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
  },
  chartHeading: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  noDataTxt: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
  },
  horizontalBarChartWrapper: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    borderWidth: 3,
    borderColor: '#ffa500',
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  barLabel: {
    fontSize: 12,
    color: '#000',
    textAlign: 'left',
    lineHeight: 16,
    width: 80,
  },
  barAndValue: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  barFill: {
    height: 20,
    borderRadius: 6,
  },
  barValue: {
    marginLeft: 6,
    fontSize: 12,
    color: '#000',
  },
  headWiseContainer: {
    width: screenWidth - 30,
    margin: 16,
    borderWidth: 2,
    //borderColor: '#800000',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
    borderRadius: 10,
    borderColor: '#ffa500',
  },
  headWiseTitle: {
    backgroundColor: '#999',
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headRowText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  plusIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  tableContainer: {
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    borderRadius: 4,
  },
  tableCell: {
    fontSize: 12,
    color: '#000',
    paddingHorizontal: 4,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  noDataContainer: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 14,
    color: '#666',
  },
  imageGridContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'orange',
  },
});

export default HomeScreen;
