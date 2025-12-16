import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, StyleSheet, Platform, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from './ProfileScreen';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import OtpScreen from './OtpScreen';
import LocationScreen from './LocationScreen';
import NotificationScreen from './NotificationScreen';
import NavigationService from '../services/NavigationService';
import ReportScreen from './ReportScreen';
import StatusScreen from './StatusScreen';
import SettingsScreen from './SettingsScreen';
import DashBoardScreen from './DashBoardScreen';
import ContractorMasterScreen from './ContractorMasterScreen';
import JuniorEngineerScreen from './JuniorEngineerScreen';
import DeputyEngineerScreen from './DeputyEngineerScreen';
import MLAScreen from './MLAScreen';
import MPScreen from './MPScreen';
import RoleBasedHomeScreen from './RoleBasedHomeScreen';
import HeadWiseReportScreen from './HeadWiseReportScreen';
import HelpScreen from './HelpScreen';
import PrivacyPolicyScreen from './PrivacyPolicyScreen';
import TermsAndConditionsScreen from './TermsAndConditionsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CircleTotaNotificationCountApi} from '../Api/NotificationApi';
import CircleDashBoardScreen from './CircleDashBoardScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabBarButton = ({
  onPress,
  focused,
  iconName,
  label,
  badgeCount,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.tabButtonWrapper}>
      <View style={[styles.buttonCircle, focused && styles.focusedButton]}>
        <Ionicons
          name={iconName}
          size={24}
          color={focused ? 'white' : 'black'}
        />
        {label === 'Alert' && badgeCount > 0 && (
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>
              {badgeCount > 99 ? '99+' : badgeCount}
            </Text>
          </View>
        )}
      </View>
      <Text style={[styles.tabBarLabel, focused && {color: 'black'}]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const BottomTabNavigator = () => {
  const [role, setRole] = useState(null);
  const [notificationCount, setNotificationCount] = useState(0);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const storedLocation = await AsyncStorage.getItem('LOCATION_ID');
        const storedRole = await AsyncStorage.getItem('USER_ROLE');
        if (storedLocation) setLocation(storedLocation);
        if (storedRole) setRole(storedRole);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, [location]);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        const response = await CircleTotaNotificationCountApi({
          office: location,
        });
        if (response && response.success === true) {
          setNotificationCount(response.totalCount);
        }
      } catch (error) {
        console.error('Error fetching notification count:', error);
      }
    };
    fetchNotificationCount();
    const interval = setInterval(fetchNotificationCount, 30000);
    return () => clearInterval(interval);
  }, [location, notificationCount]);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          console.log('focused', focused, route.name);
          let iconName;
          if (route.name === 'Home') iconName = 'newspaper-outline';
          else if (route.name === 'Report') iconName = 'bar-chart-outline';
          else if (route.name === 'Dashboard') iconName = 'speedometer-outline';
          else if (route.name === 'Status') iconName = 'stats-chart-outline';
          else if (route.name === 'Alert') iconName = 'notifications-outline';
          else if (route.name === 'Settings') iconName = 'settings-outline';

          return (
            <View style={{width: 30, height: 30}}>
              <Ionicons
                name={iconName}
                size={24}
                color={focused ? 'white' : 'black'}
              />
              {route.name === 'Alert' && notificationCount > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>
                    {notificationCount > 99 ? '99+' : notificationCount}
                  </Text>
                </View>
              )}
            </View>
          );
        },
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        component={RoleBasedHomeScreen}
        options={{
          tabBarButton: ({onPress, accessibilityState}) => (
            <CustomTabBarButton
              onPress={onPress}
              focused={accessibilityState?.selected}
              iconName="newspaper-outline"
              label="Home"
            />
          ),
        }}
      />

      {role === 'Supreintending Engiener' ? (
        <Tab.Screen
          name="Dashboard"
          component={CircleDashBoardScreen}
          options={{
            tabBarButton: ({onPress, accessibilityState}) => (
              <CustomTabBarButton
                onPress={onPress}
                focused={accessibilityState?.selected}
                iconName="speedometer-outline"
                label="Dashboard"
              />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Report"
          component={ReportScreen}
          options={{
            tabBarButton: ({onPress, accessibilityState}) => (
              <CustomTabBarButton
                onPress={onPress}
                focused={accessibilityState?.selected}
                iconName="bar-chart-outline"
                label="Report"
              />
            ),
          }}
        />
      )}

      <Tab.Screen
        name="Status"
        component={StatusScreen}
        options={{
          tabBarButton: ({onPress, accessibilityState}) => (
            <CustomTabBarButton
              onPress={onPress}
              focused={accessibilityState?.selected}
              iconName="stats-chart-outline"
              label="Status"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Alert"
        component={NotificationScreen}
        options={{
          tabBarButton: ({onPress, accessibilityState}) => (
            <CustomTabBarButton
              onPress={onPress}
              focused={accessibilityState?.selected}
              iconName="notifications-outline"
              label="Alert"
              badgeCount={notificationCount}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarButton: ({onPress, accessibilityState}) => (
            <CustomTabBarButton
              onPress={onPress}
              focused={accessibilityState?.selected}
              iconName="settings-outline"
              label="Settings"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const Route = () => {
  return (
    <NavigationContainer
      ref={navigatorRef =>
        NavigationService.setTopLevelNavigator(navigatorRef)
      }>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="LocationScreen" component={LocationScreen} />
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
        <Stack.Screen name="DashBoardScreen" component={DashBoardScreen} />
        <Stack.Screen name="HomeScreen" component={BottomTabNavigator} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="HelpScreen" component={HelpScreen} />
        <Stack.Screen
          name="CircleDashBoardScreen"
          component={CircleDashBoardScreen}
        />
        <Stack.Screen
          name="PrivacyPolicyScreen"
          component={PrivacyPolicyScreen}
        />
        <Stack.Screen
          name="TermsAndConditionsScreen"
          component={TermsAndConditionsScreen}
        />
        <Stack.Screen
          name="ContractorMasterScreen"
          component={ContractorMasterScreen}
        />
        <Stack.Screen
          name="JuniorEngineerScreen"
          component={JuniorEngineerScreen}
        />
        <Stack.Screen
          name="DeputyEngineerScreen"
          component={DeputyEngineerScreen}
        />
        <Stack.Screen name="MLAScreen" component={MLAScreen} />
        <Stack.Screen name="MPScreen" component={MPScreen} />
        <Stack.Screen
          name="HeadWiseReportScreen"
          component={HeadWiseReportScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: 'white',
    height: Platform.OS === 'ios' ? 90 : 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
  },
  customButton: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusedButton: {
    backgroundColor: 'black',
  },
  tabBarLabel: {
    fontSize: 12,
    color: 'black',
    bottom: 10,
    fontWeight: '600',
  },
  badgeContainer: {
    position: 'absolute',
    top: 4,
    right: 7,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tabButtonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
