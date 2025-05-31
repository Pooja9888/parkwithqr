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

const callService = {
    // callReq: async (vehical_no, uuid) => {
    //     console.log('callReqcallReq', callReq);
    //     try {
    //         const params = {
    //             vehical_no: vehical_no,
    //             uuid: uuid
    //         }      
    //      console.log('params',params);
         
    //         const response = await serviceWorker._requestPostToken(webUrl.inboundCall,params,await asyncStorage.getItem("accessToken"));            
    //         console.log(response,'response call');
    //         console.log('params', params);   
    //         return response;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
    getTwilloToken: async () => {
        try {
            const response = await serviceWorker._requestGetToken(webUrl.callToken,await asyncStorage.getItem("accessToken"));             
                
            return response;
        } catch (error) {
            console.log(error);
        }
      },

    callReq: async (vehical_no, uuid) => {
        try {
            const params = {
                vehical_no: vehical_no,
                uuid: uuid
            }      
         
            const response = await serviceWorker._requestPostToken(webUrl.inboundCall,params,await asyncStorage.getItem("accessToken"));             
            return response;
        } catch (error) {
            console.log(error);
        }
      },

    callInitateCheck: async (sid) => {
        try {
            const uuid = await asyncStorage.getItem("uuid");
            const token = await asyncStorage.getItem("accessToken");

            const url = `${webUrl.callStatus}?uuid=${uuid}&call_sid=${sid}`;
            const response = await serviceWorker._requestGetToken(url, token);
            return response;
        } catch (error) {
            console.error('Error fetching call status:', error);
            return null;
        }
    },

    // duductWallet: async ({ startTime, endTime, duration, price, usd }) => {
    //     try {
    //         const uuid = await asyncStorage.getItem("uuid");
    //         const accessToken = await asyncStorage.getItem("accessToken");
    
    //         if (!uuid || !accessToken) {
    //             console.log("Missing UUID or Access Token");
    //             return;
    //         }
    
    //         const params = {
    //             startTime: startTime || "N/A",
    //             endTime: endTime || "N/A",
    //             duration: duration || "0",
    //             price: price || "0",
    //             usd: usd || "USD",
    //             uuid
    //         };
    
    //         const response = await serviceWorker._requestPostToken(webUrl.deductedFromWallet, params, accessToken);
    //         console.log("Wallet Deduction Response:", response);
            
    //         return response;
    //     } catch (error) {
    //         console.log("Error in duductWallet:", error);
    //     }    
    // },
    duductWallet: async (data) => {
        try {
            console.log(data,'dtataservice');
            
            const uuid = await asyncStorage.getItem("uuid");
            const accessToken = await asyncStorage.getItem("accessToken");
    
            if (!uuid || !accessToken) {
                console.log("Missing UUID or Access Token");
                return;
            }
    
            const params = {
                startTime: data.startTime || "N/A",
                endTime: data.endTime || "N/A",
                duration: data.duration || "0",
                price: data.price || "0",
                usd: data.usd || "USD",
                call_sid: data.call_sid || "N/A",
                call_status: data.call_status || "N/A",
                deducted_from: data.deducted_from || "N/A",
                uuid
            };
            const response = await serviceWorker._requestPostToken(webUrl.deductedFromWallet, params, accessToken);
            console.log("Wallet Deduction Response:", response);
    
            return response;
        } catch (error) {
            console.log("Error in duductWallet:", error);
            return { status: 500, error: error.message }; // return consistent error object
        }
    },

}

export default callService;
