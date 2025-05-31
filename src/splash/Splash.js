import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform, Text } from 'react-native';
import LottieView from 'lottie-react-native';
// import asyncStorage from '../generic/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get('window');
const Splash = ({ navigation }) => {
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {        
        const token = await AsyncStorage.getItem('accessToken');
        const targetScreen = token ? 'DashBoard' : 'Login';
    
        
        setTimeout(() => {
          navigation.replace(targetScreen);
          // if (token) {
          //   console.log('Navigating to DashBoard');
          //   navigation.replace(targetScreen);
          // } else {
          //   console.log('Navigating to Login');
          //   navigation.replace('Login');
          // }
        }, 3000);
      } catch (error) {
        console.log('Error fetching token:', error);
        navigation.replace('PucForm');
        // navigation.replace('HomeScreen');

      }
    };
  
    checkLoginStatus();
  }, []);
  

    return (
        <View style={styles.container}>
        <Text style={styles.text}>ParkwithQR</Text>
            <LottieView
                source={require('../assets/images/Animation - 1742404030523.json')} // Replace with your correct Lottie JSON path
                autoPlay
                loop
                style={styles.lottie}
            />
            {/* <Text style={styles.text}>ParkwithQR</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    lottie: {
        width: width * 1,  // Increase width to full screen width
        height: height * 0.7, // Increase height to 70% of screen height
    },
    text: {
        fontSize: 22,
        fontWeight: '700',
        color: '#5F259F',
        // padding: 5
    },
});

export default Splash;
