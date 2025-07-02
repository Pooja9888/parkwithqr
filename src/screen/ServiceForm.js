import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, ScrollView, TouchableOpacity, Platform, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ServiceForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [previousServiceDate, setPreviousServiceDate] = useState('');
  const [nextServiceDate, setNextServiceDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateFieldToUpdate, setDateFieldToUpdate] = useState(null);

  const handleNext = () => {
    if (!name ||  !nextServiceDate || !previousServiceDate) {
      Alert.alert("All fields are required.");
      return;
    }
  
    const previewDoc = {
      name,
      nextServiceDate:nextServiceDate,
      previousServiceDate: previousServiceDate,
      status: 0
    };
    navigation.navigate('PreviewService', { doc: previewDoc, fromForm: true });
  };


  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const day = selectedDate.getDate().toString().padStart(2, '0');
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = selectedDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

      if (dateFieldToUpdate === 'previous') {
        setPreviousServiceDate(formattedDate);
      } else if (dateFieldToUpdate === 'next') {
        setNextServiceDate(formattedDate);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
          returnKeyType="next"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Previous Service Date</Text>
        <TouchableOpacity
          onPress={() => {
            setDateFieldToUpdate('previous');
            setShowDatePicker(true);
          }}>
          <TextInput
            style={styles.input}
            placeholder="Select previous service date"
            placeholderTextColor="#999"
            value={previousServiceDate}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Next Service Due</Text>
        <TouchableOpacity
          onPress={() => {
            setDateFieldToUpdate('next');
            setShowDatePicker(true);
          }}>
          <TextInput
            style={styles.input}
            placeholder="Select next service date"
            placeholderTextColor="#999"
            value={nextServiceDate}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity style={styles.btnBox} onPress={handleNext}>
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    color: '#5F259F',
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#222',
  },
  btnBox: {
    backgroundColor: '#5F259F',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    top: 25,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ServiceForm;
