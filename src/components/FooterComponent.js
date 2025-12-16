import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const FooterComponent = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
        © All rights reserved by Public Works Department, Maharashtra
        {'\n'}
        Design by: SWAPSOFT SGHITECH PRIVATE LIMITED
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  footerText: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default FooterComponent;
