import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HelpScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.infoCard}>
          <Text style={styles.companyName}>
            SGHI-TECH SOFTWARE COMPANY, PUNE
          </Text>

          <Text style={styles.label}>Address:</Text>
          <Text style={styles.text}>
            SGHI-TECH, Swedaganga Society, Pasaydan Building, Warje Pune, 411058
          </Text>

          <Text style={styles.label}>Phone 1:</Text>
          <Text style={styles.text}>(+91) 9096408111</Text>

          <Text style={styles.label}>Phone 2:</Text>
          <Text style={styles.text}>(+91) 9975408111</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>info@sghitech.in</Text>

          <Text style={styles.label}>Website:</Text>
          <Text style={styles.text}>www.sghitech.in</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white',
  },
  infoCard: {
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#0057A0',
    borderRadius: 10,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#0057A0',
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: '#444',
  },
});

export default HelpScreen;
