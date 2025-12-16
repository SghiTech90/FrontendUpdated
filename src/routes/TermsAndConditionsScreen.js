import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TermsAndConditionsScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={styles.contentCard}>
          <Text style={styles.sectionTitle}>1. Ownership</Text>
          <Text style={styles.paragraph}>
            This website is owned by the Maharashtra Right to Public Services Act, India.
          </Text>

          <Text style={styles.sectionTitle}>2. Content Responsibility</Text>
          <Text style={styles.paragraph}>
            All content is provided by the Maharashtra Right to Public Services Act.
          </Text>

          <Text style={styles.sectionTitle}>3. Acceptance of Terms</Text>
          <Text style={styles.paragraph}>
            By accessing this website, you agree to be legally bound by these terms and conditions. 
            If you do not agree, please do not access the website.
          </Text>

          <Text style={styles.sectionTitle}>4. Content Accuracy</Text>
          <Text style={styles.paragraph}>
            Efforts are made to ensure the accuracy and currency of content. However, it should not 
            be considered a legal statement or used for legal purposes.
          </Text>

          <Text style={styles.sectionTitle}>5. Verification & Advice</Text>
          <Text style={styles.paragraph}>
            In case of any doubts, users should verify the information with relevant departments 
            and/or seek professional advice.
          </Text>

          <Text style={styles.sectionTitle}>6. Limitation of Liability</Text>
          <Text style={styles.paragraph}>
            Maharashtra Right to Public Services Act will not be liable for any loss, damage, or 
            expense (including indirect or consequential) arising from use or loss of use of data from this website.
          </Text>

          <Text style={styles.sectionTitle}>7. Jurisdiction</Text>
          <Text style={styles.paragraph}>
            These terms are governed by Indian laws. Any dispute will be under the jurisdiction of Indian courts.
          </Text>
        </View>
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
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 15,
  },
  contentCard: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0057A0',
    marginBottom: 10,
    marginTop: 20,
  },
  paragraph: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
});

export default TermsAndConditionsScreen;
