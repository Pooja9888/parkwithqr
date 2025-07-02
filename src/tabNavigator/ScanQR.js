// import { Vibration, StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, Image, Dimensions, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert, PermissionsAndroid } from 'react-native';
// import React, { useState, useRef, useEffect } from 'react';
// import { useFocusEffect, useIsFocused } from '@react-navigation/native';
// import RBSheet from 'react-native-raw-bottom-sheet';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';
// import asyncStorage from '../generic/storage';
// import images from '../const/images';
// import { genericEnum, statusCode } from '../generic/genericEnum';
// import Toast from 'react-native-toast-message';
// import callService from '../services/callService';
// import walletService from '../services/walletService';
// const { height } = Dimensions.get('window');

// const showToast = (message, type) => {
//   Toast.show({
//     type,
//     position: 'bottom',
//     text1: message,
//   });
// };

// const ScanQR = ({ navigation }) => {
//   const [vehicleNumber, setVehicleNumber] = useState('');
//   const [isLowBalanceModalVisible, setLowBalanceModalVisible] = useState(false);
//   // const [uuid, setUuid] = useState("69649b0d-206f-4731-b2af-e307ba5c3790");
//   const [uuid, setUuid] = useState("");
//   const [scanned, setScanned] = useState(false);

//   const refRBSheet = useRef(null);
//   const messageSheetRef = useRef(null);

//   useFocusEffect(
//     React.useCallback(() => {
//       setVehicleNumber('');
//     }, [])
//   );
//   const onSuccess = async (e) => {
//     const parsedData = JSON.parse(e.data);
//     const scannedUUID = parsedData.u;
//     const scannedVehicleNumber = parsedData.v;
//     setUuid(scannedUUID);
//     setVehicleNumber(scannedVehicleNumber);
//     Vibration.vibrate(200);
//     setScanned(true);
//     setTimeout(() => setScanned(false), 2000);

//     const walletBalance = await asyncStorage.getItem('wallet');
//     if (walletBalance >= 0) {
//       setUuid(scannedUUID);
//       return;
//     } else {
//       setLowBalanceModalVisible(true);
//     }
//   };

//   const onOpenPopup = async () => {
//     const isSubscrbed = await asyncStorage.getItem('is_subscribed');
//     const walletVal = await asyncStorage.getItem('wallet');
//     if (isSubscrbed == "false") {
//       if (walletVal > 0) {
//         refRBSheet.current.open();
//       } else {
//         setLowBalanceModalVisible(true);
//       }
//     } else {
//       refRBSheet.current.open();
//     }
//   };

//   const handleWalletRecharge = (response) => {
//     setLowBalanceModalVisible(false);
//     if (response === 'yes') {
//       navigation.navigate('Wallet');
//     }
//   };

//   const callRequest = async (value) => {
//     refRBSheet.current.close();
//     if (value) {
//       if (!vehicleNumber) {
//         showToast('Vehicle number is required', 'error');
//         return;
//       }
//       try {
//         const response = await callService.callReq(vehicleNumber, uuid);
//         if (response.status === statusCode.success) {
//           const tokenResponse = await callService.getTwilloToken();

//           navigation.navigate('CallScreen', {
//             userName: response?.data?.userName,
//             phoneNumber: response?.data?.toPhone,
//             originalNo: response?.data?.originalNo,
//             token: tokenResponse.data.token
//           });
//         } else {
//           showToast(response.message || 'Call failed', 'error');
//         }
//       } catch (error) {
//         showToast(genericEnum.error, 'error');
//       }
//     } else {
//       setTimeout(() => {
//         navigation.navigate(genericEnum.dashboard);
//       }, 300);
//       return;
//     }
//   };

//   const handleMessage = () => {
//     navigation.navigate('Message');
//   };

//   return (
//     <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1 }}>

//       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//         <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
//           <View style={{ alignItems: 'center', flex: 1 }}>
//             <View style={styles.cameraContainer}>
//               <QRCodeScanner
//                 onRead={onSuccess}
//                 reactivate={true}
//                 reactivateTimeout={1000}
//                 flashMode={RNCamera.Constants.FlashMode.auto}
//                 cameraStyle={styles.cameraStyle}
//               />
//               {scanned && (
//                 <Text style={styles.successText}>Vehicle number scanned!</Text>
//               )}
//             </View>

//             <View style={styles.inputContainer}>
//               <Text style={styles.text}>Enter Vehicle Number</Text>
//               <View style={styles.inputWrapper}>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Ex:- PB1XXXX12"
//                   value={vehicleNumber}
//                   onChangeText={(text) => setVehicleNumber(text.toUpperCase())}
//                   placeholderTextColor={'#888'}
//                 />
//                 <TouchableOpacity onPress={onOpenPopup}>
//                   <Image source={images.right} style={styles.inputIcon} />
//                 </TouchableOpacity>
//               </View>
//             </View>



