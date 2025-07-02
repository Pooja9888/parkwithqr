import { StyleSheet, Text, View, ImageBackground, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
// import colors from '../const/colors';
// import images from '../const/images';

const { width, height } = Dimensions.get('window');
const TermsConditions = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate('DetailSecond');
  };

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={images.backgroundImage}
        style={styles.imageBackground}
        resizeMode="cover"
      > */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.titleText}>Terms & Conditions</Text>
        <Text style={styles.headingText}>WELCOME TO PARK WITH QR</Text>
        <Text style={styles.paragText}>By downloading or using this app, you agree to be bound by the following terms and conditions. Please read them carefully before using our services.
        </Text>
        <Text style={styles.bodyText}>1.General</Text>
        <Text style={styles.paraText}>This mobile application is operated by [Company Name]. By accessing or using the app, you agree to comply with these Terms and all applicable laws and regulations.</Text>
        <Text style={styles.bodyText}>2. Subscription & Usage</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 4 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}> Users who purchase a subscription are entitled to additional features, such as receiving in-app calls via their QR code.</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 4 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}> Non-subscribed users may only make outgoing in-app calls using prepaid top-ups.</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 4 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}> All users must install the app to use its features.</Text>
        </View>


        <Text style={styles.bodyText}>3. Payments</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 4 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}> All payments for subscriptions or top-ups are handled securely through our payment gateway partners.</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 4 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}> Prices may be subject to change and will be communicated in advance.</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 4 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}> No refunds are provided once a payment is processed, unless required by law.</Text>
        </View>

        <Text style={styles.bodyText}>4. QR Code Use</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 4 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}> Each subscribed user receives a unique QR code.</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 4 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}> Sharing your QR code is at your own discretion. We are not responsible for any misuse of your QR.
          </Text>
        </View>


        <Text style={styles.bodyText}>5. Privacy</Text>
        <Text style={styles.paraText}>Your privacy is important to us. Please read our Privacy Policy to understand how we handle your data.</Text>

        <Text style={styles.bodyText}>6. Changes</Text>
        <Text style={styles.paraText}>We reserve the right to update these Terms at any time. Changes will be notified within the app or website.</Text>


        <Text style={styles.bodyText}>7. Contact</Text>
        <Text style={styles.paraText}> For any queries, please contact us at: [support@yourdomain.com]</Text>
        <Text style={styles.bodyText}>8. Call Duration & Messaging</Text>





        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 4 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}> All in-app calls are limited to a maximum duration of 45 seconds.</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 4 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}> This time limit applies to both subscribed and top-up-based users.</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 4 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}>- Users can send SMS messages through the app only by selecting from predefined message templates.</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={[styles.paraText, { right: 4 }]}>{'\u2B24'}</Text>
          <Text style={styles.paraText}> Custom or manually typed messages are not supported.</Text>
        </View>

      </ScrollView>
      {/* <View style={styles.footer}>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={handlePress}  // Make sure handlePress is properly bound
        >
          <Text style={styles.buttonText}>Reject</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.agreeButton} onPress={handlePress}>
          <Text style={styles.buttonText}>Agree</Text>
        </TouchableOpacity>
      </View> */}
      {/* </ImageBackground> */}
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
    ...Platform.select({
      ios: {
        paddingTop: 50, // Adjust for iOS status bar
      },
      android: {
        paddingTop: 0, // No additional padding for Android
      },
    }),
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    ...Platform.select({
      ios: {
        marginBottom: 50, 
      },
      android: {
        marginBottom: 30, 
      },
    }),
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5F259F',
    textAlign: 'center',
    // paddingVertical: 15,
    // top: 10,
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
    ...Platform.select({
      ios: {
        textAlign: 'justify', // Justify text for iOS
      },
      android: {
        textAlign: 'justify', // Ensure the same text alignment on Android
      },
    }),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    // You can apply a different footer background if needed using Platform.select
  },
  // rejectButton: {
  //   backgroundColor: 'grey',
  //   paddingVertical: 12,
  //   borderRadius: 25,
  //   width: '40%',
  //   alignSelf: 'center',
  //   marginTop: 20,
  //   ...Platform.select({
  //     ios: {
  //       shadowColor: '#000',
  //       shadowOffset: { width: 0, height: 2 },
  //       shadowOpacity: 0.8,
  //       shadowRadius: 2,
  //     },
  //     android: {
  //       elevation: 5, // Elevation for Android
  //     },
  //   }),
  // },
  // agreeButton: {
  //   backgroundColor: '#5F259F',
  //   paddingVertical: 12,
  //   borderRadius: 25,
  //   width: '40%',
  //   alignSelf: 'center',
  //   marginTop: 20,
  //   ...Platform.select({
  //     ios: {
  //       shadowColor: '#000',
  //       shadowOffset: { width: 0, height: 2 },
  //       shadowOpacity: 0.8,
  //       shadowRadius: 2,
  //     },
  //     android: {
  //       elevation: 5, // Elevation for Android
  //     },
  //   }),
  // },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TermsConditions;