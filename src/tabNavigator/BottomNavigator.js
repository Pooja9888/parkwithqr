import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Linking, Alert } from 'react-native'; // Import Linking
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ScanQR from './ScanQR';
import Emergency from './Emergency';
import ChatSupport from './ChatSupport';
import HomeScreen from '../screen/HomeScreen';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const openWhatsApp = () => {
    const phoneNumber = '7814955131'; // Replace with the desired phone number
    const message = 'Hello, I need support!'; // Default message to send
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open WhatsApp:', err)
    );
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'ScanQR':
              iconName = 'qrcode-scan';
              break;
            case 'Emergency':
              iconName = 'alert-circle';
              break;
            case 'ChatSupport':
              iconName = 'chat';
              break;
            default:
              iconName = 'circle';
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#5F259F',
        tabBarInactiveTintColor: '#939294',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="ScanQR" component={ScanQR} />
      <Tab.Screen
        name="Emergency"
        component={HomeScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Home', { showEmergencyPopup: true });
          },
        })}
        options={{ headerTitle: 'Emergency Assistance' }}
      />

      <Tab.Screen
        name="ChatSupport"
        component={ChatSupport}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Prevent default navigation
            openWhatsApp(); // Open WhatsApp with the specified number
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
