import axiosClient from "./axiosClient";

const url = "device/";
const devicesApi = {
  getAllDevice: () => {
    return axiosClient.get(url);
  },
  createDevice: async (payload) => {
    return axiosClient.post(url, payload);
  },
  updateDevice: (payload, id) => {
    return axiosClient.patch(`${url}/${id}`, payload);
  },
  deleteDevice: (id) => {
    return axiosClient.delete(`${url}/${id}`);
  },
  getById: (id) => {
    return axiosClient.get(`${url}/${id}`);
  },
};

export default devicesApi;
