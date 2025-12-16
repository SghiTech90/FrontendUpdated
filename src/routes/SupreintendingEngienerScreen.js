import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderComponent from '../components/HeaderComponent';
import ProfileComponent from '../components/ProfileComponent';
import AIModal from '../components/AIModal';
import LinearGradient from 'react-native-linear-gradient';
import CircularRotatingItems from '../components/CircularRotatingItems';
import {
  CirclePieChartCountApi,
  CircleWiseBarChartApi,
} from '../Api/CircleHomeScrApi';
import BarChartComponent from '../components/BarChartComponent';
import PieChartComponent from '../components/PieChartComponent';

const SupreintendingEngienerScreen = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [location, setLocation] = useState(null);
  const [role, setRole] = useState(null);
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('USER_ID');
        if (storedUserId) setUserId(storedUserId);

        const storedRole = await AsyncStorage.getItem('userRole');
        if (storedRole) setRole(storedRole);

        const storedUserName = await AsyncStorage.getItem('USER_NAME');
        if (storedUserName) setUserName(storedUserName);

        const storedLocation = await AsyncStorage.getItem('LOCATION_ID');
        if (storedLocation) setLocation(storedLocation);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);

  const handleCircleFocusChange = async office => {
    setSelectedLocationId(office);
    try {
      const barData = await CircleWiseBarChartApi({office});
      if (barData?.success && Array.isArray(barData.data)) {
        const chartDataObject = barData.data?.[0] || {};
        const fixedLabels = ['Building', 'CRF', 'Annuity', 'Nabard', 'Road'];
        const allEntries = Object.entries(chartDataObject).map(
          ([label, value]) => ({
            label,
            value: Number(value),
          }),
        );
        const fixedData = fixedLabels.map(label => {
          const found = allEntries.find(item => item.label === label);
          return found || {label, value: 0};
        });
        const remainingData = allEntries.filter(
          item => !fixedLabels.includes(item.label),
        );
        const formatLabel = label =>
          label.length > 10 ? label.slice(0, 10) + '…' : label;
        const transformed = [...fixedData, ...remainingData].map(
          ({label, value}) => ({
            label: formatLabel(label),
            value,
          }),
        );
        setBarChartData(transformed);
      } else {
        setBarChartData([]);
      }

      const pieData = await CirclePieChartCountApi({office});
      if (pieData?.success && Array.isArray(pieData.data)) {
        const chartDataObject = pieData.data || [];

        const filteredData = chartDataObject
          .filter(item => Number(item.Count) > 0)
          .map(item => ({
            label: item.Head,
            value: Number(item.Count),
          }));

        const formatLabel = label =>
          label.length > 10 ? label.slice(0, 10) + '…' : label;

        const transformed = filteredData.map(({label, value}) => ({
          label: formatLabel(label),
          value,
        }));

        setPieChartData(transformed);
      } else {
        setPieChartData([]);
      }
    } catch (error) {
      console.error('Error in focus change:', error);
      setBarChartData([]);
      setPieChartData([]);
    }
  };

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

        <ScrollView
          contentContainerStyle={styles.scrollViewContent}>
          <CircularRotatingItems onFocusChange={handleCircleFocusChange} />

          {barChartData?.length > 0 && (
            <BarChartComponent data={barChartData} />
          )}

          {pieChartData?.length > 0 && (
            <PieChartComponent
              data={pieChartData}
              selectedLocationId={selectedLocationId}
            />
          )}
        </ScrollView>

        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.aiButtonContainer}>
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
  scrollViewContent: {
    padding: 20,
    paddingBottom: 100,
    paddingTop: 0,
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
});

export default SupreintendingEngienerScreen;
