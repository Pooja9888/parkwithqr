import React, { useState ,useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import images from '../const/images';
import deleteService from '../services/deleteService';
import asyncStorage from '../generic/storage';
import { useNavigation} from '@react-navigation/native'; 

const { width } = Dimensions.get('window');

const Settings = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePicUri, setProfilePicUri] = useState('https://www.w3schools.com/howto/img_avatar.png');
  
  useEffect(() => {  
    const loadProfile = async () => {
      const storedName = await asyncStorage.getItem('name');
      const storedPhone = await asyncStorage.getItem('phone_no');
      const storedVehicle = await asyncStorage.getItem('vehical_no');
      // const storedImage = await asyncStorage.getItem('profile_image');
  
      console.log('Profile Loaded:', {
        name: storedName,
        phone: storedPhone,
        vehicle: storedVehicle,
        // image: storedImage
      });
  
      setName(storedName || 'No Name');
      setPhoneNumber(storedPhone || 'No Phone Number');
      setVehicleNumber(storedVehicle || 'No Vehicle Number');
      if (storedImage) setProfilePicUri(storedImage);
    };
      loadProfile();
      const unsubscribe = navigation.addListener('focus', loadProfile);
  
    return unsubscribe;
  }, [navigation]);
  
  
  const handleChangePassword = () => {
    console.log('Change password clicked');
  };

  // const handleDeleteAccount = () => {
  //   console.log('Delete account clicked');
  // };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const response = await deleteService.deleteAccount();

            if (response.status === 200) {
              Alert.alert('Success', 'Account deleted successfully');
              // Optionally clear storage and navigate to login
              await asyncStorage.clear();
              // navigation.replace('Login'); // if you have navigation
            } else {
              Alert.alert('Error', response?.data?.message || 'Failed to delete account');
            }
          },
        },
      ]
    );
  };

  const handleImagePick = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.8 },
      (response) => {
        if (response.didCancel) return;
        if (response.errorCode) {
          console.error('ImagePicker Error:', response.errorMessage);
          return;
        }
        const uri = response.assets?.[0]?.uri;
        if (uri) {
          setProfilePicUri(uri);
        }
      }
    );
  };



  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={handleImagePick}>
            <LinearGradient colors={['#ffffff', '#5F259F']} style={styles.avatarRing}>
              <Image source={{ uri: profilePicUri }} style={styles.profilePicture} />
            </LinearGradient>
            <Text style={styles.changeText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="Name"
          placeholderTextColor={'#333'}
          value={name}
          editable={false}
          onChangeText={setName}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Vehicle Number"
          placeholderTextColor={'#333'}
          value={vehicleNumber}
          onChangeText={setVehicleNumber}
          // keyboardType="phone-pad"
          editable={false}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Phone Number"
          placeholderTextColor={'#333'}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          editable={false}
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
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#333',
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
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarRing: {
    borderRadius: 90,
    padding: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
    width: 130,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: '#fff',
  },
  changeText: {
    textAlign: 'center',
    color: '#5F259F',
    fontWeight: '600',
    marginBottom: 15,
  },
});

export default Settings;
