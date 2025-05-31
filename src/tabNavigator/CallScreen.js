import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert, PermissionsAndroid, Toast
} from 'react-native';
import React, { useState, useEffect, useRef, statusIntervalRef, useCallback } from 'react';
import { useRoute } from '@react-navigation/native';
import images from '../const/images';
import { genericEnum } from '../generic/genericEnum';
import callService from '../services/callService';
import asyncStorage from '../generic/storage';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
    AudioDevice,
    Call,
    CallInvite,
    CallMessage,
    IncomingCallMessage,
    OutgoingCallMessage,
    Voice,
    TwilioErrors,
    TwilioVoice
} from '@twilio/voice-react-native-sdk';

const showToast = (message, type) => {
    Toast.show({
        type,
        position: 'bottom',
        text1: message,
    });
};

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/*
    TWILLO CALLS DOCS :)
    queued       The call is waiting in line to be sent.
    initiated    Twilio has started dialing the call.
    ringing      The destination is ringing.
    in-progress  The call is currently ongoing (picked up).
    completed    The call has ended successfully.
    busy         The destination was busy.
    failed       The call failed (could not connect).
    no-answer    The destination did not answer.
    canceled     The call was canceled before it was answered.
*/

const CallScreen = ({ navigation }) => {
    const route = useRoute();
    const { userName, phoneNumber, originalNo, token } = route.params || {};
    const [showTime, setShowTime] = useState(false);
    const [callDuration, setCallDuration] = useState(0);
    const [callStatus, setCallStatus] = useState('ringing');
    const [callStatusResponse, setCallStatusResponse] = useState({});

    const [callStatusIntervalId, setCallStatusIntervalId] = useState(null);
    const [timerIntervalId, setTimerIntervalId] = useState(null);

    const refRBSheet = useRef()
    const callAbortTime = 45; // Seconds
    const timeOut = 5000; // Every 5 Sec

    // Twillo State Management
    const [deviceReady, setDeviceReady] = useState(false);
    const [call, setCall] = useState(null);
    const [sid, setSid] = useState("");
    const voiceRef = useRef(new Voice());

    const requestBluetoothPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                ]);
                const bluetoothGranted = granted['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED;
                if (!bluetoothGranted) {
                    console.warn('BLUETOOTH_CONNECT permission not granted');
                }
                return bluetoothGranted;
            } catch (err) {
                console.warn('Permission request error:', err);
                return false;
            }
        }
        return true;
    };

    const requestMicrophonePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Microphone permission granted');
                    return true;
                } else {
                    console.warn('Microphone permission denied');
                    return false;
                }
            } catch (err) {
                console.error('Microphone permission error:', err);
                return false;
            }
        }
        return true;
    };

    const setupTwilio = useCallback(async () => {
        try {
            const micPermission = await requestMicrophonePermission();
            const bluetoothPermission = await requestBluetoothPermissions();
            if (!micPermission) {
                showToast('Microphone permission is required to make calls.', 'error');
                return;
            }
            if (!bluetoothPermission) {
                showToast('Bluetooth permission is required to make calls.', 'error');
                return;
            }
            setDeviceReady(true);
            if (!token) return;
            const voice = voiceRef.current;
            await voice.register(token);
            const outgoingCall = await voice.connect(token, {
                params: {
                    To: originalNo,

                }
            });
            await outgoingCall;
            setCall(outgoingCall);
            // Log all events for debugging

            outgoingCall.on('ringing', () => {
                setCallStatus('Ringing...');
                console.log('Ringing event, SID:', outgoingCall._sid);
                console.log('Call is ringing on the recipient’s device:', outgoingCall);
                if (outgoingCall._sid) {
                    setSid(outgoingCall._sid); // Set SID for checkCallStatus
                } else {
                    console.warn('Ringing event: SID is undefined');
                }
            });

            // const whenCallNotAnswerd = (call, sid) => {
            //     console.log('Complete event, SID:', sid);
            //     console.log('Call is complete on the recipient’s device:', call);
            //     if (sid) {
            //         setSid(sid);
            //         // deductFromWallet(, outgoingCall._sid).then(() => {
            //         //     console.log('when call get ended by receiptent person');
            //         // });
            //     }
            // };

            const whenCallNotAnswerd = async (call, sid, log) => {
                console.log(`hi pooja `, log)
                console.log('Complete event, SID:', sid);
                console.log('Call is complete on the recipient’s device:', call);
                if (sid) {
                    setSid(sid);
                    call.disconnect();
                    setCall(null);
                    try {
                        const response = await callService.callInitateCheck(sid);
                        console.log('response', response);
                        if (response?.data) {
                            const status = response.data.status;
                            console.log('Call status from server:', status);
                            if (['no-answer', 'busy', 'failed','completed'].includes(status)) {
                                await deductFromWallet(response.data, sid);
                                console.log('Deducted due to recipient not answering.');
                            } else {
                                console.log('No deduction: call status is', status);
                            }
                        }
                    } catch (error) {
                        console.log('Error checking call status inside whenCallNotAnswerd:', error);
                    }
                }
            };

            // outgoingCall.on('disconnected', (call) => {
            //     console.log('Call disconnected:', call);
            //     console.log('Call SID:', outgoingCall._sid);
            //     if (call?.error) {
            //         const { code, message } = call.error;
            //         console.warn('Call error on disconnect:', code, message);
            //         if (code === 486) {
            //             whenCallNotAnswerd(call, outgoingCall._sid);
            //         } else if (code === 480) {
            //             whenCallNotAnswerd(call, outgoingCall._sid);
            //         } else {
            //             whenCallNotAnswerd(call, outgoingCall._sid);
            //         }
            //     } else {
            //         whenCallNotAnswerd(call, outgoingCall._sid);
            //     }
            // });
            
            outgoingCall.on('disconnected', () => {
                whenCallNotAnswerd(outgoingCall, outgoingCall._sid, 'disconnected');
              });
              
            // outgoingCall.on('disconnected', () => {
            //     console.log('Call disconnected:', outgoingCall);
            //     console.log('Call SID:', outgoingCall._sid);
            //     console.log('Call outgoingCall:', outgoingCall);

            //     console.log('call?.errorcall?.error', call?.error);
                
            //     if (call?.error) {
            //         const { code, message } = call.error;
            //         console.warn('Disconnected with error:', code, message);

            //         switch (code) {
            //             case 487:
            //                 whenCallNotAnswerd(call, outgoingCall._sid, 'Call canceled');
            //                 break;
            //             case 486:
            //                 whenCallNotAnswerd(call, outgoingCall._sid, 'user busy');
            //                 break;
            //             case 603:
            //                 whenCallNotAnswerd(call, outgoingCall._sid, 'call declined');
            //                 break;
            //             case 480:
            //                 whenCallNotAnswerd(call, outgoingCall._sid, 'unavailble');
            //                 break;
            //             default:
            //                 console.log(`Disconnected: ${message || 'Unknown error'}`);
            //         }
            //     } else {
            //         whenCallNotAnswerd(call, outgoingCall._sid, 'disconnected');
            //     }
            // });

            outgoingCall.on('connectFailure', (call) => {
                console.error('Call connect failure:', call);
                if (call?.error) {
                    const { code, message } = call.error;
                    showToast(`Connect failed: ${message || 'Unknown error'}`, 'error');
                } else {
                    showToast('Connect failed: No error object.', 'error');
                }
            });
        } catch (err) {
            console.error('Error setting up Twilio:', err);
        }
    }, [token, originalNo]);

    // Weather to check the call status on each 5 secs.
    const checkCallStatus = async (sid) => {
        if (sid) {
            try {
                const response = await callService.callInitateCheck(sid);
                if (response) {
                    const data = response.data;
                    setCallStatus(data.status);
                    setCallStatusResponse({ data: response.data, sid: sid });
                    if (data.status == 'in-progress') {
                        setShowTime(true);
                        if (callDuration >= callAbortTime) {
                            deductFromWallet(response.data, sid).then(() => {
                                console.log('invoked from 45 seconds');
                            });
                        }
                    }
                }
            } catch (error) {
                console.log('Error checking call status', error);
            }
        }
    };

    useEffect(() => {
        setupTwilio();
        return () => {
            const voice = voiceRef.current;
            voice.unregister();
            voice.removeAllListeners();
        };
    }, [setupTwilio]);

    // To Handle Interval Logic Here
    useEffect(() => {
        if (!sid) return;
        const intervalId = setInterval(() => {
            checkCallStatus(sid);
        }, timeOut);
        setCallStatusIntervalId(intervalId);
        return () => clearInterval(intervalId);
    }, [sid, timeOut]);

    useEffect(() => {
        if (showTime) {
            const id = setInterval(() => {
                setCallDuration(prev => prev + 1);
            }, 1000);
            setTimerIntervalId(id);
            return () => clearInterval(id);
        }
    }, [showTime]);

    const callRuningStatus = (status) => {
        let message = "";
        switch (status) {
            case 'queued':
            case 'initiated':
            case 'ringing':
                message = "The recipient's phone is ringing.";
                break;
            case 'busy':
                message = "The recipient's phone is busy.";
                break;
            case 'no-answer':
                message = "The recipient did not pick up the call.";
                break;
            case 'failed':
                message = "The call to the recipient failed.";
                break;
            default:
                return true;
        }
        return message;
    };

    const handleEndCallOld = async () => {
        const result = callRuningStatus(callStatus);
        console.log(callStatus,'callStatus');
        
        if (result) {
            const { data, sid } = callStatusResponse;
            await deductFromWallet(data, sid);
            if (call) {
                await call.disconnect();
                setCall(null);
            }
        }
        setTimeout(() => {
            navigation.navigate(genericEnum.dashboard);
        }, 500);
    };
    const handleEndCall = async () => {
        try {
            const result = callRuningStatus(callStatus); 
            console.log(result,'result');
            if (result) {
                const { data, sid } = callStatusResponse;
                await deductFromWallet(data, sid);
                if (call) {
                    await call.disconnect();
                    setCall(null);
                }
            }
          if (callStatusIntervalId) clearInterval(callStatusIntervalId);
          if (timerIntervalId) clearInterval(timerIntervalId);
      
          setShowTime(false);
          setCallDuration(0);
          navigation.navigate(genericEnum.dashboard);
        } catch (error) {
          console.log('Error while manually ending call:', error);
        }
      };
      
    const deductFromWallet = async (data, sid) => {
        try {
            // const deducted_from = await asyncStorage.getItem('callStatus');
            // console.log(deducted_from, 'deducted_from');
            const deductItems = {
                startTime: data?.startTime || new Date(),
                endTime: data?.endTime || new Date(),
                duration: data?.duration || '0',
                price: data?.price || '0',
                usd: data?.priceUnit || 'USD',
                call_sid: sid,
                call_status: "completed",
                deducted_from: 'N/A'
                // deducted_from: deducted_from || 'N/A'
            };
            const deductBal = await callService.duductWallet(deductItems);            
            if (deductBal.status == 200) {
                if (callStatusIntervalId) clearInterval(callStatusIntervalId);
                if (timerIntervalId) clearInterval(timerIntervalId);
                setShowTime(false);
                setCallDuration(0);
                navigation.navigate(genericEnum.dashboard);
            }
            return true;
        } catch (error) {
            console.log('Wallet deduction failed:', error);
        }
    };

    return (
        <View style={styles.container} >
            <Text style={styles.name}>{userName || 'Unknown'}
            </Text>
            <Image style={styles.logo} source={images.account} />
            <Text style={styles.phoneText}> {phoneNumber || 'No Number'}</Text>
            {
                showTime && (
                    <>
                        <Text style={styles.time}> In Call </Text>
                        < Text style={styles.time} > {formatTime(callDuration)} </Text>
                    </>
                )
            }
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '70%' }}>
                <TouchableOpacity style={styles.phoneBox} onPress={handleEndCall} >
                    <Image style={styles.phone} source={images.phonecall} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.phoneBox} onPress={() => refRBSheet.current.open()}>
                    <Image style={styles.phone} source={images.chat} />
                </TouchableOpacity>
            </View>
            <RBSheet
                ref={refRBSheet}
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
                {/* <Text style={{ fontSize: 18, marginBottom: 10, color: '#5F259F', fontWeight: '600' }}>Your car is parked on the wrong side.</Text> */}
                <Text style={styles.textEdit} >
                    Your car is parked on the wrong side.
                </Text>
                <Text style={styles.textEdit} > Please move your car for emergency access.</Text>
                <Text style={styles.textEdit} > Your parking is causing traffic congestion.</Text>
                <Text style={styles.textEdit} > You're parked in a "No Parking" zone.</Text>
                <Text style={styles.textEdit} > Your vehicle is parked in front of a gate.</Text>
                <TouchableOpacity onPress={() => refRBSheet.current.close()} style={styles.closeBtn} >
                    <Text style={{ fontSize: 18, color: '#fff', padding: 16, fontWeight: '600' }}>Close </Text>
                </TouchableOpacity>
            </RBSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f8f3fc',
        paddingTop: 60,
    },
    logo: {
        width: 120,
        height: 120,
        top: 20,
    },
    name: {
        fontSize: 23,
        fontWeight: '500',
        color: '#5F259F',
        padding: 5,
        top: 10,
        paddingVertical: 10,
    },
    phoneText: {
        fontSize: 25,
        color: '#5F259F',
        padding: 5,
        top: 20,
        paddingVertical: 10,
    },
    phoneBox: {
        top: '100%',
    },
    time: {
        fontSize: 22,
        color: '#5F259F',
        padding: 5,
        top: 10,
        paddingVertical: 8,
    },
    phone: {
        width: 65,
        height: 65,
    },
    textEdit: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 25,
        color: '#5F259F',
        fontWeight: '600',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0.5, height: 0.3 },
        textShadowRadius: 2
    },
    closeBtn: {
        backgroundColor: '#c21106',
        borderRadius: 20,
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default CallScreen;