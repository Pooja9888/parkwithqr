import React, { useEffect } from 'react';
import { View, Text, Linking, Alert } from 'react-native';

const ChatSupport = () => {
  useEffect(() => {
    const openWhatsApp = async () => {
      const phoneNumber = '919888747494'; // Replace with the desired phone number, including the country code
      const message = 'Hello, I need assistance with...'; // Replace with your predefined message
      // const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('WhatsApp is not installed on this device.');
      }
    };

    openWhatsApp();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Redirecting to WhatsApp...</Text>
    </View>
  );
};

export default ChatSupport;
