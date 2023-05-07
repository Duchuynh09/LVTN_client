import { axiosClientJWT } from "./axiosClient";

const userApi = {
  getAllUser: () => {
    const url = `user/getAllUser`;
    return axiosClientJWT.get(url);
  },
  getLecturer: () => {
    const url = `user/getAllLecturer`;
    return axiosClientJWT.get(url);
  },
  upLevelUser: (payload) => {
    const url = `user/upLevelUser`;
    return axiosClientJWT.post(url,payload);
  },
  delUser: (payload) => {
    const url = `user/delUser`;
    return axiosClientJWT.post(url,payload);
  },
  feedback: (payload) => {
    const url = `user/feedback`;
    return axiosClientJWT.post(url,payload);
  },
  getFeedback: () => {
    const url = `user/getFeedBack`;
    return axiosClientJWT.get(url);
  },
};

export default userApi;
