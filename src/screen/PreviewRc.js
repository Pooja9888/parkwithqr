import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity,Alert } from 'react-native';
import { enviournment } from '../generic/enviournment';
import { genericEnum } from '../generic/genericEnum';
import moment from 'moment';
import documentService from '../services/documentService';

const PreviewRc =  ({ route,navigation }) => {
  const { doc } = route.params || {};
  
  const handleEdit = () => {
    navigation.navigate('EditRcForm', { doc });
  };

  handleButton = async () => {
    navigation.navigate(genericEnum.dashboard);
  }
  const handleSubmit = async () => {
    if (route?.params?.fromForm) {
      try {
            const param = {
              name: doc?.name,
              number: doc?.number,
              vaild_till: doc?.vaild_till,
              front: doc?.front,
              back:  doc?.back,
              type: 'rc'
            };
            console.log(param, 'paramrc');
        const response = await documentService.createDocument(param);
        if (response?.status === 200) {
          Alert.alert("RC submitted successfully!");
          navigation.navigate(genericEnum.dashboard);
        }
      } catch (err) {
        console.log(err);
        Alert.alert("Submission failed");
      }
    } else {
      navigation.navigate(genericEnum.dashboard);
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {doc?.status === 1 && (
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      )}

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.item}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{doc?.name || 'N/A'}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Reg No</Text>
          <Text style={styles.value}>{doc?.number || 'N/A'}</Text>
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Reg Validity</Text>
          <Text style={styles.value}>
  {doc?.vaild_till ? moment(doc.vaild_till, 'DD-MM-YYYY').format('DD-MM-YYYY')  : 'N/A'}
</Text>
        </View>

        <View style={styles.item}>
        {doc?.front ? (
              <Image
                source={{
                  uri: route?.params?.fromForm
                    ? doc.front
                    : `${enviournment.imgUrl}${doc.front}`,
                }}
                style={styles.photo}
              />
            ) : (
              <Text style={styles.value}>No photo available</Text>
            )}
        </View>

        <View style={styles.item}>
          <Text style={styles.label}>Back Photo</Text>
          {doc?.back ? (
              <Image
                source={{
                  uri: route?.params?.fromForm
                    ? doc.back
                    : `${enviournment.imgUrl}${doc.back}`,
                }}
                style={styles.photo}
              />
            ) : (
              <Text style={styles.value}>No photo available</Text>
            )}
        </View>
        <TouchableOpacity style={styles.btnBox} onPress={handleSubmit}>
          <Text style={styles.btnText}>
            {route?.params?.fromForm ? 'Submit' : 'Go to Home'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  item: {
    marginBottom: 35,
    top: 30
  },
  label: {
    fontSize: 16,
    color: '#5F259F',
    fontWeight: '700',
    marginBottom: 6,
    paddingHorizontal: 8,
  },
  value: {
    fontSize: 14,
    color: '#747474',
    fontWeight: '500',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#f7eeff',
    borderRadius: 8
  },
  photo: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  editButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#5F259F',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    zIndex: 10,
  },
  editText: {
    color: '#fff',
    fontWeight: '600',
  },
  btnBox: {
    backgroundColor: '#5F259F',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
    top: 25
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  }
});

export default PreviewRc;
