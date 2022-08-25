import axiosClient from "./axiosClient";

const svApi = {
    getDssvCoTheDangKy: () => {
        const url = 'dssv/dssvCoTheDangKy';
        return axiosClient.get(url);
    },
    getDssvDaDangKy: () => {
        const url = 'dssv/dssvDaDangKy';
        return axiosClient.get(url);
    },
    createDssvDaDangKy: (payload) => {
        const url = 'dssv/';
        return axiosClient.post(url,payload);
    },
}

export default svApi