import { StyleSheet } from 'react-native'
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
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
import PreviewPuc from './screen/PreviewPuc'
import PreviewRc from './screen/PreviewRc'
import PreviewInsurance from './screen/PreviewInsurance';
import PreviewDrivingLicence from './screen/PreviewDrivingLicence'
import EditInsuranceForm from './screen/EditInsuranceForm'
import EditPucForm from './screen/EditPucForm'
import EditRcForm from './screen/EditRcForm'
import EditDrivingLicenceForm from './screen/EditDrivingLicenceForm'
import images from './const/images';
import ServiceForm from './screen/ServiceForm';
import PrivacyPolicy from './drawer/PrivacyPolicy';
import RefundPolicy from './drawer/RefundPolicy';
import PreviewService from './screen/PreviewService';
import Message from './screen/Message';
import EditServiceForm from './screen/EditServiceForm';

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
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: true }} />
          <Stack.Screen name="RefundPolicy" component={RefundPolicy} options={{ headerShown: true }} />
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
          <Stack.Screen name="Message" component={Message} options={{ headerShown: false }} />
          <Stack.Screen name="Notification" component={Notification} options={{ title: 'Notification', headerShown: true }} />
          <Stack.Screen name="EditServiceForm" component={EditServiceForm} options={{ title: 'Notification', headerShown: true }} />
          <Stack.Screen name="PucForm" component={PucForm} options={({ navigation }) => ({
            headerShown: true, title: 'Puc', headerStyle: {
              backgroundColor: '#5F259F'
            }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: '600' }, headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 10 }}>
                <Image source={images.goBack} style={{ width: 28, height: 28, tintColor: 'white' }} />
              </TouchableOpacity>
            ),
          })}
          />
          <Stack.Screen name="InsuranceForm" component={InsuranceForm} options={({ navigation }) => ({
            headerShown: true,
            title: 'Insurance',
            headerStyle: {
              backgroundColor: '#5F259F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: 10 }}
              >
                <Image
                  source={images.goBack} // Replace with your icon path
                  style={{ width: 28, height: 28, tintColor: 'white' }}
                />
              </TouchableOpacity>
            ),
          })}
          />
          <Stack.Screen name="DrivingLicenceForm" component={DrivingLicenceForm} options={({ navigation }) => ({
            headerShown: true,
            title: 'DrivingLicence',
            headerStyle: {
              backgroundColor: '#5F259F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: 10 }}
              >
                <Image
                  source={images.goBack} // Replace with your icon path
                  style={{ width: 28, height: 28, tintColor: 'white' }}
                />
              </TouchableOpacity>
            ),
          })}
          />
          <Stack.Screen name="RcForm" component={RcForm} options={({ navigation }) => ({
            headerShown: true, title: 'Rc', headerStyle: {
              backgroundColor: '#5F259F'
            }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: '600' }, headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingHorizontal: 10 }}>
                <Image
                  source={images.goBack} // Replace with your icon path
                  style={{ width: 28, height: 28, tintColor: 'white' }}
                />
              </TouchableOpacity>
            ),
          })}
          />
          {/* <Stack.Screen name="EditForm" component={EditForm} options={{ headerShown: true }} /> */}
          <Stack.Screen name="PreviewPuc" component={PreviewPuc} options={({ navigation }) => ({
            headerShown: true,
            title: 'Preview Puc',
            headerStyle: {
              backgroundColor: '#5F259F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: 10 }}
              >
                <Image
                  source={images.goBack} // Replace with your icon path
                  style={{ width: 28, height: 28, tintColor: 'white' }}
                />
              </TouchableOpacity>
            ),
          })}
          />

          <Stack.Screen name="PreviewRc" component={PreviewRc} options={({ navigation }) => ({
            headerShown: true, title: 'Preview Rc',
            headerStyle: { backgroundColor: '#5F259F' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: '600' },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: 10 }}
              >
                <Image
                  source={images.goBack} // Replace with your icon path
                  style={{ width: 28, height: 28, tintColor: 'white' }}
                />
              </TouchableOpacity>
            ),
          })}
          />

          <Stack.Screen name="PreviewInsurance" component={PreviewInsurance} options={({ navigation }) => ({
            headerShown: true,
            title: 'Preview Insurance',
            headerStyle: {
              backgroundColor: '#5F259F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: 10 }}
              >
                <Image
                  source={images.goBack} // Replace with your icon path
                  style={{ width: 28, height: 28, tintColor: 'white' }}
                />
              </TouchableOpacity>
            ),
          })}
          />

          <Stack.Screen name="PreviewDrivingLicence" component={PreviewDrivingLicence} options={({ navigation }) => ({
            headerShown: true,
            title: 'Preview DrivingLicence',
            headerStyle: {
              backgroundColor: '#5F259F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: 10 }}
              >
                <Image
                  source={images.goBack} // Replace with your icon path
                  style={{ width: 28, height: 28, tintColor: 'white' }}
                />
              </TouchableOpacity>
            ),
          })}
          />

          <Stack.Screen name="PreviewService" component={PreviewService} options={({ navigation }) => ({
            headerShown: true, title: 'Preview Service',
            headerStyle: { backgroundColor: '#5F259F' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: '600' },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: 10 }}
              >
                <Image
                  source={images.goBack} // Replace with your icon path
                  style={{ width: 28, height: 28, tintColor: 'white' }}
                />
              </TouchableOpacity>
            ),
          })}
          />

          <Stack.Screen name="EditInsuranceForm" component={EditInsuranceForm} options={({ navigation }) => ({
            headerShown: true,
            title: 'Edit Insurance',
            headerStyle: {
              backgroundColor: '#5F259F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: 10 }}
              >
                <Image
                  source={images.goBack} // Replace with your icon path
                  style={{ width: 28, height: 28, tintColor: 'white' }}
                />
              </TouchableOpacity>
            ),
          })}
          />

          <Stack.Screen name="EditPucForm" component={EditPucForm} options={({ navigation }) => ({
            headerShown: true,
            title: 'Edit Puc',
            headerStyle: {
              backgroundColor: '#5F259F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: 10 }}
              >
                <Image
                  source={images.goBack} // Replace with your icon path
                  style={{ width: 28, height: 28, tintColor: 'white' }}
                />
              </TouchableOpacity>
            ),
          })}
          />

          <Stack.Screen name="EditRcForm" component={EditRcForm} options={({ navigation }) => ({
            headerShown: true,
            title: 'Edit Rc',
            headerStyle: {
              backgroundColor: '#5F259F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: 10 }}
              >
                <Image
                  source={images.goBack} // Replace with your icon path
                  style={{ width: 28, height: 28, tintColor: 'white' }}
                />
              </TouchableOpacity>
            ),
          })}
          />


          {/* <Stack.Screen name="EditDrivingLicenceForm" component={EditDrivingLicenceForm} options={{ headerShown: true }} /> */}
          <Stack.Screen
            name="EditDrivingLicenceForm"
            component={EditDrivingLicenceForm}
            options={({ navigation }) => ({
              headerShown: true,
              title: 'Edit Driving Licence',
              headerStyle: {
                backgroundColor: '#5F259F',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: '600',
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ paddingHorizontal: 10 }}
                >
                  <Image
                    source={images.goBack} // Replace with your icon path
                    style={{ width: 28, height: 28, tintColor: 'white' }}
                  />
                </TouchableOpacity>
              ),
            })}
          />

          <Stack.Screen name="ServiceForm" component={ServiceForm} options={({ navigation }) => ({
            headerShown: true,
            title: 'Services',
            headerStyle: {
              backgroundColor: '#5F259F',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ paddingHorizontal: 10 }}
              >
                <Image
                  source={images.goBack} // Replace with your icon path
                  style={{ width: 28, height: 28, tintColor: 'white' }}
                />
              </TouchableOpacity>
            ),
          })}
          />

          {/* <Stack.Screen name="VoiceCall" component={VoiceCall} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  )
}
export default AppNavigator

const styles = StyleSheet.create({})