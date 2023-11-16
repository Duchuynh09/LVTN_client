import { useState, useEffect } from "react";
import DataContext from "./DataContext";
import eventApi from "../api/eventApi";

function DataProvider({ children }) {
  const [data, setData] = useState([]); // dữ liệu trả về ra giao diện
  const [dssvCoTheDangKy, setDssvCoTheDangKy] = useState([]); // dữ liệu tạm thời để kiểm tra
  const [dssvDaDangKy, setDssvDaDangKy] = useState([]); // dssv sau cuối
  const [clientData, setClientData] = useState();
  const [callApi, setCallApi] = useState(false);
  const [idEvent, setIdEvent] = useState();
  const [specialSeat, setSpecialSeat] = useState([]);

  const [isAdmin, setIsAdmin] = useState(false);

  const checkMssv = (mssv) => {
    if (dssvCoTheDangKy !== "all") {
      let isSuccess = dssvCoTheDangKy?.find((item) => {
        return item.mssv.toUpperCase() === mssv.toUpperCase();
      });
      return isSuccess;
    } else {
      return true;
    }
  };

  const checkAlready = (mssv) => {
    const check = dssvDaDangKy?.find((item) => {
      return item.mssv.toUpperCase() === mssv.toUpperCase();
    });

    setCallApi(!callApi); // set state nay thay doi khi goi ham check -> goi api lai de kiem tra
    return check;
  };

  useEffect(() => {
    const fetchEventApi = async () => {
      const respone = await eventApi.getDssvCoTheDangKy(idEvent);
      const respone2 = await eventApi.getDssvDaDangKy(idEvent);
      setDssvCoTheDangKy(respone.data);
      setDssvDaDangKy(respone2.data);
      setSpecialSeat(respone2.specialSeat);
      setData(respone2.data);
    };
    fetchEventApi();
  }, [idEvent]);

  // useEffect(() => {
  //   const fetchEventApi = async () => {
  //     const respone = await eventApi.getEvents();
  //     // lay ds sv dang ky cua su kien dau tien de hien thi dau tien
  //     if (respone.data) {
  //       setData(respone?.data[0]?.dsDaDangKy);
  //       setSpecialSeat(respone.data[0]?.specialSeat);
  //     }
  //   };
  //   fetchEventApi();
  // }, [callApi]);

  // user gui info để đki tham gia skien
  useEffect(() => {
    if (clientData) {
      const createDsApi = async () => {
        try {
          await eventApi.registerEvent(clientData);
        } catch (error) {
          console.log(error);
        }
      };
      createDsApi();
    }
  }, [clientData]);

  return (
    <DataContext.Provider
      value={{
        clientData,
        data,
        checkAlready,
        setDssvDaDangKy,
        dssvDaDangKy,
        setData,
        checkMssv,
        setClientData,
        setCallApi,
        callApi,
        idEvent,
        setIdEvent,
        specialSeat,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
