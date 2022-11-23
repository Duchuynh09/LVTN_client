import { useState, useEffect } from "react";
import DataContext from "./DataContext";
import svApi from "../api/svApi";

function DataProvider({ children }) {
  const [data, setData] = useState([]); // dữ liệu trả về ra giao diện
  const [dssvCoTheDangKy, setDssvCoTheDangKy] = useState([]); // dữ liệu tạm thời để kiểm tra
  const [dssvDaDangKy, setDssvDaDangKy] = useState([]); // dssv sau cuối
  const [typeSort, setTypeSort] = useState({ type: "mssv", atoZ: true });
  const [clientData, setClientData] = useState();
  const [callApi, setCallApi] = useState(false);

  const checkMssv = (mssv) => {
    let isSuccess = dssvCoTheDangKy.find((item) => {
      return item.mssv === mssv;
    });
    return isSuccess;
  };

  const checkAlready = (mssv) => {
    let check = dssvDaDangKy.find((item) => {
      return item.mssv === mssv;
    });

    setCallApi(!callApi); // set state nay thay doi khi goi ham check -> goi api lai de kiem tra
    return check;
  };

  useEffect(() => {
    const fetchSvApi = async () => {
      const respone = await svApi.getDssvCoTheDangKy();
      setDssvCoTheDangKy(respone);
    };
    fetchSvApi();
  }, []);

  useEffect(() => {
    const fetchSvApi = async () => {
      const respone = await svApi.getDssvDaDangKy();
      setDssvDaDangKy(respone);
    };
    fetchSvApi();
  }, [callApi]);

  useEffect(() => {
    if (clientData) {
      const createDsApi = async () => {
        try {
          await svApi.createDssvDaDangKy(clientData);
        } catch (error) {
          console.log(error);
        }
      };
      createDsApi();
    }
  }, [clientData]);
  
  useEffect(() => {
    if (typeSort.type === "mssv") {
      sortMssv(dssvDaDangKy);
    } else if (typeSort.type === "class") {
      sortClass(dssvDaDangKy);
    } else if (typeSort.type === "major") {
      sortMajor(dssvDaDangKy);
    } else {
      sortDonvi(dssvDaDangKy);
    }
  });

  const sortMssv = (spData) => {
    let tmpData = spData;
    if (typeSort.az) {
      for (let i = 0; i < tmpData.length; i++) {
        for (let j = i + 1; j < tmpData.length; j++) {
          if (tmpData[i].mssv > tmpData[j].mssv) {
            let tmp = tmpData[j];
            tmpData[j] = tmpData[i];
            tmpData[i] = tmp;
          }
        }
      }
    } else {
      for (let i = 0; i < tmpData.length; i++) {
        for (let j = i + 1; j < tmpData.length; j++) {
          if (tmpData[i].mssv < tmpData[j].mssv) {
            let tmp = tmpData[j];
            tmpData[j] = tmpData[i];
            tmpData[i] = tmp;
          }
        }
      }
    }

    tmpData.forEach((item, index) => {
      item.id = index + 1;
    });

    setData(tmpData);
  };

  const sortClass = (spData) => {
    let tmpData = spData;
    if (typeSort.az) {
      for (let i = 0; i < tmpData.length; i++) {
        for (let j = i + 1; j < tmpData.length; j++) {
          if (tmpData[i].lop > tmpData[j].lop) {
            let tmp = tmpData[j];
            tmpData[j] = tmpData[i];
            tmpData[i] = tmp;
          }
        }
      }
    } else {
      for (let i = 0; i < tmpData.length; i++) {
        for (let j = i + 1; j < tmpData.length; j++) {
          if (tmpData[i].lop < tmpData[j].lop) {
            let tmp = tmpData[j];
            tmpData[j] = tmpData[i];
            tmpData[i] = tmp;
          }
        }
      }
    }

    tmpData.forEach((item, index) => {
      item.id = index + 1;
    });

    setData(tmpData);
  };

  const sortMajor = (spData) => {
    let tmpData = spData;
    if (typeSort.az) {
      for (let i = 0; i < tmpData.length; i++) {
        for (let j = i + 1; j < tmpData.length; j++) {
          if (tmpData[i].nghanh > tmpData[j].nghanh) {
            let tmp = tmpData[j];
            tmpData[j] = tmpData[i];
            tmpData[i] = tmp;
          }
        }
      }
    } else {
      for (let i = 0; i < tmpData.length; i++) {
        for (let j = i + 1; j < tmpData.length; j++) {
          if (tmpData[i].nghanh < tmpData[j].nghanh) {
            let tmp = tmpData[j];
            tmpData[j] = tmpData[i];
            tmpData[i] = tmp;
          }
        }
      }
    }

    tmpData.forEach((item, index) => {
      item.id = index + 1;
    });
    setData(tmpData);
  };

  const sortDonvi = (spData) => {
    let tmpData = spData;
    if (typeSort.az) {
      for (let i = 0; i < tmpData.length; i++) {
        for (let j = i + 1; j < tmpData.length; j++) {
          if (tmpData[i].donVi > tmpData[j].donVi) {
            let tmp = tmpData[j];
            tmpData[j] = tmpData[i];
            tmpData[i] = tmp;
          }
        }
      }
    } else {
      for (let i = 0; i < tmpData.length; i++) {
        for (let j = i + 1; j < tmpData.length; j++) {
          if (tmpData[i].donVi < tmpData[j].donVi) {
            let tmp = tmpData[j];
            tmpData[j] = tmpData[i];
            tmpData[i] = tmp;
          }
        }
      }
    }

    tmpData.forEach((item, index) => {
      item.id = index + 1;
    });

    setData(tmpData);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        checkAlready,
        setData,
        setTypeSort,
        checkMssv,
        setClientData,
        setCallApi,
        callApi
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;
