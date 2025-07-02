import { webUrl } from "../generic/webUrl";
import serviceWorker from "./serviceWorker";
import asyncStorage from "../generic/storage";

const messageService = {
  sendMessage: async ({ to, body })  => {
    try {
        const params = {
            to,       // Phone number or UUID from scanned QR
            body,     // Message text
          };
          console.log(params,'params');
          
      const response = await serviceWorker._requestPostToken(webUrl.sendMessage, params, await asyncStorage.getItem("accessToken"));      
      return response;
    } catch (error) {
      console.log(error);
    }

  }
}

export default messageService;
