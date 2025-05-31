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

const profileService = {
    updateProfile: async (data) => {
        const params = {
            uuid: data.uuid,
            name: data.name,
            phone_no: data.phone_no,
            vehical_no:data.vehical_no,
        }
        try {
            const response = await serviceWorker._requestPostToken(webUrl.updateProfile, params, await asyncStorage.getItem("accessToken"));
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

export default profileService;
