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

const deleteService = {
deleteAccount: async () => {
        try {
            const params = {
                uuid: await asyncStorage.getItem('uuid'),               
            }    
            console.log(params,'deleteparam');
                    
            const response = await serviceWorker._requestPostToken(webUrl.deleteAccount, params);  
            console.log(response,'responsedeleteparam');          
            return response;
        } catch (error) {
            console.log(error);
        }
    },

}

export default deleteService;