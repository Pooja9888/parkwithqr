import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import documentService from '../services/documentService';
import moment from 'moment';

  // const { doc } = route.params;
  // console.log(route.params, 'route.paramsroute.params');
  
  // const [name, setName] = useState(doc?.name || '');
  // const [previousServiceDate, setPreviousServiceDate] = useState(doc?.previousServiceDate || '');
  // const [nextServiceDate, setNextServiceDate] = useState(doc?.nextServiceDate || '');
  // const [showDatePicker, setShowDatePicker] = useState(false);
  // const [dateFieldToUpdate, setDateFieldToUpdate] = useState(null);


  // const { doc } = route.params;
  // const [name, setName] = useState(doc?.name || '');
  // const [previousServiceDate, setPreviousServiceDate] = useState(doc?.vaild_from || '');
  // const [nextServiceDate, setNextServiceDate] = useState(doc?.vaild_till || '');
  // const [showDatePicker, setShowDatePicker] = useState(false);
  // const [dateFieldToUpdate, setDateFieldToUpdate] = useState(null);

  // const parseDate = (dateString) => {
  //   if (!dateString) return new Date();
  //   const [day, month, year] = dateString.split('-');
  //   return new Date(`${year}-${month}-${day}`);
  // };

  const EditServiceForm = ({ navigation, route }) => {
    const { doc } = route.params;
    const [name, setName] = useState(doc?.name || '');
    const [previousServiceDate, setPreviousServiceDate] = useState(doc?.vaild_from || '');
    const [nextServiceDate, setNextServiceDate] = useState(doc?.vaild_till || '');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [dateFieldToUpdate, setDateFieldToUpdate] = useState(null);
  
    useEffect(() => {
      if (doc?.vaild_from) {
        const formatted = moment(doc.vaild_from).format('DD-MM-YYYY');
        setPreviousServiceDate(formatted);
      }
    
      if (doc?.vaild_till) {
        const formatted = moment(doc.vaild_till).format('DD-MM-YYYY');
        setNextServiceDate(formatted);
      }
    }, [doc]);
  
    const parseDate = (dateString) => {
      if (!dateString) return new Date();
      const [day, month, year] = dateString.split('-');
      return new Date(`${year}-${month}-${day}`);
    };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = moment(selectedDate).format('DD-MM-YYYY');
      if (dateFieldToUpdate === 'previous') {
        setPreviousServiceDate(formatted);
      } else if (dateFieldToUpdate === 'next') {
        setNextServiceDate(formatted);
      }
    }
  };

  const handleUpdate = async () => {
    if (!name || !previousServiceDate || !nextServiceDate) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    const param = {
      id: doc?._id,
      name: name,
      vaild_till: previousServiceDate,
      vaild_till: nextServiceDate,
      type: 'service',
    };

    try {
      const response = await documentService.createDocument(param);
      if (response && response.status === 200) {
        Alert.alert("Updated successfully!");
        navigation.navigate('PreviewService', { doc: response.data, fromForm: false });
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Update failed");
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
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
            value={nextServiceDate}
            editable={false}
            pointerEvents="none"
          />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={
            dateFieldToUpdate === 'previous'
              ? parseDate(previousServiceDate)
              : parseDate(nextServiceDate)
          }
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}

      <TouchableOpacity style={styles.btnBox} onPress={handleUpdate}>
        <Text style={styles.btnText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow:1,
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
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  photoPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  btnBox: {
    backgroundColor: '#5F259F',
    padding:20,
    borderRadius:20,
    alignItems: 'center',
    top:25
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
   
  }
});

export default EditServiceForm;

