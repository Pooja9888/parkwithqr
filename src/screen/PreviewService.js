import React, { useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { enviournment } from '../generic/enviournment';
import { genericEnum } from '../generic/genericEnum';
import documentService from '../services/documentService';
import moment from 'moment';

const PreviewService = ({ route, navigation }) => {
    const { doc } = route.params || {};

    const handleEdit = () => {
        navigation.navigate('EditServiceForm', { doc });
    };
    const handleSubmit = async () => {
        if (route?.params?.fromForm) {
            try {
                const param = {
                    name: doc?.name,
                    number: doc?.number,
                    vaild_till: doc?.previousServiceDate,
                    vaild_till: doc?.nextServiceDate,
                    type: 'service'
                };

                const response = await documentService.createDocument(param);
                if (response?.status === 200) {
                    Alert.alert("Service submitted successfully!");
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
        <ScrollView contentContainerStyle={styles.container}>
            {doc?.status === 0 && (
                <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                    <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
            )}
            <View style={styles.item}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.value}>{doc?.name || 'N/A'}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>Previous Service Date</Text>
                <Text style={styles.value}> {doc?.previousServiceDate ? moment(doc.previousServiceDate, 'DD-MM-YYYY').format('DD-MM-YYYY') : 'N/A'}</Text>
            </View>

            <View style={styles.item}>
                <Text style={styles.label}>Next Service Due </Text>
                <Text style={styles.value}>
                    {doc?.nextServiceDate ? moment(doc.nextServiceDate, 'DD-MM-YYYY').format('DD-MM-YYYY') : 'N/A'}
                </Text>
            </View>

      

            {/* <TouchableOpacity style={styles.btnBox} onPress={handleButton}>
          <Text style={styles.btnText}>Go to Home</Text>
        </TouchableOpacity> */}
            <TouchableOpacity style={styles.btnBox} onPress={handleSubmit}>
                <Text style={styles.btnText}>
                    {route?.params?.fromForm ? 'Submit' : 'Go to Home'}
                </Text>
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



export default PreviewService;

