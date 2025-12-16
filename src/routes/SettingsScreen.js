import React ,{useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LogoutModal from '../components/LogoutModal';


const SettingsScreen = ({navigation}) => {
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const handleLogout = async () => {
    setLogoutModalVisible(false);
    await AsyncStorage.clear();
    navigation.replace('DashBoardScreen');
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
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView
        style={styles.contentContainer}
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate('ProfileScreen')}>
          <Icon name="person" size={24} color="black" />
          <Text style={styles.optionText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
            onPress={() => navigation.navigate("HelpScreen")}
        >
          <Icon name="help-outline" size={24} color="black" />
          <Text style={styles.optionText}>Help</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
          onPress={() => navigation.navigate("PrivacyPolicyScreen")}
        >
          <Icon name="privacy-tip" size={24} color="black" />
          <Text style={styles.optionText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.option}
           onPress={() => navigation.navigate("TermsAndConditionsScreen")}
        >
          <Icon name="description" size={24} color="black" />
          <Text style={styles.optionText}>Terms & Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, styles.logoutButton]}
          onPress={() => setLogoutModalVisible(true)}>
          <Icon name="logout" size={24} color="red" />
          <Text style={[styles.optionText, {color: 'red'}]}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <LogoutModal
        visible={logoutModalVisible}
        onConfirm={handleLogout}
        onCancel={() => setLogoutModalVisible(false)}
      />
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
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 15,
  },
  logoutButton: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default SettingsScreen;
