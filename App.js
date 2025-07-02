import React, { useEffect } from 'react';

import { StyleSheet, Text, View } from 'react-native'
import AppNavigator from './src/AppNavigator'
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('📦 Background Message:', remoteMessage);
});
const App = () => {
  useEffect(() => {
    async function setupNotifications() {
      await requestUserPermission();
      const fcmToken = await getFCMToken();
      if (fcmToken) {
        console.log('✅ App FCM Token:', fcmToken);
        // Send token to backend if needed
      }

      // 🔔 Foreground messages
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        console.log('📲 Foreground Message:', remoteMessage);
        Alert.alert(
          remoteMessage.notification?.title || 'New Notification',
          remoteMessage.notification?.body || 'You received a new message.'
        );
      });

      // 🔁 When app is opened from a notification (cold start)
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log('🚀 Notification caused app to open from quit state:', remoteMessage);
            // Handle navigation or logic here
          }
        });

      // 🔄 When app is opened from background
      const unsubscribeOpened = messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('🧭 App opened from background notification:', remoteMessage);
        // Handle navigation or logic here
      });

      return () => {
        unsubscribe();
        unsubscribeOpened();
      };
    }

    setupNotifications();
  }, []);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('✅ Notification permission granted:', authStatus);
    } else {
      console.log('❌ Notification permission denied');
    }
  }

  async function getFCMToken() {
    try {
      const token = await messaging().getToken();
      if (token) {
        return token;
      }
    } catch (error) {
      console.error('🚫 Error getting FCM token:', error);
    }
    return null;
  }
  return (
    <AppNavigator />
  )
}

export default App

const styles = StyleSheet.create({})