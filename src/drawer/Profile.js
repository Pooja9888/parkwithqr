import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import serviceWorker from '../services/serviceWorker';
import { webUrl } from '../generic/webUrl';
import asyncStorage from '../generic/storage';
import { genericEnum, statusCode } from '../generic/genericEnum';
import Toast from 'react-native-toast-message';


const Profile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');

  const showToast = (message, type) => {
    Toast.show({
      type,
      position: 'top',
      text1: message,
    });
  };
  useEffect(() => {
    const loadProfile = async () => {
      const storedName = await asyncStorage.getItem('name');
      const storedPhone = await asyncStorage.getItem('phone_no');
      const storedVehicle = await asyncStorage.getItem('vehical_no');

      setName(storedName || 'No Name');
      setPhoneNumber(storedPhone || 'No Phone Number');
      setVehicleNumber(storedVehicle || 'No Vehicle Number');
    };

    const unsubscribe = navigation.addListener('focus', loadProfile);
    return unsubscribe;
  }, [navigation]);

  const handleEditProfile = () => {
    navigation.navigate('EditProfileScreen', {
      name,
      phoneNumber,
      vehicleNumber
    });
  };


  const handleDeleteProfile = async () => {
    Alert.alert('Delete Account', 'Are you sure you want to delete your account?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const uuid = await asyncStorage.getItem('uuid');
            const token = await asyncStorage.getItem('accessToken');

            if (!uuid || !token) {
              return;
            }
            const params = { uuid };
            const response = await serviceWorker._requestPostToken(webUrl.deleteAccount, params, token);
            if (response.status === statusCode.success) {       
              showToast(response.message,'success')
              clearStorage()
              navigation.navigate(genericEnum.login);
            } else {
              showToast(response.message || 'Login failed', 'error');
            }

            setName('');
            setPhoneNumber('');
            setVehicleNumber('');
          } catch (error) {
            console.error('Delete Profile Error:', error);
          }
        },
      },
    ]);
};
const clearStorage = async () => {
  try {
    await asyncStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};

  return (
    <LinearGradient colors={['#f2f2f2', '#e6e6e6']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profilePictureContainer}>
          <Image source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }} style={styles.profilePicture} />
        </View>
        <View style={styles.profileDetails}>
          <Text style={styles.name}>{name || 'No Name'}</Text>
          <Text style={styles.phone}>{phoneNumber || 'No Phone Number'}</Text>
          <Text style={styles.phone}>{vehicleNumber || 'No Vehicle Number'}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
            <Icon name="edit" size={20} color="#fff" />
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteProfile}>
            <Icon name="trash" size={20} color="#fff" />
            <Text style={styles.buttonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20
  },
  content: {
    paddingBottom: 40,
    alignItems: 'center'
  },
  profilePictureContainer: {
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#fff',
    borderRadius: 100,
    overflow: 'hidden'
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60
  },
  profileDetails: {
    marginBottom: 30,
    alignItems: 'center'
  },
  name: {
    fontSize: 26,
    color: '#5F259F',
    marginBottom: 5,
    padding: 3,
    fontWeight: '600'
  },
  phone: {
    fontSize: 16,
    color: '#555',
    padding: 3,
    fontWeight: '600'

  },
  buttonContainer: {
    width: '80%',
    marginBottom: 20
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5F259F',
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 10,
    elevation: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600'
  },
  deleteButton: {
    backgroundColor: '#fa4c4c'
  },
});

export default Profile;
