import axiosClient from "./axiosClient";
const config = {
  headers: {
    "Content-Type": "multipart/form-data", // Đặt header cho FormData
  },
};
const url = "posts/";
const postsApi = {
  getAllPost: () => {
    return axiosClient.get(url);
  },
  createPost: async (payload) => {
    return axiosClient.post(url, payload);
  },
  updatePost: (payload) => {
    return axiosClient.patch(url, payload, config);
  },
  deletePost: (id) => {
    return axiosClient.delete(`${url}/${id}`);
  },
  getUserPost: (payload, userId) => {
    return axiosClient.get(url, payload);
  },
  getById: (id) => {
    return axiosClient.get(`${url}/${id}`);
  },
  existPostForEvent: async (id) => {
    return axiosClient.post(`${url}/${id}`);
  },
};

export default postsApi;
