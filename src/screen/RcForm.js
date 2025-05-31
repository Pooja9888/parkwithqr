import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

const RcForm = () => {
  const [name, setName] = useState('');
  const [pucCode, setPucCode] = useState('');
  const [validity, setValidity] = useState('');
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
        <Text style={styles.label}>Reg No</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter PUC code"
          placeholderTextColor="#999"
          value={pucCode}
          onChangeText={setPucCode}
          autoCapitalize="characters"
          returnKeyType="next"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Reg Vaildity</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter validity date"
          placeholderTextColor="#999"
          value={validity}
          onChangeText={setValidity}
          returnKeyType="done"
        />
      </View>

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

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Back Photo</Text>
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
});

export default RcForm;
