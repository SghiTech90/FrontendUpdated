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
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import ProfileComponent from '../components/ProfileComponent';
import AIModal from '../components/AIModal';
import LinearGradient from 'react-native-linear-gradient';
import {BarChart} from 'react-native-gifted-charts';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RollwiseImageApi} from '../Api/AllImageApi';
import ImageViewing from 'react-native-image-viewing';

const screenWidth = Dimensions.get('window').width;

const MLAScreen = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState('Demo');
  const [selectedCategory, setSelectedCategory] = useState('Building');
  const [expandedHead, setExpandedHead] = useState(null);
  const [headWiseDataResult, setHeadWiseDataResult] = useState([]);
  const [selectedHeadWiseData, setSelectedHeadWiseData] = useState([]);
  const [role, setRole] = useState(null);
  const [location, setLocation] = useState(null);
  const [userName, setUserName] = useState(null);
  const [imageData, setImageData] = useState([]);
  // const images = imageData.map(img => ({uri: img.image}));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(false);
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
    expenditure: 120,
  };

  const [selectedNutritionCategory, setSelectedNutritionCategory] =
    useState('Building');

  const headWiseData = [
    {title: 'Building'},
    {title: 'CRF'},
    {title: 'Annuity'},
    {title: 'Nabard'},
    {title: 'SH & DOR'},
    {title: 'NonPlan(3054)'},
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

  const barData = [
    {value: 25, label: 'Jan', frontColor: '#FF7F50'},
    {value: 35, label: 'Feb', frontColor: '#7B68EE'},
    {value: 40, label: 'Mar', frontColor: '#3CB371'},
    {value: 50, label: 'Apr', frontColor: '#FFA07A'},
    {value: 60, label: 'May', frontColor: '#20B2AA'},
    {value: 45, label: 'Jun', frontColor: '#FFB347'},
    {value: 70, label: 'Jul', frontColor: '#9370DB'},
    {value: 55, label: 'Aug', frontColor: '#00CED1'},
    {value: 65, label: 'Sep', frontColor: '#DC143C'},
    {value: 58, label: 'Oct', frontColor: '#FF8C00'},
    {value: 73, label: 'Nov', frontColor: '#3CB371'},
    {value: 85, label: 'Dec', frontColor: '#4682B4'},
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

    // Building Projects
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
    console.log('title', title);
    if (expandedHead === title) {
      setExpandedHead(null);
      setHeadWiseDataResult([]);
      return;
    }
    setExpandedHead(title);
    setSelectedHeadWiseData([title]);
    console.log('setSelectedHeadWiseData', title);

    let result = null;

    if (title === '2515') {
      console.log('2515');
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
        if (storedUserId) {
          setUserId(storedUserId);
          console.log('Fetched from storage:', storedUserId);
        }

        const storedRole = await AsyncStorage.getItem('userRole');
        if (storedRole) {
          setRole(storedRole);
          console.log('Fetched role:', storedRole);
        }

        const storedLocation = await AsyncStorage.getItem('LOCATION_ID');
        if (storedLocation) {
          setLocation(storedLocation);
          console.log('Fetched location:', storedLocation);
        }

        const storedUserName = await AsyncStorage.getItem('USER_NAME');
        if (storedUserName) {
          setUserName(storedUserName);
          console.log('Fetched user name:', storedUserName);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  useEffect(() => {
    RollWiseImg();
  }, [userId, role, location, userName]);

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
            {/* Bar Chart Section */}
            <View style={styles.chartContainer}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 10,
                  color: 'black',
                }}>
                MLA Quarterly Performance
              </Text>
              <BarChart
                barWidth={25}
                noOfSections={5}
                barBorderRadius={6}
                data={barData}
                isAnimated
                animationDuration={1200}
                showGradient
                yAxisTextStyle={{color: 'black'}}
                xAxisLabelTextStyle={{color: 'black'}}
                yAxisThickness={0}
                xAxisThickness={0}
              />
            </View>


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
                        console.log('item.title', item.title);
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
    backgroundColor: 'black',
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
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
    width: '99%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#a3d9a5',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  tableCellProject: {
    fontSize: 14,
  },
  tableCellStatus: {
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
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
  plusIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    tintColor: 'green',
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

export default MLAScreen;
