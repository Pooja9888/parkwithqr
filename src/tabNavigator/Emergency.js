import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  Modal,
} from 'react-native';

const Emergency = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePhoneCall = () => {
    const phoneNumber = "112";
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "Unable to open phone dialer.")
    );
    setModalVisible(false); // Close the modal after opening the dialer
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Emergency</Text> */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Call Emergency</Text>
      </TouchableOpacity>

      {/* Modal displayed on the same page */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Do you want to make an emergency call?
            </Text>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalYes]}
                onPress={handlePhoneCall}
              >
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalNo]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#000'
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    flex: 1,
    alignItems: 'center',
  },
  modalYes: {
    backgroundColor: '#28a745',
  },
  modalNo: {
    backgroundColor: '#dc3545',
  },
  modalButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default Emergency;
