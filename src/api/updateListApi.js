import axiosClient from "./axiosClient";

const updateListApi = {
    updateList: (payload) => {
        const url = 'updateList/';
        return axiosClient.post(url,payload);
    },
}

export default updateListApi