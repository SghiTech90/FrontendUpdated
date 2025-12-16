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

const PrivacyPolicyScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.contentCard}>
          <Text style={styles.sectionTitle}>Hyperlinking Policies</Text>
          <Text style={styles.paragraph}>
            This portal contains links to external websites managed by
            government and private organizations for user convenience. Once you
            navigate to an external site, its privacy and security policies
            apply. The Maharashtra Right to Public Services Act is not
            responsible for the accuracy, content, or reliability of these
            linked sites and does not necessarily endorse their views. The
            presence of a link on this portal does not imply any official
            endorsement.
          </Text>

          <Text style={styles.sectionTitle}>Privacy Policy</Text>
          <Text style={styles.paragraph}>
            This portal does not collect personal information like name, phone
            number, or email by default. It only logs details such as IP
            address, browser type, operating system, visit date, and visited
            pages for statistical purposes. These logs are not linked to
            individuals unless site security is threatened. User identities and
            browsing activities remain private unless required by law
            enforcement. If personal information is requested, its purpose will
            be explained, and necessary security measures will be taken to
            protect it.
          </Text>

          <Text style={styles.sectionTitle}>Copyright Policy</Text>
          <Text style={styles.paragraph}>
            Material on this portal may be freely reproduced in any format or
            media, provided it is accurate and not used misleadingly or in a
            derogatory manner. When sharing, the source must be clearly
            acknowledged. However, this permission does not apply to third-party
            copyrighted content, for which separate authorization must be
            obtained from the copyright holder.
          </Text>

          <Text style={styles.sectionTitle}>Disclaimer</Text>
          <Text style={styles.paragraph}>
            While the information on this website is provided with care,
            Maharashtra Right to Public Services Act is not responsible for how
            it is used or any resulting consequences. In case of any confusion
            or inconsistency, users should contact the relevant section or
            officer for clarification.
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
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 15,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  contentCard: {
    padding: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
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

export default PrivacyPolicyScreen;
