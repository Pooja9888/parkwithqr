import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, Image, Dimensions, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert, PermissionsAndroid } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import asyncStorage from '../generic/storage';
import images from '../const/images';
import { genericEnum, statusCode } from '../generic/genericEnum';
import Toast from 'react-native-toast-message';
import callService from '../services/callService';
import walletService from '../services/walletService';
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
  // const [uuid, setUuid] = useState("69649b0d-206f-4731-b2af-e307ba5c3790");
  const [uuid, setUuid] = useState("241e2555-6881-4e3b-9e87-27551a8e12be");
  const refRBSheet = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      setVehicleNumber('');
    }, [])
  );
  const onSuccess = async (e) => {
    const walletBalance = await asyncStorage.getItem('wallet');
    if (walletBalance >= 0) {
      setUuid(e.data);
      return;
    } else {
      setLowBalanceModalVisible(true);
    }
  };

  const onOpenPopup   = async () => {
    const isSubscrbed = await asyncStorage.getItem('is_subscribed');
    const walletVal   = await asyncStorage.getItem('wallet');
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
        console.log(vehicleNumber, uuid,'vehicleNumber, uuid');
        
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
                  <Image source={images.right} style={styles.inputIcon} />
                </TouchableOpacity>
              </View>
            </View>

            <RBSheet
              ref={refRBSheet}
              height={250}
              openDuration={250}
              closeOnDragDown={true}
              closeOnPressMask={true}
              customStyles={{
                container: {
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  padding: 20,
                },
              }}
            >
              <Text style={styles.sheetText}>Do you want to make a call?</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    callRequest(false);
                  }}
                >
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    callRequest(true);
                  }}
                >
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
              </View>

            </RBSheet>

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
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: '#5F259F' }]}
                      onPress={() => handleWalletRecharge('yes')}
                    >
                      <Text style={styles.buttonText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.button, { backgroundColor: 'grey' }]}
                      onPress={() => handleWalletRecharge('no')}
                    >
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
    fontSize: 18,
    fontWeight: '600',
    color: '#5F259F',
    textAlign: 'center',
  },
  inputContainer: {
    width: '90%',
    marginTop: '28%',
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 70,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginTop: 12
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  inputIcon: {
    width: 24,
    height: 24,
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
    color: '#5F259F'
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#a677db'
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
});

export default ScanQR;