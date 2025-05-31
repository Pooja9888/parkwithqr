import { webUrl } from "../generic/webUrl";
import serviceWorker from "./serviceWorker";
import Toast from 'react-native-toast-message';
import asyncStorage from "../generic/storage";

const showToast = (message, type) => {
    Toast.show({
        type,
        position: 'top',
        text1: message,
    });
};

const notificationService = {

    notications: async (action) => {
        try {
            const params = {
                user_id: await asyncStorage.getItem('uuid'),
                action: action
            }            
            const response = await serviceWorker._requestPostToken(webUrl.notification, params);            
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    deleteNotications: async (action, id) => {
        try {
            const params = {
                notification_id: id,
                action: action
            }
            console.log(params,'params');
            
            const response = await serviceWorker._requestPostToken(webUrl.notification, params);
            console.log(response,'responsede');

            return response;
        } catch (error) {
            console.log(error);
        }
    },

}

export default notificationService;
