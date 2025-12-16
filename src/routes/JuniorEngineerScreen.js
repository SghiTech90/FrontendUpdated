import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import ProfileComponent from '../components/ProfileComponent';
import AIModal from '../components/AIModal';
import LinearGradient from 'react-native-linear-gradient';
import {BarChart} from 'react-native-gifted-charts';
import Icon from 'react-native-vector-icons/FontAwesome';
import {HomeAllimageapi, RollwiseImageApi} from '../Api/AllImageApi';
import ImageViewing from 'react-native-image-viewing';
import {contractorCountApi} from '../Api/ContractordashBoardApi';

const screenWidth = Dimensions.get('window').width;

const JuniorEngineerScreen = ({navigation, route}) => {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);
  const [location, setLocation] = useState(null);
  const [userName, setUserName] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Building');
  const [expandedHead, setExpandedHead] = useState(null);
  const [headWiseDataResult, setHeadWiseDataResult] = useState([]);
  const [selectedHeadWiseData, setSelectedHeadWiseData] = useState([]);
  const [imageData, setImageData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [barData, setBarData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingImages, setLoadingImages] = useState(false);
  const images = imageData.map(img => ({
    uri:
      img.imageUrl ||
      img.ImageUrl ||
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

  const barColors = [
    '#4CAF50',
    '#2196F3',
    '#FFC107',
    '#FF5722',
    '#9C27B0',
    '#009688',
    '#3F51B5',
    '#E91E63',
    '#00BCD4',
    '#CDDC39',
    '#673AB7',
    '#FF9800',
  ];

  const [selectedNutritionCategory, setSelectedNutritionCategory] =
    useState('Building');

  const headWiseData = [
    {title: 'Building'},
    {title: 'CRF'},
    {title: 'Annuity'},
    {title: 'Nabard'},
    {title: 'SH & DOR'},
    {title: '2515'},
    {title: 'Deposit'},
    {title: 'DPDC'},
    {title: 'Gat_A'},
    {title: 'Gat_D'},
    {title: 'Gat_B|C|F'},
    {title: 'MLA'},
    {title: '2059'},
    {title: '2216'},
    {title: 'MP'},
    {title: 'Total Head Abstract Report'},
  ];

  const allNutritionData = {
    Building: [
      {label: 'Total', value: 15, max: 20},
      {label: 'Completed', value: 5, max: 20},
      {label: 'In Progress', value: 4, max: 20},
      {label: 'Pending', value: 6, max: 20},
    ],
    Road: [
      {label: 'Total', value: 12, max: 20},
      {label: 'Completed', value: 4, max: 20},
      {label: 'In Progress', value: 4, max: 20},
      {label: 'Pending', value: 4, max: 20},
    ],
    NABARD: [
      {label: 'Total', value: 10, max: 20},
      {label: 'Completed', value: 3, max: 20},
      {label: 'In Progress', value: 4, max: 20},
      {label: 'Pending', value: 3, max: 20},
    ],
    All: [
      {label: 'Total', value: 37, max: 40},
      {label: 'Completed', value: 12, max: 40},
      {label: 'In Progress', value: 12, max: 40},
      {label: 'Pending', value: 13, max: 40},
    ],
  };

  const nutritionData = allNutritionData[selectedNutritionCategory] || [];

  const reportData = [
    {category: 'Building', project: 'School Building', status: 'Completed'},
    {category: 'Road', project: 'Main Road Repair', status: 'In Progress'},
    {category: 'NABARD', project: 'Irrigation Project', status: 'Pending'},
    {
      category: 'Building',
      project: 'Hospital Renovation',
      status: 'In Progress',
    },
    {category: 'Road', project: 'Bridge Construction', status: 'Completed'},
    {category: 'NABARD', project: 'Well Construction', status: 'Completed'},

    {category: 'Building', project: 'Community Hall', status: 'Pending'},
    {category: 'Building', project: 'Library Extension', status: 'Completed'},
    {
      category: 'Building',
      project: 'Fire Station Upgrade',
      status: 'In Progress',
    },
    {
      category: 'Building',
      project: 'Government Office Repair',
      status: 'Pending',
    },
    {
      category: 'Building',
      project: 'Old Age Home Construction',
      status: 'Completed',
    },
    {
      category: 'Building',
      project: 'Public Toilet Facility',
      status: 'In Progress',
    },
    {
      category: 'Building',
      project: 'Anganwadi Center Renovation',
      status: 'Pending',
    },
    {category: 'Road', project: 'Village Road Extension', status: 'Pending'},
    {category: 'Road', project: 'Drainage Work', status: 'Completed'},
    {category: 'Road', project: 'Footpath Construction', status: 'In Progress'},
    {category: 'Road', project: 'NH Bypass Work', status: 'Completed'},
    {
      category: 'Road',
      project: 'Bus Stop Shed Construction',
      status: 'Pending',
    },
    {
      category: 'Road',
      project: 'Street Light Installation',
      status: 'In Progress',
    },
    {category: 'Road', project: 'Road Signage Update', status: 'Completed'},

    {category: 'NABARD', project: 'Canal Maintenance', status: 'Pending'},
    {
      category: 'NABARD',
      project: 'Water Tank Installation',
      status: 'In Progress',
    },
    {
      category: 'NABARD',
      project: 'Agriculture Subsidy Scheme',
      status: 'Completed',
    },
    {
      category: 'NABARD',
      project: 'Rainwater Harvesting System',
      status: 'Pending',
    },
    {
      category: 'NABARD',
      project: 'Drip Irrigation Pilot',
      status: 'In Progress',
    },
    {
      category: 'NABARD',
      project: 'Pond Deepening Project',
      status: 'Completed',
    },
    {
      category: 'NABARD',
      project: 'Check Dam Construction',
      status: 'In Progress',
    },
  ];

  const filteredReports =
    selectedCategory === 'All'
      ? reportData
      : reportData.filter(item => item.category === selectedCategory);

  const handleHeadWiseSelection = async title => {
    if (expandedHead === title) {
      setExpandedHead(null);
      setHeadWiseDataResult([]);
      return;
    }
    setExpandedHead(title);
    setSelectedHeadWiseData([title]);

    let result = null;

    if (title === '2515') {
    }
    if (result?.data) {
      setHeadWiseDataResult(result.data);
    } else {
      setHeadWiseDataResult([]);
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('USER_ID');
        const storedRole = await AsyncStorage.getItem('userRole');
        const storedLocation = await AsyncStorage.getItem('LOCATION_ID');
        const storedUserName = await AsyncStorage.getItem('USER_NAME');
        if (storedUserId) setUserId(storedUserId);
        if (storedRole) setRole(storedRole);
        if (storedUserName) setUserName(storedUserName);
        if (storedLocation) setLocation(storedLocation);
      } catch (error) {
        console.error('❌ Error fetching user details:', error);
      }
    };
    fetchGraphData();
    fetchUserDetails();
    // HomeAllimage();
    RollWiseImg();
  }, []);

  const fetchGraphData = async () => {
    try {
      const data = await contractorCountApi({
        office: location,
        position: role,
        name: userName,
      });

      if (data?.success === true || data?.success === 'true') {
        if (Array.isArray(data.data)) {
          const barDataTransformed = transformGraphData(data.data);
          setBarData(barDataTransformed);
        } else {
          setBarData([]);
        }
      } else {
        setBarData([]);
        console.warn('API did not return success:', data?.success);
      }
    } catch (error) {
      console.error('Error fetching graph data:', error);
      setBarData([]);
    }
  };

  const RollWiseImg = async () => {
    if (!location) {
      console.warn('RollWiseImg called with null location — skipping');
      return;
    }
    setLoadingImages(true);
    try {
      const response = await RollwiseImageApi({
        office: location,
        name: userName,
      });
      if (response?.success && Array.isArray(response.data)) {
        if (response.data[0]?.imageBase64) {
        }
        setImageData(response.data);
      } else {
        console.warn('API did not return valid data');
        setImageData([]);
      }
    } catch (error) {
      console.error('Error in RollwiseImageApi:', error);
      setImageData([]);
    } finally {
      setLoadingImages(false);
    }
  };

  const HomeAllimage = async () => {
    try {
      const response = await HomeAllimageapi({
        office: location,
      });
      if (response?.success && Array.isArray(response.data)) {
        if (response.data[0]?.imageBase64) {
        }
        setImageData(response.data);
      } else {
        setImageData([]);
      }
    } catch (error) {
      console.error('Error fetching EEUpdPanelBuilding status data:', error);
      setImageData([]);
    }
  };

  const transformGraphData = rawData => {
    if (!Array.isArray(rawData) || rawData.length === 0) return [];

    const firstItem = rawData[0];
    const barDataArray = [];

    let index = 0;
    for (const [key, value] of Object.entries(firstItem)) {
      barDataArray.push({
        label: key,
        value: value === null || value === undefined ? 0 : Number(value),
        frontColor: barColors[index % barColors.length],
      });
      index++;
    }
    return barDataArray;
  };

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
            (item.Image ? `data:image/jpeg;base64,${item.Image}` : null),
        }}
        style={styles.image}
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.container}>
        <HeaderComponent />

        <ProfileComponent
          profileImage={require('../assets/images/profile.png')}
          userName={userId}
          onProfilePress={() => navigation.navigate('ProfileScreen')}
          onNotificationPress={() => navigation.navigate('NotificationScreen')}
        />

        <View style={styles.scrollContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View
              style={[
                styles.chartContainer,
                {borderWidth: 1, borderColor: 'red'},
              ]}>
              <Text style={styles.headGraphTxt}>
                Smart Budget Head Wise Count
              </Text>
              <BarChart
                barWidth={25}
                spacing={30}
                noOfSections={5}
                barBorderRadius={6}
                data={barData}
                isAnimated
                animationDuration={1200}
                showGradient
                yAxisTextStyle={{color: 'black'}}
                xAxisLabelTextStyle={{
                  color: 'black',
                  fontSize: 10,
                  width: 60,
                  textAlign: 'center',
                }}
                yAxisThickness={0}
                xAxisThickness={0}
              />
            </View>

            {/* <View style={styles.buttonRow}>
              {['Building', 'Road', 'NABARD', 'All'].map(category => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.filterButton,
                    selectedCategory === category &&
                      styles.selectedFilterButton,
                  ]}
                  onPress={() => setSelectedCategory(category)}>
                  <Text
                    style={[
                      styles.filterButtonText,
                      selectedCategory === category &&
                        styles.selectedFilterButtonText,
                    ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View> */}

            {/* <View style={styles.tableContainer}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Project</Text>
                <Text style={styles.tableHeaderText}>Status</Text>
              </View>
              {filteredReports.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.project}</Text>
                  <Text style={styles.tableCell}>{item.status}</Text>
                </View>
              ))}
            </View> */}

            {/* <View style={styles.buttonRow}>
              {['Building', 'Road', 'NABARD', 'All'].map(category => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.filterButton,
                    selectedNutritionCategory === category &&
                      styles.selectedFilterButton,
                  ]}
                  onPress={() => setSelectedNutritionCategory(category)}>
                  <Text
                    style={[
                      styles.filterButtonText,
                      selectedNutritionCategory === category &&
                        styles.selectedFilterButtonText,
                    ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View> */}

            {/* <View style={styles.nutritionContainer}>
              {nutritionData.map((item, index) => (
                <View key={index} style={styles.nutritionRow}>
                  <Text style={styles.nutritionLabel} numberOfLines={1}>
                    {item.label}
                  </Text>
                  <View style={styles.progressBarBackground}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {width: `${(item.value / item.max) * 100}%`},
                      ]}
                    />
                  </View>
                  <Text style={styles.nutritionValue}>{item.value}</Text>
                </View>
              ))}
            </View> */}

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
                      style={styles.HtableContainer}>
                      <View>
                        <View style={styles.HtableHeader}>
                          <Text
                            style={[
                              styles.HtableCell,
                              {width: COLUMN_WIDTHS.status},
                            ]}>
                            Work Status
                          </Text>
                          <Text
                            style={[
                              styles.HtableCell,
                              {width: COLUMN_WIDTHS.totalWork},
                            ]}>
                            Total Work
                          </Text>
                          <Text
                            style={[
                              styles.HtableCell,
                              {width: COLUMN_WIDTHS.estimate},
                            ]}>
                            Estimated Cost
                          </Text>
                          <Text
                            style={[
                              styles.HtableCell,
                              {width: COLUMN_WIDTHS.tsCost},
                            ]}>
                            T.S Cost
                          </Text>
                          <Text
                            style={[
                              styles.HtableCell,
                              {width: COLUMN_WIDTHS.budget},
                            ]}>
                            Budget Provision
                          </Text>
                          <Text
                            style={[
                              styles.HtableCell,
                              {width: COLUMN_WIDTHS.expenditure},
                            ]}>
                            Expenditure
                          </Text>
                        </View>

                        {headWiseDataResult?.map((row, rowIndex) => (
                          <View key={rowIndex} style={styles.HtableRow}>
                            <Text
                              style={[
                                styles.HtableCell,
                                {width: COLUMN_WIDTHS.status},
                              ]}>
                              {row['Work Status']}
                            </Text>
                            <Text
                              style={[
                                styles.HtableCell,
                                {width: COLUMN_WIDTHS.totalWork},
                              ]}>
                              {row['Total Work']}
                            </Text>
                            <Text
                              style={[
                                styles.HtableCell,
                                {width: COLUMN_WIDTHS.estimate},
                              ]}>
                              {row['Estimated Cost']}
                            </Text>
                            <Text
                              style={[
                                styles.HtableCell,
                                {width: COLUMN_WIDTHS.tsCost},
                              ]}>
                              {row['T.S Cost']}
                            </Text>
                            <Text
                              style={[
                                styles.HtableCell,
                                {width: COLUMN_WIDTHS.budget},
                              ]}>
                              {row['Budget Provision 2023-2024']}
                            </Text>
                            <Text
                              style={[
                                styles.HtableCell,
                                {width: COLUMN_WIDTHS.expenditure},
                              ]}>
                              {row['Expenditure 2023-2024']}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </ScrollView>
                  )}
                </View>
              ))}
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.heading}>Image Grid</Text>
              <FlatList
                data={imageData}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                contentContainerStyle={styles.imageGridContent}
              />
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
          onPressIn={() => {
            console.warn('Checking the button press');
          }}
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
      </View>
    </SafeAreaView>
  );
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
    backgroundColor: 'white',
    marginVertical: 10,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  headGraphTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: '#444',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  selectedFilterButton: {
    backgroundColor: '#87CEFA',
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  selectedFilterButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  tableContainer: {
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#d0e8d0',
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
  nutritionContainer: {
    backgroundColor: '#d18282',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    width: '100%',
  },
  nutritionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  nutritionLabel: {
    width: 60,
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  progressBarBackground: {
    flex: 1,
    height: 18,
    backgroundColor: '#ccc',
    borderRadius: 10,
    marginHorizontal: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#aaa',
    borderRadius: 10,
  },
  nutritionValue: {
    width: 35,
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  headWiseContainer: {
    width: screenWidth - 30,
    margin: 16,
    borderWidth: 2,
    borderColor: '#800000',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    overflow: 'hidden',
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
    backgroundColor: '#aabbee',
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
  HtableContainer: {
    marginLeft: 40,
    marginTop: 10,
    marginBottom: 20,
  },
  HtableHeader: {
    flexDirection: 'row',
    backgroundColor: '#d0e8d0',
    paddingVertical: 8,
    borderRadius: 4,
  },
  HtableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    paddingVertical: 10,
  },
  HtableCell: {
    fontSize: 12,
    color: '#000',
    paddingHorizontal: 4,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
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

export default JuniorEngineerScreen;
