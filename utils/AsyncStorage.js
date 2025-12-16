import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER_ID: 'USER_ID',
  USER_NAME: 'USER_NAME',
  USER_EMAIL: 'USER_EMAIL',
  USER_MOBILE: 'USER_MOBILE',
  USER_ROLE: 'userRole',
  LOCATION_ID: 'LOCATION_ID',
  IS_LOGGED_IN: 'IS_LOGGED_IN',
};

export async function refreshAsyncData() {
  try {
    const userId = await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);
    global.user_id = userId;
  } catch (error) {
    console.error('Error fetching User ID:', error);
  }
}

export async function setAsyncUserId(id) {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_ID, String(id));
  } catch (error) {
    console.error('Error storing User ID:', error);
  }
}

export const setAsyncRoleId = async role => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
  } catch (error) {
    console.error('Error storing role:', error);
  }
};

export async function setAsyncUserLocationId(locationId) {
  try {
    if (!locationId) {
      console.error('Error: locationId is undefined or null');
      return;
    }
    await AsyncStorage.setItem(STORAGE_KEYS.LOCATION_ID, String(locationId));
  } catch (error) {
    console.error('Error storing User Location ID:', error);
  }
}

export const setAsyncUserMobile = async mobile => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_MOBILE, mobile);
  } catch (error) {
    console.error('Error storing user mobile:', error);
  }
};

export const setAsyncUserEmail = async email => {
  try {
    if (email) {
      await AsyncStorage.setItem(STORAGE_KEYS.USER_EMAIL, email);
    } else {
      console.warn('No email provided to store.');
    }
  } catch (error) {
    console.error('Error storing user email:', error);
  }
};

export const setAsyncIsLoggedIn = async status => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.IS_LOGGED_IN, String(status));
  } catch (error) {
    console.error('Error storing login status:', error);
  }
};

export const setAsyncUserName = async userName => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_NAME, userName);
  } catch (error) {
    console.error('Error saving userName:', error);
  }
};

export const getAsyncUserMobile = async () => {
  try {
    const mobile = await AsyncStorage.getItem(STORAGE_KEYS.USER_MOBILE);
    return mobile;
  } catch (error) {
    console.error('Error fetching user mobile:', error);
    return null;
  }
};

export const getAsyncUserEmail = async () => {
  try {
    const email = await AsyncStorage.getItem(STORAGE_KEYS.USER_EMAIL);
    return email;
  } catch (error) {
    console.error('Error fetching user email:', error);
    return null;
  }
};

export const getAsyncIsLoggedIn = async () => {
  try {
    const status = await AsyncStorage.getItem(STORAGE_KEYS.IS_LOGGED_IN);
    return status === 'true';
  } catch (error) {
    console.error('Error fetching login status:', error);
    return false;
  }
};

export const getAsyncUserName = async () => {
  try {
    const name = await AsyncStorage.getItem(STORAGE_KEYS.USER_NAME);
    return name;
  } catch (error) {
    console.error('Error fetching user name:', error);
    return null;
  }
};
