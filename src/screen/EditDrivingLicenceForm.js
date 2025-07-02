import React, { useState ,useEffect} from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity, Image,Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { requestCameraPermission } from '../utils/cameraPermission';
import documentService from '../services/documentService';
import { genericEnum } from '../generic/genericEnum';
import { enviournment } from '../generic/enviournment';
import moment from 'moment'; 
import DateTimePicker from '@react-native-community/datetimepicker';

const EditDrivingLicenceForm = ({ navigation, route }) => {
  const { doc } = route.params;
  const [name, setName] = useState(doc?.name || '');
  const [number, setNumber] = useState(doc?.number || '');
  const [validity, setValidity] = useState(doc?.vaild_till || '');
  const [frontPhotoUri, setFrontPhotoUri] = useState(doc?.front || '');
  const [backPhotoUri, setBackPhotoUri] = useState(doc?.back || '');
  const [showDatePicker, setShowDatePicker] = useState(false);


  const openCamera = async (type) => {
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
            const uri = response.assets?.[0]?.uri;
            if (type === 'front') {
              setFrontPhotoUri(uri);
            } else if (type === 'back') {
              setBackPhotoUri(uri);
            }
      }
    }
    );
  };
  useEffect(() => {
    if (doc?.vaild_till) {
      const formatted = moment(doc.vaild_till).format('DD-MM-YYYY');
      setValidity(formatted);
    }
  }, []);
  const parseDate = (dateString) => {
    if (dateString.includes('-')) {
      const [day, month, year] = dateString.split('-');
      return new Date(`${year}-${month}-${day}`);
    } else {
      return new Date(dateString); // ISO fallback
    }
  };
  handleUpdate= async ()=>{
    const param ={
      id: doc._id, 
      'name':name,
      'number':number,
      'vaild_till':validity,
      'front':frontPhotoUri,
      'back':backPhotoUri,
      'type':'driving'
    }    
    try {
      const response = await documentService.createDocument(param);       
      if (response && response.status === 200) {
        navigation.navigate('PreviewDrivingLicence', { doc: response.data });
      }
       
    }catch(error){
      console.log(error);
    }
  }
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
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>DL No</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter DL No"
          value={number}
          onChangeText={setNumber}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Vaild Till</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.input}
            placeholder="Enter validity date"
            value={validity}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={validity ? parseDate(validity) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Front Photo</Text>
        <TouchableOpacity onPress={() => openCamera('front')} activeOpacity={0.7}>
          {frontPhotoUri ? (
            <Image
            source={{ uri: frontPhotoUri.startsWith('file://') || frontPhotoUri.startsWith('content://') ? frontPhotoUri : `${enviournment.imgUrl}${frontPhotoUri}` }}
            style={styles.photo}
          />    
          ) : (
            <View style={[styles.input, styles.photoPlaceholder]}>
              <Text style={{ color: '#999' }}>Tap to open camera</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Back Photo</Text>
        <TouchableOpacity  onPress={() => openCamera('back')}  activeOpacity={0.7}>
          {backPhotoUri ? (
            <Image
            source={{ uri: backPhotoUri.startsWith('file://') || backPhotoUri.startsWith('content://') ? backPhotoUri : `${enviournment.imgUrl}${backPhotoUri}` }}
            style={styles.photo}
          />    
          ) : (
            <View style={[styles.input, styles.photoPlaceholder]}>
              <Text style={{ color: '#999' }}>Tap to open camera</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btnBox} onPress={handleUpdate}>
        <Text style={styles.btnText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow:1,
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
    padding:20,
    borderRadius:20,
    alignItems: 'center',
    top:25
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
   
  }
});


export default EditDrivingLicenceForm;

