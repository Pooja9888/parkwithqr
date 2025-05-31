import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const Settings = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [emergencyDetails, setEmergencyDetails] = useState('');
  const [age, setAge] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleChangePassword = () => {
    console.log('Change password clicked');
  };

  const handleDeleteAccount = () => {
    console.log('Delete account clicked');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          placeholderTextColor={'#333'}
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          placeholderTextColor={'#333'}
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Phone Number"
          placeholderTextColor={'#333'}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Gender"
          placeholderTextColor={'#333'}
          value={gender}
          onChangeText={setGender}
        />
    
        <TextInput
          style={styles.textInput}
          placeholder="Age"
          placeholderTextColor={'#333'}
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Contact Number"
          placeholderTextColor={'#333'}
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Change Password</Text>
            <Icon name="lock" size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteAccount}>
            <Text style={styles.buttonText}>Delete Account</Text>
            <Icon name="trash" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 30,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#333'
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5F259F',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
});

export default Settings;
