import  { axiosClientJWT } from "./axiosClient";

const eventApi = {
  getDssvCoTheDangKy: (id) => {
    const url = `dssv/dssvCoTheDangKy/${id}`;
    return axiosClientJWT.get(url);
  },
  getDssvDaDangKy: (id) => {
    const url = `dssv/dssvDaDangKy/${id}`;
    return axiosClientJWT.get(url);
  },
  registerEvent: (payload) => {
    const url = `dssv/addDataDDK/${payload.idEvent}`;
    return axiosClientJWT.post(url, payload);
  },
  getEvents: () => {
    const url = `dssv/getEvents`;
    return axiosClientJWT.get(url);
  },
  getEventById: (id) => {
    const url = `dssv/getEventById/${id}`;
    return axiosClientJWT.get(url);
  },
  getPendingEvents: () => {
    const url = `dssv/getPendingEvents`;
    return axiosClientJWT.get(url);
  },
  createEvent: (id) => {
    const url = `dssv/createEvent/${id}`;
    return axiosClientJWT.get(url);
  },
  createPendingEvent: (payload) => {
    const url = `dssv/createPendingEvent/`;
    return axiosClientJWT.post(url, payload);
  },
  deletePendingEvent: (id) => {
    const url = `dssv/deletePendingEvent/${id}`;
    return axiosClientJWT.delete(url);
  },
  deleteEvent: (id) => {
    const url = `dssv/deleteEvent/${id}`;
    return axiosClientJWT.delete(url);
  },
  getEventsJoin: (payload) => {
    const url = `dssv/getEventsJoin/`;
    return axiosClientJWT.post(url,payload);
  },
  getEventsMake: (payload) => {
    const url = `dssv/getEventsMake/`;
    return axiosClientJWT.post(url,payload);
  },
  softList: (payload) => {
    const url = `dssv/softList/${payload.idEvent}`;
    return axiosClientJWT.post(url,payload);
  },
  generateFile: (payload) => {
    const url = `dssv/generateFile/${payload.idEvent}`;
    return axiosClientJWT.post(url,payload);
  },
  addDataCTDK: (payload) => {
    const url = `dssv/addDataCTDK/${payload.idEvent}`;
    return axiosClientJWT.post(url,payload);
  },
};

export default eventApi;
