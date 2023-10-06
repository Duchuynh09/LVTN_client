import queryString from "query-string";
import axios from "axios";

import apiConfig from "./apiConfig";

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify({ ...params }),
});
const axiosChatBotClient = axios.create({
  baseURL: apiConfig.chatBotUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify({ ...params }),
});
const axiosClientJWT = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify({ ...params }),
});
// Có token trên Web mới có thể gọi được
axiosClientJWT.interceptors.request.use(async (config) => {
  config.headers.authorization =
    "Beaer " + JSON.parse(localStorage.getItem("token"));
  return config;
});

axiosClient.interceptors.request.use(async (config) => config);
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      // console.log(response);
      return response.data;
    }
    return response;
  },
  (error) => {
    throw new Error(error);
  }
);
axiosChatBotClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      // console.log(response);
      return response.data;
    }
    return response;
  },
  (error) => {
    throw new Error(error);
  }
);

axiosClientJWT.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      // console.log(response);
      return response.data;
    }
    return response;
  },
  (error) => {
    throw new Error(error.message);
  }
);

export default axiosClient;
export { axiosClientJWT, axiosChatBotClient };
