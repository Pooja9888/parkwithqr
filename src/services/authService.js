import { webUrl } from "../generic/webUrl";
import serviceWorker from "./serviceWorker";
import { statusCode } from "../generic/genericEnum";
import Toast from 'react-native-toast-message';
import asyncStorage from '../generic/storage';

const showToast = (message, type) => {
    Toast.show({
        type,
        position: 'top',
        text1: message,
    });
};

const authService = {
    login: async (phone_no, password) => {
        try {
            const response = await serviceWorker._requestPost(webUrl.login, {
                phone_no, // Use passed value
                password, // Use passed value
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    },

    register: async (data) => {

        try {
            const params = {
                name: data.name,
                phone_no: data.phoneNumber,
                vehical_no: data.vehicalNumber,
                password: data.password,
                device_type: "A",
                token: "GAeWwSU6j26RDmkYc36z5eXQjg8WQWkaPoDR9MKPTpjEHH44kxyuqtGBL2zWhXjg"
            }

            const response = await serviceWorker._requestPost(webUrl.register, params);

            return response;
        } catch (error) {
            console.log(error);
        }
    },

    validateToken: async () => {
        try {
            const refreshToken = await asyncStorage.getItem('refreshToken');
            const response = await serviceWorker._requestPost(webUrl.validateToken, {
                refreshToken: refreshToken
            });
            if (response.status == statusCode.success) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            //error.js
        }
    },
    refreshToken: async (status, message) => {
        try {
            if (status == statusCode.accessDenied) {
                const refreshToken = await asyncStorage.getItem('refreshToken');
                const response = await serviceWorker._requestPost(webUrl.refreshToken, {
                    refreshToken: refreshToken
                });
                if (response == statusCode.invalid) {
                    // showToast(response.message, 'error');
                    return;
                } else {
                    await asyncStorage.setItem('accessToken', response.data.accessToken);
                }
            } else {
                // showToast(message, 'error');
                return;
            }
        } catch (error) {
            console.log(error);
            // error.js 
        }
    },
}

export default authService;
