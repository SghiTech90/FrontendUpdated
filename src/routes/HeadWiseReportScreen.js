import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HeadWiseReportScreen = ({navigation, route}) => {
  const {selectedHead} = route.params;
  const [selectedSection, setSelectedSection] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Head Wise Report</Text>
      </View>

      <ScrollView style={styles.contentContainer}>
        {selectedSection ? (
          <>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
              {selectedSection.title}
            </Text>

            <ScrollView horizontal>
              <View>
                <View style={{flexDirection: 'row', backgroundColor: '#eee'}}>
                  {selectedSection.headers.map((header, idx) => (
                    <Text key={idx} style={{padding: 5, minWidth: 100}}>
                      {header}
                    </Text>
                  ))}
                </View>

                {selectedSection.data.map((row, rowIndex) => (
                  <View key={rowIndex} style={{flexDirection: 'row'}}>
                    {selectedSection.headers.map((header, colIndex) => (
                      <Text key={colIndex} style={{padding: 5, minWidth: 100}}>
                        {row[header] || '-'}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </>
        ) : (
          <Text>डेटा सापडला नाही {selectedHead}</Text>
        )}
      </ScrollView>
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
});

export default HeadWiseReportScreen;
