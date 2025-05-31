import { webUrl } from "../generic/webUrl";
import serviceWorker from "./serviceWorker";
import asyncStorage from "../generic/storage";

const paymentService = {

    createOrder: async (data) => {
        try {
            const params = {
                amount: 1,
                uuid: await asyncStorage.getItem("userId"),
                currency: "INR"
            }
            const response = await serviceWorker._requestPostToken(webUrl.createOrder, params, await asyncStorage.getItem("accessToken"));

            return response;
        } catch (error) {
            console.log(error);
        }
    },



    // createItems: async (data) => {
    //     console.log(data,'afa');
    //     try {
    //         const params = {
    //             bar_code: data.upsCode,
    //             description: data.description,
    //             unit_cost: data.unitCost,
    //             quantity: data.quantity,
    //             discount_type: data.discountType,
    //             discount_amount: data.discountAmount,
    //             case_discount: data.cashId,
    //             additional_details: data.additionalDetails,
    //             taxable: data.taxableEnabled,
    //             return_option: data.returnOptionEnabled,
    //             total: data.totalPrice,
    //             save: data.saveEnabled,
    //             userId: await asyncStorage.getItem("userId")
    //         }
    //         console.log(params, 'params======>>>>>>>>>>>.');
    //         const response = await serviceWorker._requestPostToken(webUrl.createItems, params, await asyncStorage.getItem("accessToken"));
    //         return response;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },

}
export default paymentService;