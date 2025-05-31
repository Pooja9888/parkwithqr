import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import profileService from '../services/profileService';
import asyncStorage from '@react-native-async-storage/async-storage';
import { genericEnum, statusCode } from '../generic/genericEnum';

const { width } = Dimensions.get('window');

const EditProfileScreen = ({ route, navigation }) => {
  const { name, phoneNumber, vehicleNumber } = route.params;
const [editedProfile, setEditedProfile] = useState({
  name: name || '',
  phoneNumber: phoneNumber || '',
});
const [vehicalNumber, setVehicleNumber] = useState(vehicleNumber || '');
  const showToast = (message, type = 'error') => {
    Toast.show({ type, position: 'top', text1: message });
  };

  const handleSaveChanges = async () => {
    try {
      const response = await profileService.updateProfile({
        uuid: await asyncStorage.getItem('uuid'),
        name: editedProfile.name,
        phone_no: editedProfile.phoneNumber,
        vehical_no: vehicalNumber,
      });            
      if (response.status === statusCode.success) {
        // showToast(response.message, 'success');
        await asyncStorage.setItem('name', response?.data?.user);
        await asyncStorage.setItem('phone_no', response?.data?.phone_no); 
        await asyncStorage.setItem('vehical_no', response?.data?.vehical_no); 
        navigation.navigate(genericEnum.dashboard);
      } else {
        showToast(response.message || 'Update failed');
      }
    } catch (error) {
      showToast('An error occurred');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#5F259F" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          value={editedProfile.name}
          onChangeText={(text) => setEditedProfile({ ...editedProfile, name: text })}
          placeholder="Enter your name"
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="phone" size={20} color="#5F259F" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          value={editedProfile.phoneNumber}
          keyboardType="phone-pad"
          maxLength={10}
          onChangeText={(text) => setEditedProfile({ ...editedProfile, phoneNumber: text.replace(/[^0-9]/g, '') })}
          placeholder="Enter your phone number"
          placeholderTextColor="#999"
        />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="car" size={20} color="#5F259F" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          value={vehicalNumber}
          onChangeText={(text) => setVehicleNumber(text.toUpperCase())}
          placeholder="Enter your Vehicle Number"
          placeholderTextColor="#999"
        />
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Icon name="save" size={20} color="#fff" />
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5F259F',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    width: width * 0.9,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    height: 50,
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    color: '#5F259F',
  },
  saveButton: {
    backgroundColor: '#5F259F',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: width * 0.9,
    marginTop: 30,
    elevation: 5,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: '600',
  },
});

export default EditProfileScreen;
