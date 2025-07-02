import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import images from '../const/images'; // adjust path as needed

const Message = () => {
  const refRBSheet = useRef();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.phoneBox}
        onPress={() => refRBSheet.current.open()}
      >
        <Image style={styles.phone} source={images.chat} />
      </TouchableOpacity>

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
        <Text style={styles.textEdit}>
          Your car is parked on the wrong side.
        </Text>
        <Text style={styles.textEdit}>
          Please move your car for emergency access.
        </Text>
        <Text style={styles.textEdit}>
          Your parking is causing traffic congestion.
        </Text>
        <Text style={styles.textEdit}>
          You're parked in a "No Parking" zone.
        </Text>
        <Text style={styles.textEdit}>
          Your vehicle is parked in front of a gate.
        </Text>

        <TouchableOpacity
          onPress={() => refRBSheet.current.close()}
          style={styles.closeBtn}
        >
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  phoneBox: {
    alignSelf: 'center',
  },
  phone: {
    width: 65,
    height: 65,
  },
  textEdit: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
    color: '#5F259F',
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0.5, height: 0.3 },
    textShadowRadius: 2,
  },
  closeBtn: {
    backgroundColor: '#c21106',
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 18,
    color: '#fff',
    padding: 16,
    fontWeight: '600',
  },
});
