import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = ({navigation}) => {
  const [profileImage] = useState(null);
  const [userInfo, setUserInfo] = useState({
    userId: '',
    userName: '',
    roleId: '',
    office: '',
    mobileNo: '',
    email: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userId = await AsyncStorage.getItem('USER_ID');
        const userName = await AsyncStorage.getItem('USER_NAME');
        const roleId = await AsyncStorage.getItem('ROLE_ID');
        const office = await AsyncStorage.getItem('LOCATION_ID');
        const mobileNo = await AsyncStorage.getItem('USER_MOBILE');
        const email = await AsyncStorage.getItem('USER_EMAIL');

        setUserInfo({
          userId: userId || '',
          userName: userName || '',
          roleId: roleId || '',
          office: office || '',
          mobileNo: mobileNo || '',
          email: email || '',
        });
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="black" />

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={
              profileImage
                ? {uri: profileImage}
                : require('../assets/images/profile.png')
            }
            style={styles.profileImage}
          />
          <View style={styles.cameraIcon}>
            <Icon name="camera-alt" size={18} color="white" />
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.label}>User ID</Text>
          <TextInput
            style={styles.input}
            value={userInfo.userId}
            editable={false}
          />

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={userInfo.userName}
            editable={false}
            onChangeText={text => setUserInfo({...userInfo, userName: text})}
          />

          <Text style={styles.label}>Designation</Text>
          <TextInput
            style={styles.input}
            value= {userInfo.roleId}
            editable={false}
          />

          <Text style={styles.label}>Office</Text>
          <TextInput
            style={styles.input}
            value={userInfo.office}
            editable={false}
          />

          <Text style={styles.label}>Mobile No</Text>
          <TextInput
            style={styles.input}
            value={userInfo.mobileNo}
            onChangeText={text => setUserInfo({...userInfo, mobileNo: text})}
            keyboardType="phone-pad"
            editable={false}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={userInfo.email}
            editable={false}
            onChangeText={text => setUserInfo({...userInfo, email: text})}
            keyboardType="email-address"
          />

          <TouchableOpacity style={styles.updateButton}>
            {/* <Text style={styles.updateButtonText}>Update</Text> */}
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
  profileContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 25,
    right: 130,
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 5,
  },
  scrollContainer: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: 'black',
  },
  updateButton: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
