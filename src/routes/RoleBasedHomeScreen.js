import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, ActivityIndicator} from 'react-native';
import ContractorMasterScreen from './ContractorMasterScreen';
import JuniorEngineerScreen from './JuniorEngineerScreen';
import DeputyEngineerScreen from './DeputyEngineerScreen';
import MLAScreen from './MLAScreen';
import MPScreen from './MPScreen';
import HomeScreen from './HomeScreen';
import SupreintendingEngienerScreen from './SupreintendingEngienerScreen';

const RoleBasedHomeScreen = ({navigation}) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const storedRole = await AsyncStorage.getItem('userRole');
        if (storedRole) {
          setRole(storedRole);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserRole();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  switch (role) {
    case 'Executive Engineer':
      return <HomeScreen navigation={navigation} />;
    case 'Contractor':
      return <ContractorMasterScreen navigation={navigation} />;
    case 'Sectional Engineer':
      return <JuniorEngineerScreen navigation={navigation} />;
    case 'Deputy Engineer':
      return <DeputyEngineerScreen navigation={navigation} />;
    case 'MLA':
      return <MLAScreen navigation={navigation} />;
    case 'MP':
      return <MPScreen navigation={navigation} />;
      case 'Supreintending Engiener':
      return <SupreintendingEngienerScreen navigation={navigation} />;
    default:
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
  }
};

export default RoleBasedHomeScreen;