//             {/* <RBSheet
//               ref={refRBSheet}
//               height={250}
//               openDuration={250}
//               closeOnDragDown={true}
//               closeOnPressMask={true}
//               customStyles={{
//                 container: {
//                   borderTopLeftRadius: 30,
//                   borderTopRightRadius: 30,
//                   padding: 20,
//                 },
//               }}
//             >
//               <Text style={styles.sheetText}>Do you want to make a call?</Text>
//               <View style={styles.buttonRow}>
//                 <TouchableOpacity
//                   style={styles.modalButton}
//                   onPress={() => {
//                     callRequest(false);
//                   }}
//                 >
//                   <Text style={styles.modalButtonText}>No</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.modalButton}
//                   onPress={() => {
//                     callRequest(true);
//                   }}
//                 >
//                   <Text style={styles.modalButtonText}>Yes</Text>
//                 </TouchableOpacity>
//               </View>
//             </RBSheet> */}

//             <View style={styles.inputContainer1}>
//               <View style={styles.inputWrapper}>
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Send Message"
//                   value={vehicleNumber}
//                   editable={false}
//                   placeholderTextColor={'#888'}
//                 />
//                 <TouchableOpacity onPress={() => messageSheetRef.current.open()}>
//                   <Image source={images.message} style={styles.messageIcon} />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Call Confirmation Sheet */}
//             <RBSheet
//               ref={refRBSheet}
//               height={250}
//               openDuration={250}
//               closeOnDragDown={true}
//               closeOnPressMask={true}
//               customStyles={{
//                 container: {
//                   borderTopLeftRadius: 30,
//                   borderTopRightRadius: 30,
//                   padding: 20,
//                 },
//               }}
//             >
//               <Text style={styles.sheetText}>Do you want to make a call?</Text>
//               <View style={styles.buttonRow}>
//                 <TouchableOpacity style={styles.modalButton} onPress={() => callRequest(false)}>
//                   <Text style={styles.modalButtonText}>No</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.modalButton} onPress={() => callRequest(true)}>
//                   <Text style={styles.modalButtonText}>Yes</Text>
//                 </TouchableOpacity>
//               </View>
//             </RBSheet>

