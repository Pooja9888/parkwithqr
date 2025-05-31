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
  Alert,
  ActivityIndicator
} from 'react-native';
import images from '../const/images';
import Toast from 'react-native-toast-message';
import authService from '../services/authService';
import asyncStorage from '../generic/storage';
import { genericEnum, statusCode } from '../generic/genericEnum';
const { width, height } = Dimensions.get('window');

const Login = ({ navigation }) => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const showToast = (message, type) => {
    Toast.show({
      type,
      position: 'bottom',
      text1: message,
    });
  };

  const handleLogin = async () => {
    setIsLoading(true);

    if (!phoneNumber) {
      showToast('Phone number is required', 'error');
      setIsLoading(false);
      return;
    }

    if (!password) {
      showToast('Password is required', 'error');
      setIsLoading(false);
      return;
    }

    try {
      const response = await authService.login(phoneNumber, password);      
      setIsLoading(false);
      if (response.status === statusCode.success) {
        const { accessToken, uuid, name, phone_no, vehical_no, is_subscribed, device_type } = response.data;        
        await asyncStorage.setItem('accessToken', accessToken);
        await asyncStorage.setItem('uuid', uuid);
        await asyncStorage.setItem('name', name);
        await asyncStorage.setItem('phone_no', phone_no);
        await asyncStorage.setItem('vehical_no', vehical_no);
        await asyncStorage.setItem('is_subscribed', JSON.stringify(is_subscribed)); // Saves "true" or "false"
        await asyncStorage.setItem('device_type', device_type);
        navigation.navigate(genericEnum.dashboard);
      } else {
        showToast(response.message || 'Login failed', 'error');
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
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#5F259F"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#5F259F"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupText}> Sign Up</Text>
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
    top: '12%'
  },
  innerContainer: {
    width: '85%',
    padding: 20,
    // backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backgroundColor: '#fff',
    borderRadius: 10,
    top: '18%'
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
    top: '12%'
  }
});

export default Login;


