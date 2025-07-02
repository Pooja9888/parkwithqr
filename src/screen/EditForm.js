import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import images from '../const/images';
import { launchCamera } from 'react-native-image-picker';

const EditForm = () => {
  const [photoUri, setPhotoUri] = useState(null);

  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        saveToPhotos: true,
        cameraType: 'back',
      },
      (response) => {
        if (response.didCancel) {
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

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between',  marginHorizontal: 18, alignItems: 'center', top: 20 }}>
        <View style={styles.editName}>
          <Text style={styles.text}>Name: Sunny</Text>
          <Text style={styles.text}>Driving Licence No: A2675542gy4Q</Text>
          <Text style={styles.text}>Validity Up To: 15 June, 2025</Text>
        </View>
        <View >
          <Image style={styles.edit} source={images.pen} />
        </View>
      </View>
      <View style={styles.formBox}>
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
      </View>

    </View>
  )
}

export default EditForm

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4d4c4c',
    padding:5,
backgroundColor: '#f7eeff',
    borderRadius: 8,
    marginBottom: 8
  },
  edit: {
    width: 40,
    height: 40
  },
  formBox: {
    margin: 15,
    top: 20
  },
  editName: {

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
})