//             <Modal
//               transparent
//               visible={isLowBalanceModalVisible}
//               animationType="slide"
//               onRequestClose={() => setLowBalanceModalVisible(false)}
//             >
//               <View style={styles.modalOverlay}>
//                 <View style={styles.modalContainer}>
//                   <Text style={styles.modalTitle}>Low Wallet Balance</Text>
//                   <Text style={styles.modalText}>Your balance is low. Do you want to recharge your wallet?</Text>
//                   <View style={styles.modalButtons}>
//                     <TouchableOpacity
//                       style={[styles.button, { backgroundColor: '#5F259F' }]}
//                       onPress={() => handleWalletRecharge('yes')}
//                     >
//                       <Text style={styles.buttonText}>Yes</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                       style={[styles.button, { backgroundColor: 'grey' }]}
//                       onPress={() => handleWalletRecharge('no')}
//                     >
//                       <Text style={styles.buttonText}>No</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               </View>
//             </Modal>
//           </View>
//         </ScrollView>
//       </TouchableWithoutFeedback>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   cameraContainer: {
//     height: height / 2,
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cameraStyle: {
//     height: '100%',
//     width: '100%',
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#fff',
//     // textAlign: 'center',
//   },
//   msgText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#5F259F',
//     // textAlign: 'center',
//   },
//   inputContainer: {
//     width: '90%',
//     marginTop: '2%',
//   },

//   inputContainer1: {
//     width: '90%',
//     marginTop: '2%',
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: '100%',
//     height: 70,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     backgroundColor: '#fff',
//     marginTop: 12
//   },
//   input: {
//     flex: 1,
//     fontSize: 16,
//     color: '#000',
//   },
//   inputIcon: {
//     width: 24,
//     height: 24,
//     tintColor: '#888',
//   },
//   messageIcon: {
//     width: 32,
//     height: 32,
//     tintColor: '#888',
//   },
//   sheetText: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 30,
//     marginTop: 25,
//   },
//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   modalButton: {
//     flex: 1,
//     padding: 12,
//     marginHorizontal: 10,
//     borderRadius: 5,
//     backgroundColor: '#5F259F',
//     alignItems: 'center',
//   },
//   modalButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '80%',
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#5F259F'
//   },
//   modalText: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#a677db'
//   },
//   modalButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//   },
//   button: {
//     paddingVertical: 10,
//     paddingHorizontal: 40,
//     borderRadius: 10,
//     margin: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   successText: {
//     position: 'absolute',
//     bottom: 10,
//     color: 'green',
//     fontWeight: 'bold',
//     backgroundColor: 'rgba(0,0,0,0.6)',
//     padding: 8,
//     borderRadius: 8,
//     textAlign: 'center',
//     alignSelf: 'center'
//   },
// });

// export default ScanQR;



import {
  Vibration,
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,Alert
} from 'react-native';
import React, { useState, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import asyncStorage from '../generic/storage';
import images from '../const/images';
import { genericEnum, statusCode } from '../generic/genericEnum';
import Toast from 'react-native-toast-message';
import callService from '../services/callService';
import messageService from '../services/messageService';
const { height } = Dimensions.get('window');

const showToast = (message, type) => {
  Toast.show({
    type,
    position: 'bottom',
    text1: message,
  });
};

const ScanQR = ({ navigation }) => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [isLowBalanceModalVisible, setLowBalanceModalVisible] = useState(false);
  //  const [uuid, setUuid] = useState("69649b0d-206f-4731-b2af-e307ba5c3790");
  const [uuid, setUuid] = useState("");
  const [scanned, setScanned] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');
  const [vehicleMessageNumber,setVehicleMessageNumber]= useState('');
  const refRBSheet = useRef(null);
  const messageSheetRef = useRef(null);
  const predefinedMessages = [
    "Your car is parked on the wrong side.",
    "Please move your car for emergency access.",
    "Your parking is causing traffic congestion.",
    "You're parked in a 'No Parking' zone.",
    "Your vehicle is parked in front of a gate."
  ];
  
  useFocusEffect(
    React.useCallback(() => {
      setVehicleNumber('');
    }, [])
  );
  const onSuccess = async (e) => {
    const parsedData = JSON.parse(e.data);
    const scannedUUID = parsedData.u;
    const scannedVehicleNumber = parsedData.v;
    setUuid(scannedUUID);
    setVehicleNumber(scannedVehicleNumber);
    Vibration.vibrate(200);
    setScanned(true);
    setTimeout(() => setScanned(false), 2000);

    const walletBalance = await asyncStorage.getItem('wallet');
    if (walletBalance >= 0) {
      setUuid(scannedUUID);
      return;
    } else {
      setLowBalanceModalVisible(true);
    }
  };

  const onOpenPopup = async () => {
    const isSubscrbed = await asyncStorage.getItem('is_subscribed');
    const walletVal = await asyncStorage.getItem('wallet');
    if (isSubscrbed == "false") {
      if (walletVal > 0) {
        refRBSheet.current.open();
      } else {
        setLowBalanceModalVisible(true);
      }
    } else {
      refRBSheet.current.open();
    }
  };

  const handleWalletRecharge = (response) => {
    setLowBalanceModalVisible(false);
    if (response === 'yes') {
      navigation.navigate('Wallet');
    }
  };

  const callRequest = async (value) => {
    refRBSheet.current.close();
    if (value) {
      if (!vehicleNumber) {
        showToast('Vehicle number is required', 'error');
        return;
      }
      try {
        const response = await callService.callReq(vehicleNumber, uuid);
        if (response.status === statusCode.success) {
          const tokenResponse = await callService.getTwilloToken();

          navigation.navigate('CallScreen', {
            userName: response?.data?.userName,
            phoneNumber: response?.data?.toPhone,
            originalNo: response?.data?.originalNo,
            token: tokenResponse.data.token
          });
        } else {
          showToast(response.message || 'Call failed', 'error');
        }
      } catch (error) {
        showToast(genericEnum.error, 'error');
      }
    } else {
      setTimeout(() => {
        navigation.navigate(genericEnum.dashboard);
      }, 300);
      return;
    }
  };

  const handleMessage = () => {
    navigation.navigate('Message');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={{ alignItems: 'center', flex: 1 }}>
            <View style={styles.cameraContainer}>
              <QRCodeScanner
                onRead={onSuccess}
                reactivate={true}
                reactivateTimeout={1000}
                flashMode={RNCamera.Constants.FlashMode.auto}
                cameraStyle={styles.cameraStyle}
              />
              {scanned && (
                <Text style={styles.successText}>Vehicle number scanned!</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.text}>Enter Vehicle Number</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Ex:- PB1XXXX12"
                  value={vehicleNumber}
                  onChangeText={(text) => setVehicleNumber(text.toUpperCase())}
                  placeholderTextColor={'#888'}
                />
                <TouchableOpacity onPress={onOpenPopup}>
                  <Image source={images.contactUs} style={styles.inputIcon} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputContainer1}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Send Message"
                  editable={true}
                  value={vehicleMessageNumber}
                  onChangeText={(text) => setVehicleMessageNumber(text.toUpperCase())}
                  placeholderTextColor={'#888'}
                />
                <TouchableOpacity onPress={() => messageSheetRef.current.open()}>
                  <Image source={images.message} style={styles.messageIcon} />
                </TouchableOpacity>
              </View>
            </View>

{/* 
            POST: /sendMessage

            Params
            to: phnNO, body: "Trxt merssahge" */}



            {/* Call Confirmation Sheet */}
            {/* <RBSheet
//               ref={refRBSheet}
//               height={250}
//               openDuration={250}
//               closeOnDragDown={true}
//               closeOnPressMask={true}
//               customStyles={{
//                 container: {
//                   borderTopLeftRadius: 30,
//                   borderTopRightRadius: 30,
//                   padding: 20,
//                 },
//               }}
//             >
//               <Text style={styles.sheetText}>Do you want to make a call?</Text>
//               <View style={styles.buttonRow}>
//                 <TouchableOpacity style={styles.modalButton} onPress={() => callRequest(false)}>
//                   <Text style={styles.modalButtonText}>No</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity style={styles.modalButton} onPress={() => callRequest(true)}>
//                   <Text style={styles.modalButtonText}>Yes</Text>
//                 </TouchableOpacity>
//               </View>
//             </RBSheet> */}

            {/* Message Bottom Sheet */}
            <RBSheet
              ref={messageSheetRef}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={400}
              customStyles={{
                wrapper: { backgroundColor: 'rgba(0,0,0,0.3)' },
                draggableIcon: { backgroundColor: '#000' },
                container: {
                  padding: 20,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                },
              }}
            >
          {predefinedMessages.map((msg, index) => (
    <TouchableOpacity key={index} onPress={() => setSelectedMessage(msg)}>
      <Text style={[
        styles.textEdit,
        selectedMessage === msg && { backgroundColor: '#5F259F', color: '#fff', borderRadius: 8 }
      ]}>
        {msg}
      </Text>
    </TouchableOpacity>
  ))}
  <TouchableOpacity
    onPress={async () => {
      if (!selectedMessage || !vehicleMessageNumber) {
        Alert.alert("Please select a message and scan a vehicle.");
        return;
      }
      console.log(selectedMessage,vehicleMessageNumber)
      try {
        const response = await messageService.sendMessage({
          to: vehicleMessageNumber,
          body: selectedMessage,
        });

        if (response.status === 200) {
          Alert.alert("Message sent successfully");
          setSelectedMessage('');
          messageSheetRef.current.close();
        } else {
          Alert.alert("Failed to send message");
        }
      } catch (err) {
        console.log(err);
        Alert.alert("Error sending message");
      }
    }}
    style={styles.sendBtn}
  >
    <Text style={styles.closeText}>Send</Text>
  </TouchableOpacity>
  <TouchableOpacity onPress={() => messageSheetRef.current.close()} style={styles.closeBtn}>
    <Text style={styles.closeText}>Close</Text>
  </TouchableOpacity>
</RBSheet>

            {/* Low Wallet Balance Modal */}
            <Modal
              transparent
              visible={isLowBalanceModalVisible}
              animationType="slide"
              onRequestClose={() => setLowBalanceModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Low Wallet Balance</Text>
                  <Text style={styles.modalText}>Your balance is low. Do you want to recharge your wallet?</Text>
                  <View style={styles.modalButtons}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#5F259F' }]} onPress={() => handleWalletRecharge('yes')}>
                      <Text style={styles.buttonText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'grey' }]} onPress={() => handleWalletRecharge('no')}>
                      <Text style={styles.buttonText}>No</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    height: height / 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraStyle: {
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
  },
  inputContainer: {
    width: '90%',
    marginTop: '2%',
  },
  inputContainer1: {
    width: '90%',
    marginTop: '2%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 70,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginTop: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  inputIcon: {
    width: 30,
    height: 30,
    tintColor: '#888',
  },
  messageIcon: {
    width: 32,
    height: 32,
    tintColor: '#888',
  },
  sheetText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 25,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#5F259F',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#5F259F',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#a677db',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  successText: {
    position: 'absolute',
    bottom: 10,
    color: 'green',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 8,
    textAlign: 'center',
    alignSelf: 'center',
  },
  textEdit: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    color: '#5F259F',
    fontWeight: '600',
    backgroundColor: '#e6d4f9',
    padding: 8,
    borderRadius: 3
  },
  sendBtn: {
    backgroundColor: '#5F259F',
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtn: {
    backgroundColor: '#c21106',
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 18,
    color: '#fff',
    padding: 12,
    fontWeight: '600',
  },
});

export default ScanQR;
