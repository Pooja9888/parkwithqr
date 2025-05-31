import React, { useState, useCallback } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
import RazorpayCheckout from "react-native-razorpay";
import RAZORPAY from "../const/constants";
import serviceWorker from "../services/serviceWorker";
import { webUrl } from "../generic/webUrl";
import asyncStorage from "../generic/storage";
import { genericEnum, statusCode } from "../generic/genericEnum";

const Wallet = ({ navigation }) => {
    const [amount, setAmount] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleQuickAmount = (value) => {
        setAmount(value.toString());
    };

    const handleAddMoney = useCallback(async () => {
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

            const params = { amount: amountValue, currency: "INR", uuid, payment_from: "wallet" };
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
                        payment_from: "wallet"
                    };
                    await asyncStorage.setItem('callStatus', 'wallet');

                    const verifyResponse = await serviceWorker._requestPostToken(webUrl.verifyPayment, verifyParams, token);
                    if (verifyResponse.status === statusCode.success) {
                        navigation.navigate(genericEnum.dashboard);
                        setErrorMessage(verifyResponse.message);
                        // setModalVisible(true);
                    } else {
                        setErrorMessage("Payment verification failed.");
                        setModalVisible(true);
                    }
                })
                .catch((error) => {
                    setErrorMessage(error.description || "Payment failed.");
                    setModalVisible(true);
                });

        } catch (error) {
            setErrorMessage("Failed to initiate payment. Please try again.");
            setModalVisible(true);
        }
    }, [amount]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Add Money to <Text style={{ color: '#5F259F' }}>Your Wallet</Text></Text>
            <TextInput
                style={styles.input}
                placeholder="Enter amount"
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
            />
            <View style={styles.quickAmountContainer}>
                {[100, 200, 500, 1000].map((amt) => (
                    <TouchableOpacity key={amt} style={styles.quickAmount} onPress={() => handleQuickAmount(amt)}>
                        <Text style={styles.quickAmountText}>₹{amt}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleAddMoney}>
                <Text style={styles.buttonText}>Add Money</Text>
            </TouchableOpacity>

            {/* Error Modal */}
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        padding: 20,
        marginTop: 50
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333"
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#FFF",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 18,
        borderColor: "#DDD",
        borderWidth: 1,
        marginBottom: 20,
        color: '#5a5a5a'
    },
    quickAmountContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginBottom: 50
    },
    quickAmount: {
        backgroundColor: "#E0E0E0",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    quickAmountText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333"
    },
    button: {
        backgroundColor: "#5F259F",
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center'
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "bold"
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
});

export default Wallet;
