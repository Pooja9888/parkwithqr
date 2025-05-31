import { webUrl } from "../generic/webUrl";
import serviceWorker from "./serviceWorker";
import asyncStorage from "../generic/storage";

const walletService = {
    updateConfig: async () => {
        try {
            const params = {
                device_type: await asyncStorage.getItem("device_type"),
                device_token: await asyncStorage.getItem("accessToken"),
                uuid :await asyncStorage.getItem("uuid"),
            }
            const response = await serviceWorker._requestPostToken(webUrl.updateConfig, params, await asyncStorage.getItem("accessToken"));            
            return response;
        } catch (error) {
            console.log(error);
        }
    }, 
}


export default walletService;