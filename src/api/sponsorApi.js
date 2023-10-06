import axiosClient from "./axiosClient";

const url = "sponsor/";
const sponsorsApi = {
  getAllSponsor: () => {
    return axiosClient.get(url);
  },
  createSponsor: async (payload) => {
    return axiosClient.post(url, payload);
  },
  updateSponsor: (payload, id) => {
    return axiosClient.patch(`${url}/${id}`, payload);
  },
  deleteSponsor: (id) => {
    return axiosClient.delete(`${url}/${id}`);
  },
  getById: (id) => {
    return axiosClient.get(`${url}/${id}`);
  },
};

export default sponsorsApi;
