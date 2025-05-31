import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import asyncStorage from '../generic/storage';

const CustomDrawer = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');


  const handleLogout = () => {
    setModalVisible(false);
    navigation.navigate('Login'); // Redirect to Login after logout
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

    loadProfile();
  }, []);


  const menuOptions = [
    { id: 2, name: 'Profile', icon: require('../assets/images/profile.png'), route: 'Profile' },
    // { id: 3, name: 'Settings', icon: require('../assets/images/gear.png'), route: 'Settings' },
    { id: 4, name: 'Terms & Conditions', icon: require('../assets/images/faq.png'), route: 'TermsConditions' },
    { id: 5, name: 'Logout', icon: require('../assets/images/logout.png'), route: 'Logout' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: 'transparent' }}>
      <DrawerContentScrollView>
        <View style={styles.headerContainer}>
          <Image source={require('../assets/images/user.png')} style={styles.avatar} />
          <Text style={styles.username}>{name}</Text>
          <Text style={styles.useremail}>{phoneNumber}</Text>
          <Text style={styles.useremail}>{vehicleNumber}</Text>
        </View>
        <View style={styles.menuContainer}>
          {menuOptions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuOption}
              onPress={() => {
                if (item.name === 'Logout') {
                  setModalVisible(true);
                } else {
                  navigation.navigate(item.route);
                }
              }}
            >
              <Image source={item.icon} style={styles.menuIcon} />
              <Text style={styles.menuText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </DrawerContentScrollView>
      <DrawerItem label="Version 1.0.0" labelStyle={styles.versionText} onPress={() => {}} />
      {/* Logout Confirmation Modal */}
      <Modal transparent={true} visible={modalVisible} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#5F259F',
    borderRadius: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  useremail: {
    color: '#ccc',
    fontSize: 14,
  },
  menuContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#e6d4f9',
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
    tintColor: '#5F259F',
  },
  menuText: {
    color: '#5F259F',
    fontSize: 16,
    fontWeight: '600',
  },
  versionText: {
    color: '#939294',
    textAlign: 'center',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 280,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
    color: '#9a3cfd'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    backgroundColor: '#5F259F',
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
