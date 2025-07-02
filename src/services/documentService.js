import { webUrl } from "../generic/webUrl";
import serviceWorker from "./serviceWorker";
import asyncStorage from "../generic/storage";
import { axiosPostToken } from "./axiosService";

const documentService = {

  createDocument: async (param) => {
    console.log(param,'paramparam');
    
    try {
      const user_id = await asyncStorage.getItem('uuid');
      const formData = new FormData();
      formData.append('uuid', user_id);
      formData.append('name', param.name);
      formData.append('vaild_till', param.vaild_till);
      formData.append('type', param.type);
      if (param.type === 'service') {
        formData.append('vaild_from', param.vaild_from);
      } else {
        formData.append('number', param.number);
      }
      if (param.id) {
        formData.append('id', param.id); // this triggers update logic on backend
      }
      if (param.front && (param.front.startsWith('file://') || param.front.startsWith('content://'))) {
        const fileName = param.front.split('/').pop();
        const file = {
          uri: param.front,
          name: fileName,
          type: 'image/jpeg',
        };
        formData.append('front', file);
      }
      if (param.back && (param.type === 'rc' || param.type === 'driving')) {
        const fileName = param.back.split('/').pop();
        const file = {
          uri: param.back,
          name: fileName,
          type: 'image/jpeg',
        };
        formData.append('back', file);
      }   
      console.log(formData, 'formddddd');
      const response = await axiosPostToken(webUrl.document, formData, await asyncStorage.getItem("accessToken"));  
      console.log(response, 'responseeeeee');
                
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  updateConfig: async () => {
    try {
      const params = {
        device_type: await asyncStorage.getItem("device_type"),
        uuid: await asyncStorage.getItem("uuid"),
        // device_token: await asyncStorage.getItem("userId"),
      }      
      const response = await serviceWorker._requestPostToken(webUrl.updateConfig, params, await asyncStorage.getItem("accessToken"));      
      return response;
    } catch (error) {
      console.log(error);
    }

  }
}

export default documentService;
