import { StyleSheet, Text, View, ImageBackground, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window');
const PrivacyPolicy = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.titleText}>Privacy Policy</Text>
        <Text style={styles.headingText}>At  Park With QR, we value your privacy and are committed to protecting your personal information.
       </Text>
   
        <Text style={styles.bodyText}>1. Information Collection</Text>
        <Text style={styles.paraText}>All subscription purchases are final. We do not offer refunds once a payment is processed unless required under applicable law.</Text>
        <Text style={styles.bodyText}>2. Use of Information</Text>
        <Text style={styles.paraText}>The data collected is used to:</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 4 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}> Provide our services (calls, subscriptions, QR system)</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 4 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}> Improve app functionality</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 4 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}> Communicate updates and offers</Text>
        </View>

        <Text style={styles.bodyText}>3. Data Sharing</Text>
        <Text style={styles.paraText}>We do not sell or rent your personal data to third parties. Data may be shared with service providers (e.g., payment gateways) only for service delivery.</Text>

        <Text style={styles.bodyText}>4. Security</Text>
        <Text style={styles.paraText}>We implement standard industry security practices to protect your data.</Text>

        <Text style={styles.bodyText}>5. User Rights</Text>
        <Text style={styles.paraText}>You have the right to access or delete your information by contacting us at [support@yourdomain.com].</Text>

        <Text style={styles.bodyText}>6. Changes</Text>
        <Text style={styles.paraText}>We may update this policy from time to time. Changes will be reflected in the app.</Text>
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5F259F',
    textAlign: 'center',
  },
  headingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5F259F',
    textAlign: 'center',
    paddingVertical: 6,
  },
  bodyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5F259F',
    marginBottom: 10,
    // top: 5,
  },
  paragText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#5F259F',
    marginBottom: 5,
    textAlign: 'justify',
    fontWeight: '600'
  },
  paraText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#5F259F',
    marginBottom: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
  },
 
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});


export default PrivacyPolicy;

