import React, { useRef,useState ,useEffect} from 'react';
import { View, Text, TouchableOpacity, Image, Alert,PermissionsAndroid, Platform } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import asyncStorage from '../generic/storage';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
const DownloadQR = () => {
  const viewShotRef = useRef(null);
  const [uuid, setUUID] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  useEffect(() => {
    (async () => {
      const storedUUID = await asyncStorage.getItem('uuid');
      const storedVehicleNo = await asyncStorage.getItem('vehical_no');

      if (storedUUID) setUUID(storedUUID);
      if(storedVehicleNo) setVehicleNumber(storedVehicleNo)
    })();
  }, []);
 
 


  const saveToGallery = async (uri) => {
    try {
      // Android permissions
      if (Platform.OS === 'android') {
        const version = Platform.Version;

        const permission = await PermissionsAndroid.request(
          version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );

        if (permission !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Storage permission required.');
          return;
        }
      }

      const fileName = `QR_${Date.now()}.png`;
      const newPath = `${RNFS.CachesDirectoryPath}/${fileName}`;

      await RNFS.copyFile(uri, newPath);

      await CameraRoll.save(newPath, { type: 'photo' });
      Alert.alert('Success', 'QR Code saved to gallery!');
    } catch (error) {
      console.log('Save error:', error);
      Alert.alert('Failed', 'Could not save QR Code');
    }
  };

  const handlePress = async () => {
    try {
      if (!uuid) {
        Alert.alert('UUID missing', 'No UUID found');
        return;
      }

      const uri = await viewShotRef.current.capture();
      await saveToGallery(uri);
    } catch (err) {
      console.log('Capture error:', err);
      Alert.alert('Error', 'Could not capture QR Code');
    }
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff', width: '100%' }}>
    {uuid ? (
      <View style={{ position: 'absolute', top: '15%' }}>
        <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 , result: 'tmpfile' }}>
          {/* <QRCode value={`uuid:${uuid}`} size={350} /> */}
          {/* <QRCode value={`uuid:${uuid},vehicle:${vehicleNumber}`} size={350} /> */}
          {/* <QRCode value={`${vehicleNumber}`} size={350} /> */}
          <QRCode
            value={JSON.stringify({ u: uuid, v: vehicleNumber })}
            size={300}
            backgroundColor="#ffffff"
            color="#000000"
            quietZone={10}
          />


        </ViewShot>
      </View>
    ) : (
      <Text style={{ marginTop: '20%' }}>Loading QR...</Text>
    )}

    <TouchableOpacity
      style={styles.imageContainer}
      onPress={handlePress}
      disabled={!uuid}
    >
      <Text style={styles.textTitle}>Download QR</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = {
  imageContainer: {
    padding: 20,
    backgroundColor: '#5F259F',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    top:'70%'
  },
  image: {
    width: 50,
    height: 50,
    tintColor: '#fff',
  },
  textTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,

  },
};

export default DownloadQR;
