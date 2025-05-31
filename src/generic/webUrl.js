import { enviournment } from "./enviournment";
const webUrl = {
    login: `login`,
    register: `register`,
    inboundCall: `inboundCall`,
    callStatus: `callStatus`,
    deductedFromWallet:`deductedFromWallet`,
    updateConfig: `updateConfig`,
    createOrder: `createOrder`,
    verifyPayment: `verifyPayment`,
    updateProfile: `updateProfile`,
    deleteAccount: `deleteAccount`,
    callToken: `token`,
    notification: `notifications`

};

Object.entries(webUrl).map(([key, val], index) => {
    webUrl[key] = enviournment.url.concat("", val)
});

export { webUrl };