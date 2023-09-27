/* eslint-disable array-callback-return */
import classnames from "classnames/bind";
import { useContext, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { BiSortAZ, BiSortZA } from "react-icons/bi";
import DataContext from "../../store/DataContext";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import style from "./SortSeat.scss";
import eventApi from "../../api/eventApi";
const cx = classnames.bind(style);

function SortSeat() {
  const sampleData = [
    {
      id: 1,
      donVi: "DA",
      mssv: "B1803813",
      ten: "Phan Kim Ngân",
      ngaySinh: "03/10/2000",
      lop: "DA1866A3",
      nghanh: "Công nghệ sinh học",
    },
    {
      id: 2,
      donVi: "DA",
      mssv: "B1803855",
      ten: "Đoàn Thị Thơm",
      ngaySinh: "24/06/2000",
      lop: "DA1866A3",
      nghanh: "Công nghệ sinh học",
    },
    {
      id: 3,
      donVi: "DI",
      mssv: "B1609764",
      ten: "Nguyễn Khánh Duy",
      ngaySinh: "07/05/1998",
      lop: "DI16Z6A1",
      nghanh: "Khoa học máy tính",
    },
    {
      id: 4,
      donVi: "DI",
      mssv: "B1609800",
      ten: "Tô Thanh Tịnh",
      ngaySinh: "08/05/1998",
      lop: "DI16Z6A1",
      nghanh: "Khoa học máy tính",
    },
    {
      id: 5,
      donVi: "FL",
      mssv: "B1812429",
      ten: "Lâm Vịnh Nghi",
      ngaySinh: "01/01/2000",
      lop: "FL18Z9A1",
      nghanh: "Ngôn ngữ Pháp",
    },
    {
      id: 6,
      donVi: "HG",
      mssv: "B1801231",
      ten: "Lê Thị Kiều Ngân",
      ngaySinh: "28/01/2000",
      lop: "HG18V2A1",
      nghanh: "Nông học",
    },
    {
      id: 7,
      donVi: "KT",
      mssv: "B1701564",
      ten: "Trần Thanh Tùng",
      ngaySinh: "18/04/1997",
      lop: "KT1722A2",
      nghanh: "Quản trị kinh doanh",
    },
    {
      id: 8,
      donVi: "KT",
      mssv: "B1810172",
      ten: "Phạm Thị Diệu Hiền",
      ngaySinh: "22/05/2000",
      lop: "KT18W2A1",
      nghanh: "Quản trị dịch vụ du lịch và lữ hành",
    },
  ];

  const [spData, setSpData] = useState(sampleData);
  const [az, setAz] = useState(true);
  const DataContextt = useContext(DataContext);

  const [optionTitle, setOptionTitle] = useState();
  const [indexOpSelect, setIndexOpSelect] = useState(0);
  const [optionData, setOptionData] = useState();

  useEffect(() => {
    const fetchOptionEvent = async () => {
      const res = await eventApi.getEvents();
      setOptionData(res.data);
    };
    fetchOptionEvent();
  }, []);
  const handleSelectOption = (item, index) => {
    setOptionTitle(item.name + " ( " + item.date); // title cua su kien duoc chon
    setIndexOpSelect(index);
    DataContextt.setIdEvent(item._id);
    setSpData(item.dsDaDangKy);
  };

  const sortSample = (type) => {
    let tmpData = spData;
    if (az) {
      for (let i = 0; i < tmpData.length; i++) {
        for (let j = i + 1; j < tmpData.length; j++) {
          if (tmpData[i][type] > tmpData[j][type]) {
            let tmp = tmpData[j];
            tmpData[j] = tmpData[i];
            tmpData[i] = tmp;
          }
        }
      }
    } else {
      for (let i = 0; i < tmpData.length; i++) {
        for (let j = i + 1; j < tmpData.length; j++) {
          if (tmpData[i][type] < tmpData[j][type]) {
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

    setAz(!az);
    setSpData(tmpData);
  };

  const handleSoftList = (type) => {
    sortSample(type);

    const softApi = async () => {
      const payload = {
        idEvent: DataContextt.idEvent,
        az,
        type,
      };
      const res = await eventApi.softList(payload);
      console.log(res.state);
    };
    softApi();
  };

  return (
    <div className={cx("wrapper")}>
      <div className="d-flex justify-content-end m-4">
        <DropdownButton
          as={ButtonGroup}
          id={`dropdown-variants-Secondary`}
          variant={"secondary"}
          title={
            (optionTitle ||
              (optionData &&
                optionData[0]?.name + " ( " + optionData[0]?.date)) + " ) " ||
            ""
          }
        >
          {optionData?.map((item, index) => {
            if (index === indexOpSelect) {
              return (
                <Dropdown.Item
                  key={item._id}
                  active
                  onClick={() => handleSelectOption(item, index)}
                >
                  {item.name + " ( " + item.date + " ) "}
                </Dropdown.Item>
              );
            } else {
              return (
                <Dropdown.Item
                  key={item._id}
                  onClick={() => handleSelectOption(item, index)}
                >
                  {item.name + " ( " + item.date + " ) "}
                </Dropdown.Item>
              );
            }
          })}
        </DropdownButton>
      </div>
      <div className="sort-seat">
        <div className="sort-seat__main">
          <ul className="sort-seat__main__list reverse">
            {spData.map((item) => {
              // Đổi điều kiện lại
              if ((item.id ? item.id : item.mssv.slice(-1)) % 2 > 0) {
                return (
                  <li key={item.mssv}>
                    <p className={cx("text-center")}>Vị trí {item.id}</p>
                    <p>Mssv: {item.mssv}</p>
                    <p>Tên: {item.ten}</p>
                    <p>Lớp: {item.lop}</p>
                    <p>Nghành: {item.nghanh}</p>
                    <p>Đơn vị: {item.donVi}</p>
                  </li>
                );
              }
            })}
          </ul>
          <div className="sort-seat__main__space text-center">B</div>
          <ul className="sort-seat__main__list">
            {spData.map((item) => {
              if ((item.id ? item.id : item.mssv.slice(-1)) % 2 === 0) {
                return (
                  <li key={item.mssv}>
                    <p className={cx("text-center")}>Vị trí {item.id}</p>
                    <p>Mssv: {item.mssv}</p>
                    <p>Tên: {item.ten}</p>
                    <p>Lớp: {item.lop}</p>
                    <p>Nghành: {item.nghanh}</p>
                    <p>Đơn vị: {item.donVi}</p>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
      <div className="sort-seat__control">
        <Button onClick={() => handleSoftList("mssv")}>
          Sắp theo mã số đinh viên
          {az ? <BiSortAZ></BiSortAZ> : <BiSortZA></BiSortZA>}
        </Button>

        <Button onClick={() => handleSoftList("lop")}>
          Sắp theo lớp {az ? <BiSortAZ></BiSortAZ> : <BiSortZA></BiSortZA>}
        </Button>

        <Button onClick={() => handleSoftList("nghanh")}>
          Sắp theo nghành {az ? <BiSortAZ></BiSortAZ> : <BiSortZA></BiSortZA>}
        </Button>

        <Button onClick={() => handleSoftList("maDonVi")}>
          Sắp theo đơn vị {az ? <BiSortAZ></BiSortAZ> : <BiSortZA></BiSortZA>}
        </Button>
      </div>
    </div>
  );
}

export default SortSeat;
