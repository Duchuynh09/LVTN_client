import axiosClient from "./axiosClient";

const signInApi = {
    signInUser: (payload) => {
        const url = 'user/signIn';
        return axiosClient.post(url,payload);
    },
    signInAdmin: (payload) => {
        const url = 'admins/signIn';
        return axiosClient.post(url,payload);
    },
}

export default signInApi