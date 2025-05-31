import { StyleSheet } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import DashBoard from './screen/DashBoard'
import Splash from './splash/Splash'
import Login from './screen/Login'
import Profile from './drawer/Profile'
import TermsConditions from './drawer/TermsConditions'
import Signup from './screen/Signup'
import Settings from './screen/Settings'
import EditProfileScreen from './drawer/EditProfileScreen'
import Toast from 'react-native-toast-message'
import GenerateQr from './tabNavigator/GenerateQr'
import Logout from './drawer/Logout'
import Wallet from './screen/Wallet'
import CallScreen from './tabNavigator/CallScreen'
import ScanQR from './tabNavigator/ScanQR'
import DownloadQR from './tabNavigator/DownloadQR'
import Subscription from './screen/Subscription'
import PucForm from './screen/PucForm'
import Notification from './screen/Notification';
import InsuranceForm from './screen/InsuranceForm';
import DrivingLicenceForm from './screen/DrivingLicenceForm';
import RcForm from './screen/RcForm';
import EditForm from './screen/EditForm'
// import VoiceCall from './screen/VoiceCall'

const Stack = createStackNavigator()

const AppNavigator = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ headerShown: true }} />
          <Stack.Screen name="DashBoard" component={DashBoard} options={{ headerShown: false }} />
          <Stack.Screen name="TermsConditions" component={TermsConditions} options={{ headerShown: true }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
          <Stack.Screen name="Settings" component={Settings} options={{ headerShown: true }} />
          <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ headerShown: true }} />
          <Stack.Screen name="GenerateQr" component={GenerateQr} options={{ headerShown: true }} />
          <Stack.Screen name="Logout" component={Logout} options={{ headerShown: true }} />
          <Stack.Screen name="Wallet" component={Wallet} options={{ headerShown: true }} />
          <Stack.Screen name="CallScreen" component={CallScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ScanQR" component={ScanQR} options={{ headerShown: false }} />
          <Stack.Screen name="DownloadQR" component={DownloadQR} options={{ headerShown: true }} />
          <Stack.Screen name="Subscription" component={Subscription} options={{ headerShown: false }} />
          <Stack.Screen name="Notification" component={Notification} options={{ title: 'Notification', headerShown: true }} />          
          <Stack.Screen name="PucForm" component={PucForm} options={{ headerShown: true }} />
          <Stack.Screen name="InsuranceForm" component={InsuranceForm} options={{ title: 'InsuranceForm', headerShown: true }} />          
          <Stack.Screen name="DrivingLicenceForm" component={DrivingLicenceForm} options={{ headerShown: true }} />
          <Stack.Screen name="RcForm" component={RcForm} options={{ title: 'InsuranceForm', headerShown: true }} />          
          <Stack.Screen name="EditForm" component={EditForm} options={{ headerShown: true }} />
          {/* <Stack.Screen name="VoiceCall" component={VoiceCall} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  )
}
export default AppNavigator

const styles = StyleSheet.create({})