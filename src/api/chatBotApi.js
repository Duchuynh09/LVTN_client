import { axiosChatBotClient } from "./axiosClient";

const chatBotApi={
    sendMess:(payload)=>{
        const url = `/`;
        return axiosChatBotClient.post(url,payload)
    }
};
export default  chatBotApi;