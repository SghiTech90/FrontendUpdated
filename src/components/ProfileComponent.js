import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProfileComponent = ({
  profileImage,
  userName,
  onProfilePress,
  onNotificationPress,
}) => {
  return (
    <View style={styles.mainContiner}>
      <TouchableOpacity style={styles.profileContiner} onPress={onProfilePress}>
        <View style={styles.imgMainContiner}>
          <Image source={profileImage} style={styles.imgContiner} />
        </View>
        <Text style={styles.profileTxt}>{userName}</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.notificationContiner}
        onPress={onNotificationPress}>
        <Icon name="notifications" size={30} color="black" />
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContiner: {
    height: 60,
    width: '100%',
    top: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  profileContiner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgMainContiner: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: 'yellow',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  imgContiner: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  profileTxt: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
    left: 10,
  },
  notificationContiner: {
    backgroundColor: 'white',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default ProfileComponent;
