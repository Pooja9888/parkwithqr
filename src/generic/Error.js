import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';

const Error = () => {
  const navigation = useNavigation(); // Access the navigation prop using the useNavigation hook

  return (
    <View style={styles.container}>
      <Ionicons name="close-circle-outline" color={'#dc143c'} size={35} />
      <Text style={styles.errorText}>ERROR</Text>
      <Text style={styles.try}>Ooops..something went wrong, Try again</Text>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.goBack()}>
        <Text style={styles.tryText}>Try again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 8,
    color: colors.lightBlack,
  },
  buttonContainer: {
    padding: 10,
    backgroundColor: '#dc143c',
    marginHorizontal: 7,
    marginVertical: 20,
    borderRadius: 10,
  },
  try: {
    fontSize: 14,
    fontWeight: '600',
  },
  tryText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
});
