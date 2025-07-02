import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import asyncStorage from '../generic/storage';

const Profile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');

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

  return (
    <LinearGradient colors={['#5F259F', '#bc82fa']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Avatar with Gradient Ring */}
        <LinearGradient colors={['#ffffff', '#5F259F']} style={styles.avatarRing}>
          <Image
            source={{ uri: 'https://www.w3schools.com/howto/img_avatar.png' }}
            style={styles.profilePicture}
          />
        </LinearGradient>

        {/* Glass-effect Profile Card */}
        <View style={styles.profileCard}>
          <Text style={styles.heading}>My Profile</Text>

          <View style={styles.detailRow}>
            <Icon name="user" size={20} color="#5F259F" />
            <Text style={styles.detailText}>{name}</Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="phone" size={20} color="#5F259F" />
            <Text style={styles.detailText}>{phoneNumber}</Text>
          </View>

          <View style={styles.detailRow}>
            <Icon name="truck" size={20} color="#5F259F" />
            <Text style={styles.detailText}>{vehicleNumber}</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 80,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  avatarRing: {
    borderRadius: 90,
    padding: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: '#fff',
  },
  profileCard: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    padding: 25,
    backdropFilter: 'blur(15px)', // iOS only: Android will ignore
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    // elevation: 0.1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    // shadowRadius: 10,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffffcc',
    width: '100%',
    borderRadius: 15,
    padding: 12,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 1, height: 2 },
    shadowRadius: 4,
  },
  detailText: {
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
    fontWeight: '600',
  },
});

export default Profile;
