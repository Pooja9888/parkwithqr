import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import images from '../const/images';
import authService from '../services/authService';
import asyncStorage from '../generic/storage';
import Toast from 'react-native-toast-message';
import { genericEnum, statusCode } from '../generic/genericEnum';
const { width, height } = Dimensions.get('window');

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [vehicalNumber, setVehicleNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading,setIsLoading]=useState(false);

  const maxLength = 12;

  const showToast = (message, type) => {
    Toast.show({
      type,
      position: 'top',
      text1: message,
    });
  };

  const saveRegister = async () => {
    setIsLoading(true);
    try {
      const minPhoneNumberLength = 10;
      const maxPhoneNumberLength = 10;
      const regData = {
        name,
        phoneNumber,
        vehicalNumber,
        password,
      };

      if (!Object.values(regData).every(Boolean)) {
        setIsLoading(false);
        showToast('All fields are mandatory', 'error');
        return;
      }

      if (phoneNumber.length < minPhoneNumberLength || phoneNumber.length > maxPhoneNumberLength) {
        // Alert.alert(
        //     'Validation Error',
        //     `Phone number should be between ${minPhoneNumberLength} and ${maxPhoneNumberLength} characters.`
        // );
        showToast(`Phone number should be between ${minPhoneNumberLength} and ${maxPhoneNumberLength} characters.`, 'error');
        setIsLoading(false);
        return;
      }
      const data = await authService.register(regData);
      if (data.status === statusCode.success) {

        await asyncStorage.setItem("accessToken", data?.data.accessToken);
        await asyncStorage.setItem("refreshToken", data?.data.refreshToken);
        await asyncStorage.setItem("uuid", data?.data.uuid);
        await asyncStorage.setItem("device_type", data?.data.device_type);
        await asyncStorage.setItem("name", data?.data?.name);
        await asyncStorage.setItem('phone_no', data?.data?.phone_no); 
        await asyncStorage.setItem('vehical_no', data?.data?.vehical_no); 
        await asyncStorage.setItem('is_subscribed', data?.data?.is_subscribed); 
        setIsLoading(false);
        // showToast(data.message, 'success')
        navigation.navigate(genericEnum.dashboard);
      } else {
        setIsLoading(false);
        showToast(data.message, 'error')
      }
    } catch (error) {
      setIsLoading(false);
      showToast(genericEnum.error, 'error');
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.containerLoading, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#5F259F" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <Image
        style={styles.logo}
        source={images.logo}
      />
      <Text style={styles.text}>ParkwithQR</Text>
      <View style={styles.innerContainer}>

        <Text style={styles.title}>Register</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          placeholderTextColor="#5F259F"
          keyboardType="email-address"
          value={name}
          onChangeText={setName}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Vehical Number"
          placeholderTextColor="#5F259F"
          keyboardType="email-address"
          value={vehicalNumber}
          onChangeText={setVehicleNumber}
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Vehicle Number"
          placeholderTextColor="#5F259F"
          value={vehicalNumber}
          onChangeText={(text) => setVehicleNumber(text.toUpperCase())}
        />
        {/* <TextInput
          style={styles.input}
          placeholder="Phone No"
          placeholderTextColor="#5F259F"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          maxLength={maxLength}
        /> */}
        <TextInput
          style={styles.input}
          placeholder="Phone No"
          placeholderTextColor="#5F259F"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={(text) => {
            if (text.length <= 10) {
              setPhoneNumber(text);
            }
          }}
          maxLength={10}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#5F259F"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={saveRegister}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.signupText}> Sign In</Text>
          </TouchableOpacity>
        </View>


      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  containerLoading: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#5F259F'
  },
  logo: {
    width: 80,
    height: 80,
    top: '10%'
  },
  innerContainer: {
    width: '85%',
    padding: 20,
    // backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: '#fff',
    borderRadius: 10,
    top: '15%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#eee',
    color: '#333',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#5F259F',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 18,
  },
  footerText: {
    color: '#9d6ed1',
    fontSize: 14,
  },
  signupText: {
    color: '#5F259F',
    fontSize: 14,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    padding: 5,
    top: '11%'
  }
});

export default Signup;
