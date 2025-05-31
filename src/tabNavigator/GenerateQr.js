// import React from 'react';
// import { StyleSheet, View, Text, Linking, TouchableOpacity, Alert } from 'react-native';
// import QRCodeScanner from 'react-native-qrcode-scanner';
// import { RNCamera } from 'react-native-camera';

// const GenerateQr = () => {
//   const onSuccess = async e => {
//     try {
//       Alert.alert('done');
//       console.log(e);
//       await Linking.openURL(e.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <QRCodeScanner
//         onRead={(e) => onSuccess(e)}
//         // flashMode={RNCamera.Constants.FlashMode.torch}
//         topContent={
//           <Text style={styles.centerText}>
//             Go to{' '}
//             <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
//             your computer and scan the QR code.
//           </Text>
//         }
//         bottomContent={
//           <TouchableOpacity style={styles.buttonTouchable}>
//             {/* <Text style={styles.buttonText}>OK. Got it!</Text> */}
//           </TouchableOpacity>
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: '#777'
//   },
//   textBold: {
//     fontWeight: '500',
//     color: '#000'
//   },
//   buttonText: {
//     fontSize: 21,
//     color: 'rgb(0,122,255)'
//   },
//   buttonTouchable: {
//     padding: 16
//   }
// });

// export default GenerateQr

import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Linking, Alert, Dimensions, TextInput, Image } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import images from '../const/images';

const { height } = Dimensions.get('window');

const GenerateQr = () => {
  const [scannedText, setScannedText] = useState('');

  const onSuccess = async (e) => {
    const scannedData = e.data;
    setScannedText(scannedData); // Update TextInput with scanned data
    Alert.alert('QR Code Scanned', scannedData);
    try {
      await Linking.openURL(scannedData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log('Camera mounted');
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {/* <QRCodeScanner
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.auto}
          cameraStyle={styles.cameraStyle} // Set to half screen
        /> */}
        <QRCodeScanner
          onRead={onSuccess}
          reactivate={true}
          reactivateTimeout={1000}
          flashMode={RNCamera.Constants.FlashMode.auto}
          cameraStyle={styles.cameraStyle}
        />
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.text}> Enter Vehicle Number </Text>
          <TextInput
            style={styles.input}
            placeholder="Ex:- PB1XXXX12"
            value={scannedText}
            onChangeText={setScannedText}
          />
          <Image source={images.right} style={styles.inputIcon} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cameraContainer: {
    height: height / 2, // Half screen height for camera
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraStyle: {
    height: '100%',
    width: '100%',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
    tintColor: '#888', // Adjust color if needed
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },

});

export default GenerateQr;
