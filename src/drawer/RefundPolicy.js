import { StyleSheet, Text, View, ImageBackground, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window');
const RefundPolicy = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('DetailSecond');
  };

  return (
    <View style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.titleText}>Refund & Cancellation Policy</Text>
        <Text style={styles.headingText}>Thank you for using park WITH QR</Text>
   
        <Text style={styles.bodyText}>1. Subscription Refunds</Text>
        <Text style={styles.paraText}>All subscription purchases are final. We do not offer refunds once a payment is processed unless required under applicable law.</Text>
        <Text style={styles.bodyText}>2. Top-Up Refunds</Text>
        <Text style={styles.paraText}>Top-up balances are non-refundable. Please verify all details before confirming a transaction.</Text>

        <Text style={styles.bodyText}>3. Failed Transactions</Text>
        <Text style={styles.paraText}>If a payment fails but the amount is debited, please contact your bank or payment provider. If the amount is not credited to your account, contact us within 7 days at [support@yourdomain.com].</Text>

        <Text style={styles.bodyText}>4. Cancellation</Text>
        <Text style={styles.paraText}>You can cancel your subscription anytime. However, cancellation will only stop future billings and does not result in a refund.</Text>
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
    fontWeight: '700',
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

export default RefundPolicy;

