import { StyleSheet, Text, View, Image, TouchableOpacity, Modal } from 'react-native'
import React,{useState, useCallback} from 'react';
import RazorpayCheckout from "react-native-razorpay";
import RAZORPAY from "../const/constants";
import serviceWorker from "../services/serviceWorker";
import { webUrl } from "../generic/webUrl";
import asyncStorage from "../generic/storage";
import { genericEnum, statusCode } from "../generic/genericEnum";
import images from '../const/images';

const Subscription = ({ route, navigation }) => {
    const [amount, setAmount] = useState(500); 
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubScription = useCallback(async () => {
        try {
            const amountValue = Number(amount);
            if (!amount || isNaN(amountValue) || amountValue <= 0) {
                setErrorMessage("Please enter a valid amount.");
                setModalVisible(true);
                return;
            }
            const uuid = await asyncStorage.getItem("uuid");
            const token = await asyncStorage.getItem("accessToken");
            if (!uuid || !token) {
                setErrorMessage("Authentication failed. Please log in again.");
                setModalVisible(true);
                return;
            }
            const params = { amount: amountValue, currency: "INR", uuid, payment_from: "subscription" };
            const response = await serviceWorker._requestPostToken(webUrl.createOrder, params, token);
        
            if (!response || !response.data || !response.data.id || isNaN(response.data.amount)) {
                setErrorMessage("Failed to create order. Please try again.");
                setModalVisible(true);
                return;
            }
            const name = await asyncStorage.getItem("name");
    
            let options = {
                description: "Wallet Recharge",
                currency: "INR",
                key: RAZORPAY.key,
                amount: response.data.amount,
                name: name || "User",
                order_id: response.data.id,
                prefill: { contact: "7814955131", name: "Pooja" },
                theme: { color: "#0070F3" },
            };
    
            RazorpayCheckout.open(options)
                .then(async (paymentResponse) => {
                    const verifyParams = {
                        razorpay_order_id: paymentResponse.razorpay_order_id,
                        razorpay_payment_id: paymentResponse.razorpay_payment_id,
                        razorpay_signature: paymentResponse.razorpay_signature,
                        uuid,
                        amount: options.amount,
                        payment_from: "subscription"
                    };
                    await asyncStorage.setItem('callStatus', 'subscription'); 

                    const verifyResponse = await serviceWorker._requestPostToken(webUrl.verifyPayment, verifyParams, token);
                    if (verifyResponse.status === statusCode.success) {
                        // setErrorMessage(verifyResponse.message);
                        // setModalVisible(true);
                        await asyncStorage.setItem('is_subscribed', "true"); 
                        navigation.navigate(genericEnum.dashboard)
                    } else {
                        setErrorMessage("Payment verification failed.");
                        setModalVisible(true);
                    }
                })
                .catch((error) => {
                     setErrorMessage( "Payment failed.");
                    setModalVisible(true);
                });
    
        } catch (error) {
            setErrorMessage("Failed to initiate payment. Please try again.");
            setModalVisible(true);
        }
    }, [amount]);

    return (
        <View style={styles.container}>
            <View style={styles.titleBox}>
                <Image style={styles.logo} source={images.puc} />
                <Text style={styles.heading}>Buy a subscription</Text>
                <Text style={styles.title}>Download Qr, Calls, Fastag Recharges and so more!</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.round}>
                    <Text style={styles.Subscription}>Buy Subscription</Text>
                </View>
                <View style={styles.priceBox}>
                    <Text style={styles.price}><Text style={styles.time}>OneTime</Text>{'\n'}Payment</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.buttonBox} onPress={handleSubScription}>
                <Text style={styles.buttonText}>Get a Subscription / ₹{amount}</Text>
            </TouchableOpacity>
            <View style={styles.inqBox}>
                <Text style={styles.quesText}>When will | be billed?</Text>
                <Text style={styles.ansText}>You will be charged immediately upon purchasing the subscription.</Text>
                <Text style={styles.quesText1}>Does my subscription auto-renew?</Text>
                <Text style={styles.ansText1}>No, this is a one-time payment. Your subscription will not renew automatically.</Text>
            </View>
            <Modal
                transparent
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {/* <Text style={styles.modalTitle}>Error</Text> */}
                        <Text style={styles.modalMessage}>{errorMessage}</Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Subscription

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    titleBox: {
        alignItems: 'center',
        top: 50
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    heading: {
        fontSize: 22,
        fontWeight: '600',
        color: '#5F259F'
    },
    title: {
        fontSize: 15,
        fontWeight: '500',
        color: '#5a5a5a',
        top: 5
    },
    priceBox: {
        borderEndWidth: 4,
        borderLeftWidth:4,
        borderBottomWidth:4,
        borderColor: '#5F259F',
        padding: 30,
        marginVertical: 40,
        marginHorizontal: 20,
        borderRadius: 10,
        top: 50,
        width: '50%'
    },
    round: {
        width: '49.5%',
        backgroundColor: '#5F259F',
        height: 30,
        borderRadius: 50,
        top:'45%'
    },
    Subscription: {
        fontSize: 14,
        top: 4,
        fontWeight: '500',
        color: '#fff',
        textAlign: 'center'
    },
    time: {
        fontSize: 22,
        fontWeight: '600',
        color: '#5F259F'
    },
    price: {
        fontSize: 18,
        fontWeight: '500',
        color: '#5a5a5a',
        textAlign: 'center',
        lineHeight: 30
    },
    rsText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#5a5a5a',
        textAlign: 'center',
        lineHeight: 30,
    },
    buttonBox: {
        backgroundColor: '#5F259F',
        padding: 20,
        alignItems: 'center',
        margin: 30,
        borderRadius: 10,
        width: '90%', // Adjust width to fit within the parent
        alignSelf: 'center', // Ensures full width inside parent
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5, // Android shadow
        top: 30
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#fff'
    },
    quesText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#060606',
        paddingHorizontal: 15,
    },
    quesText1: {
        fontSize: 16,
        fontWeight: '500',
        color: '#060606',
        paddingHorizontal: 15,
        top: 12
    },
    inqBox: {
        top: 60,
        margin: 12
    },
    ansText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#5a5a5a',
        paddingHorizontal: 15,
        padding: 3,
        lineHeight: 18
    },
    ansText1: {
        fontSize: 14,
        fontWeight: '500',
        color: '#5a5a5a',
        paddingHorizontal: 15,
        top: 15,
        lineHeight: 18
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
    modalContent: {
        width: 300,
        backgroundColor: "#FFF",
        padding: 20,
        borderRadius: 10,
        alignItems: "center"
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "red"
    },
    modalMessage: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
        color: "#333"
    },
    modalButton: {
        backgroundColor: "#5F259F",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    modalButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold"
    }
})