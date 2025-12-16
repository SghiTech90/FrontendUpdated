import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CircleNotificationBtnHalfMonthApi,
  CircleNotificationBtnMonthApi,
  CircleNotificationBtnTodayApi,
  CircleNotificationBtnWeekApi,
  CircleNotificationHalfMonthApi,
  CircleNotificationMonthApi,
  CircleNotificationTodayApi,
  CircleNotificationWeekApi,
  notificationApi,
} from '../Api/NotificationApi';

const NotificationScreen = ({navigation, route}) => {
  const [notifications, setNotifications] = useState([]);
  const [location, setLocation] = useState(null);
  const [role, setRole] = useState(null);
  const [todayNotification, setTodayNotification] = useState([]);
  const [weekNotification, setWeekNotification] = useState([]);
  const [halfMonthNotification, setHalfMonthNotification] = useState([]);
  const [monthNotification, setMonthNotification] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('today');
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedRole = await AsyncStorage.getItem('userRole');
        if (storedRole) {
          setRole(storedRole);
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
    if (role === 'Supreintending Engiener') {
      fetchCircleNotificationToday();
      fetchCircleNotificationBtnToday();
      fetchCircleNotificationWeek();
      fetchCircleNotificationHalfMonth();
      fetchCircleNotificationMonth();
    } else if (
      [
        'Executive Engineer',
        'Contractor',
        'Sectional Engineer',
        'Deputy Engineer',
      ].includes(role)
    ) {
      if (location) {
        fetchNotifications();
      }
    }
  }, [role, location]);

  const fetchNotifications = async () => {
    try {
      const data = await notificationApi({office: location});
      if (data && data.success === true && Array.isArray(data.data)) {
        setNotifications(data.data);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]);
    }
  };

  const fetchCircleNotificationToday = async () => {
    try {
      const data = await CircleNotificationTodayApi({office: location});
      if (data && data.success === true && Array.isArray(data.data)) {
        setTodayNotification(data.data[0].nCount);
      } else {
        setTodayNotification([]);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setTodayNotification([]);
    }
  };

  const fetchCircleNotificationWeek = async () => {
    try {
      const data = await CircleNotificationWeekApi({office: location});
      if (data && data.success === true && Array.isArray(data.data)) {
        setWeekNotification(data.data[0].nCount);
      } else {
        setWeekNotification([]);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setWeekNotification([]);
    }
  };

  const fetchCircleNotificationHalfMonth = async () => {
    try {
      const data = await CircleNotificationHalfMonthApi({office: location});
      if (data && data.success === true && Array.isArray(data.data)) {
        setHalfMonthNotification(data.data[0].nCount);
      } else {
        setHalfMonthNotification([]);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setHalfMonthNotification([]);
    }
  };

  const fetchCircleNotificationMonth = async () => {
    try {
      const data = await CircleNotificationMonthApi({office: location});
      if (data && data.success === true && Array.isArray(data.data)) {
        setMonthNotification(data.data[0].nCount);
      } else {
        setMonthNotification([]);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setMonthNotification([]);
    }
  };

  const fetchCircleNotificationBtnToday = async () => {
    setFilteredNotifications([]);
    try {
      const data = await CircleNotificationBtnTodayApi({office: location});
      if (data?.success && Array.isArray(data.data)) {
        setFilteredNotifications(data.data);
        setSelectedFilter('today');
      } else {
        setFilteredNotifications([]);
      }
    } catch (error) {
      console.error('Error fetching today notifications:', error);
      setFilteredNotifications([]);
    }
  };

  const fetchCircleNotificationBtnWeek = async () => {
    try {
      const data = await CircleNotificationBtnWeekApi({office: location});
      if (data?.success && Array.isArray(data.data)) {
        setFilteredNotifications(data.data);
        setSelectedFilter('week');
      } else {
        setFilteredNotifications([]);
      }
    } catch (error) {
      console.error('Error fetching week notifications:', error);
      setFilteredNotifications([]);
    }
  };

  const fetchCircleNotificationBtnHalfMonth = async () => {
    try {
      const data = await CircleNotificationBtnHalfMonthApi({office: location});
      if (data?.success && Array.isArray(data.data)) {
        setFilteredNotifications(data.data);

        setSelectedFilter('halfMonth');
      } else {
        setFilteredNotifications([]);
      }
    } catch (error) {
      console.error('Error fetching half-month notifications:', error);
      setFilteredNotifications([]);
    }
  };

  const fetchCircleNotificationBtnMonth = async () => {
    try {
      const data = await CircleNotificationBtnMonthApi({office: location});
      if (data?.success && Array.isArray(data.data)) {
        setFilteredNotifications(data.data);
        setSelectedFilter('month');
      } else {
        setFilteredNotifications([]);
      }
    } catch (error) {
      console.error('Error fetching month notifications:', error);
      setFilteredNotifications([]);
    }
  };

  const renderNotificationItem = ({item}) => (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationTitle}>{item.KamacheName}</Text>
      <Text style={styles.notificationMessage}>
        पूर्ण झाल्याची तारीख : {item.KamPurnDate}
      </Text>
      <Text style={styles.notificationMessage}>
        काम क्रमांक : {item.WorkId}
      </Text>
      <Text style={styles.notificationMessage}>
        कंत्राटदाराचे नाव : {item.ThekedaarName}
      </Text>
      <Text style={styles.notificationMessage}>
        कंत्राटदार मोबाईल : {item.ThekedarMobile}
      </Text>
      <Text style={styles.notificationMessage}>
        उप अभियंता : {item.UpabhyantaName}
      </Text>
      <Text style={styles.notificationMessage}>
        उप अभियंता मोबाईल : {item.UpAbhiyantaMobile}
      </Text>
      <Text style={styles.notificationMessage}>
        शाखा अभियंता : {item.ShakhaAbhyantaName}
      </Text>
      <Text style={styles.notificationMessage}>
        शाखा अभियंता मोबाईल : {item.ShakhaAbhiyantMobile}
      </Text>
    </View>
  );

  const renderCircleNotificationItem = ({item}) => (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationTitle}>{item.kamachename}</Text>

      <Text style={styles.notificationMessage}>
        पूर्ण झाल्याची तारीख : {item.completionDate}
      </Text>

      <Text style={styles.notificationMessage}>
        काम क्रमांक : {item.workId}
      </Text>

      <Text style={styles.notificationMessage}>
        कंत्राटदाराचे नाव : {item.contractor}
      </Text>

      <Text style={styles.notificationMessage}>
        कंत्राटदार मोबाईल : {item.mobiles?.[0]}
      </Text>

      <Text style={styles.notificationMessage}>
        उप अभियंता : {item.upabhyanta}
      </Text>

      <Text style={styles.notificationMessage}>
        उप विभाग : {item.subdivision}
      </Text>

      <Text style={styles.notificationMessage}>
        शाखा अभियंता : {item.shakhaAbhyanta}
      </Text>

      <Text style={styles.notificationMessage}>
        शिल्लक दिवस : {item.remainingDays}
      </Text>

      <Text style={styles.notificationMessage}>
        संदेश : {item.message}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <View style={styles.contentContainer}>
      <View style={styles.contentContainer}>
  {role === 'Supreintending Engiener' ? (
    <>
      <View style={styles.boxContainer}>
        <TouchableOpacity
          style={[styles.box, {backgroundColor: '#91C89C'}]}
          onPress={fetchCircleNotificationBtnToday}>
          <Text style={styles.boxCount}>{todayNotification}</Text>
          <Text style={styles.boxLabel}>Today</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.box, {backgroundColor: '#F1A4A4'}]}
          onPress={fetchCircleNotificationBtnWeek}>
          <Text style={styles.boxCount}>{weekNotification}</Text>
          <Text style={styles.boxLabel}>7 Day's</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.box, {backgroundColor: '#BA5B5B'}]}
          onPress={fetchCircleNotificationBtnHalfMonth}>
          <Text style={styles.boxCount}>{halfMonthNotification}</Text>
          <Text style={styles.boxLabel}>15 Day's</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.box, {backgroundColor: '#B9AAAA'}]}
          onPress={fetchCircleNotificationBtnMonth}>
          <Text style={styles.boxCount}>{monthNotification}</Text>
          <Text style={styles.boxLabel}>30 Day's</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={selectedFilter ? filteredNotifications : []}
        keyExtractor={(item, index) => item.WorkId || index.toString()}
        renderItem={renderCircleNotificationItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 60}}
        ListEmptyComponent={() => (
          <Text style={styles.noDataText}>No notifications available</Text>
        )}
      />
    </>
  ) : (
    <FlatList
      data={notifications}
      keyExtractor={(item, index) => item.WorkId || index.toString()}
      renderItem={renderNotificationItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom: 60}}
    />
  )}
</View>

        {[
          'Executive Engineer',
          'Contractor',
          'Sectional Engineer',
          'Deputy Engineer',
        ].includes(role) && (
          <FlatList
            data={notifications}
            keyExtractor={(item, index) => item.WorkId || index.toString()}
            renderItem={renderNotificationItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 60}}
            ListEmptyComponent={() => (
              <Text style={styles.noDataText}>No notifications available</Text>
            )}
          />
        )}
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
  },
  notificationCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  noDataText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    gap: 10,
  },
  box: {
    flex: 1,
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  boxLabel: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
  },
});

export default NotificationScreen;
