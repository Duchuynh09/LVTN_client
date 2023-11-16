import { axiosClientJWT } from "./axiosClient";
import axiosClient from "./axiosClient";
const userApi = {
  // for user
  getAllIdUser: () => {
    const url = `user/searchData`;
    return axiosClient.get(url);
  },
  // for ADMIN
  getAllUser: () => {
    const url = `user/getAllUser`;
    return axiosClientJWT.get(url);
  },
  getAllNotVertify: () => {
    const url = `user/getAllNotVertify`;
    return axiosClientJWT.get(url);
  },
  getOneUser: (payload) => {
    const email = payload;
    const url = `user/${email}`;
    return axiosClientJWT.get(url);
  },
  getLecturer: () => {
    const url = `user/getAllLecturer`;
    return axiosClientJWT.get(url);
  },
  upLevelUser: (payload) => {
    const url = `user/upLevelUser`;
    return axiosClientJWT.post(url, payload);
  },
  updateProfile: (payload) => {
    const url = `user/updateProfile`;
    return axiosClientJWT.patch(url, payload);
  },
  delUser: (payload) => {
    const url = `user/delUser`;
    return axiosClientJWT.post(url, payload);
  },
  delAllNotVertify: () => {
    const url = `user/delNotVertify`;
    return axiosClientJWT.delete(url);
  },
  feedback: (payload) => {
    const url = `user/feedback`;
    return axiosClientJWT.post(url, payload);
  },
  getFeedback: () => {
    const url = `user/getFeedBack`;
    return axiosClientJWT.get(url);
  },
};

export default userApi;
