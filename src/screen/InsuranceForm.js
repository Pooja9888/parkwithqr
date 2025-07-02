import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { requestCameraPermission } from '../utils/cameraPermission';
import documentService from '../services/documentService';
import { genericEnum } from '../generic/genericEnum';
import DateTimePicker from '@react-native-community/datetimepicker';

const InsuranceForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [validity, setValidity] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [photoUri, setPhotoUri] = useState(null);

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Camera access is required to take photos.');
      return;
    }
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
        cameraType: 'back',
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
        } else {
          // response.assets is an array, take first asset's uri
          const uri = response.assets && response.assets[0].uri;
          setPhotoUri(uri);
        }
      }
    );
  };
  // handleButton = async () => {
  //   const param = {
  //     'name': name,
  //     'number': number,
  //     'vaild_till': validity,
  //     'front': photoUri,
  //     'type': 'insurance'
  //   }
  //   try {
  //     const response = await documentService.createDocument(param);
  //     if (response && response.status === 200) {
  //       const createdDoc = response.data;
  //       navigation.navigate('PreviewInsurance', { doc: createdDoc });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const handleNext = () => {
    if (!name || !number || !validity || !photoUri) {
      Alert.alert("All fields are required.");
      return;
    }
  
    const previewDoc = {
      name,
      number,
      vaild_till: validity,
      front: photoUri,
      status: 0
    };
    navigation.navigate('PreviewInsurance', { doc: previewDoc, fromForm: true });
  };
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const day = selectedDate.getDate().toString().padStart(2, '0');
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = selectedDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
      setValidity(formattedDate);
    }
  };
 

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
          returnKeyType="next"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Insurence No</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Insurence No"
          placeholderTextColor="#999"
          value={number}
          onChangeText={setNumber}
          autoCapitalize="characters"
          returnKeyType="next"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Period Of Insurence</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.input}
            placeholder="Enter validity date"
            placeholderTextColor="#999"
            value={validity}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={validity ? new Date(validity) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Front Photo</Text>
        <TouchableOpacity onPress={openCamera} activeOpacity={0.7}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.photo} />
          ) : (
            <View style={[styles.input, styles.photoPlaceholder]}>
              <Text style={{ color: '#999' }}>Tap to open camera</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity style={styles.btnBox} onPress={handleButton}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.btnBox} onPress={handleNext}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    color: '#5F259F',
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#222',
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  photoPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  btnBox: {
    backgroundColor: '#5F259F',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    top: 25
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',

  }
});

export default InsuranceForm;

