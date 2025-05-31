// import React, { useEffect, useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { Voice } from '@twilio/voice-react-native-sdk';

// const VoiceCall = ({ navigation }) => {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [isCalling, setIsCalling] = useState(false);
//   const [status, setStatus] = useState('');
//   const [call, setCall] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const voice = useRef(new Voice()).current;

//   useEffect(() => {
//     const setupTwilio = async () => {
//       try {
//         const res = await fetch('https://your-backend.com/token'); // Replace with your backend
//         const { token } = await res.json();

//         await voice.register(token);
//         setStatus('Ready to call');

//         voice.on('callInvite', (callInvite) => {
//           callInvite.accept();
//         });

//         voice.on('callStateChanged', (call) => {
//           console.log('Call state changed:', call.state);
//           if (call.state === 'connected') {
//             setIsCalling(true);
//             setStatus('Call in progress...');
//           } else if (call.state === 'disconnected') {
//             setIsCalling(false);
//             setCall(null);
//             setStatus('Call ended');
//           }
//         });

//         voice.on('registrationFailed', (err) => {
//           console.error('Registration failed:', err);
//           Alert.alert('Twilio Error', 'Registration failed');
//         });
//       } catch (err) {
//         console.error('Twilio setup error:', err);
//         Alert.alert('Twilio Error', 'Failed to initialize voice');
//       }
//     };

//     setupTwilio();

//     return () => {
//       voice.unregister();
//     };
//   }, []);

//   const handleCall = async () => {
//     if (!phoneNumber) {
//       Alert.alert('Error', 'Enter phone number');
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch('https://your-backend.com/token'); // Replace with your backend
//       const { token } = await res.json();

//       const newCall = await voice.connect(token, {
//         params: { To: phoneNumber },
//       });

//       setCall(newCall);
//       setStatus('Calling...');
//       setIsCalling(true);
//     } catch (err) {
//       console.error('Call failed:', err);
//       Alert.alert('Call Failed', 'Unable to make the call');
//     }
//     setLoading(false);
//   };

//   const handleHangUp = () => {
//     if (call) {
//       call.disconnect();
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <Text style={styles.title}>Enter Mobile Number</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter number"
//         value={phoneNumber}
//         onChangeText={setPhoneNumber}
//         keyboardType="phone-pad"
//       />
//       <TouchableOpacity
//         style={[styles.button, { backgroundColor: isCalling ? 'red' : '#007AFF' }]}
//         onPress={isCalling ? handleHangUp : handleCall}
//         disabled={loading}
//       >
//         {loading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <Text style={styles.buttonText}>{isCalling ? 'Hang Up' : 'Call'}</Text>
//         )}
//       </TouchableOpacity>

//       <Text style={styles.status}>{status}</Text>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 24,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 20,
//     marginBottom: 16,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 18,
//     marginBottom: 16,
//   },
//   button: {
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   status: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#555',
//   },
// });

// export default VoiceCall;
