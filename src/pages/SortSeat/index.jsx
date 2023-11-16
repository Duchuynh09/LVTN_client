/* eslint-disable array-callback-return */
import classnames from "classnames/bind";
import { useContext, useState, useEffect, useMemo } from "react";
import { Button } from "react-bootstrap";
import { BiSortAZ, BiSortZA } from "react-icons/bi";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Empty, Typography, message } from "antd";
import style from "./SortSeat.scss";
import eventApi from "../../api/eventApi";

const cx = classnames.bind(style);
const listText = [
  "Sắp theo mã số",
  "Sắp theo tên",
  "Sắp theo lớp",
  "Sắp theo đơn vị",
];
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

function SortSeat() {
  const [spData, setSpData] = useState(sampleData);
  const [az, setAz] = useState(true);
  const [listSort, setListSort] = useState([
    { type: "mssv", az: false },
    { type: "lop", az: false },
    { type: "nghanh", az: false },
    { type: "donVi", az: false },
  ]);
  const [optionTitle, setOptionTitle] = useState("Chọn sự kiện");
  const [indexOpSelect, setIndexOpSelect] = useState(0);
  const [optionData, setOptionData] = useState();
  const [idEvent, setIdEvent] = useState();
  function generateUniqueRandomNumbers(n, min, max) {
    if (max - min < n) {
      throw new Error(
        "Khoảng giá trị quá nhỏ để tạo số nguyên ngẫu nhiên duy nhất."
      );
    }
    const uniqueNumbers = new Set();
    while (uniqueNumbers.size < n) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      uniqueNumbers.add(randomNumber);
    }
    return Array.from(uniqueNumbers);
  }
  useEffect(() => {
    const fetchOptionEvent = async () => {
      const res = await eventApi.getEvents();
      if (res.data.length > 0) setOptionData(res.data);
    };
    fetchOptionEvent();
  }, []);
  const refreshSort = (sortDssv) => {
    setListSort(
      listSort.map((item) => {
        if (item.type === sortDssv.type) {
          item = sortDssv;
          return item;
        }
        item = { ...item, az: false };
        return item;
      })
    );
  };
  const handleSelectOption = (event, index) => {
    setOptionTitle(event.name + " ( " + event.date); // title cua su kien duoc chon
    setIndexOpSelect(index);
    refreshSort(event.sortDssv);
    setAz(true);
    if (event.dsDaDangKy.length > 8) {
      const listSortRandom = generateUniqueRandomNumbers(
        8,
        0,
        event.dsDaDangKy.length
      );
      const tmpData = listSortRandom.map((index) => event.dsDaDangKy[index]);
      tmpData.forEach((item, index) => {
        item.id = index + 1;
      });
      setSpData(
        event.dsDaDangKy.length > 8 &&
          listSortRandom.map((index) => event.dsDaDangKy[index])
      );
    }
    setIdEvent(event._id);
  };
  const sortSample = (type, az) => {
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
    setSpData(tmpData);
  };

  const handleSoftList = ({ type, az }) => {
    if (idEvent) {
      sortSample(type, az);
      const softApi = async () => {
        const payload = {
          idEvent: idEvent,
          az: !az,
          type: type,
        };
        const res = await eventApi.softList(payload);
        refreshSort(res.sortDssv);
      };
      softApi();
    } else {
      message.error("Chưa chọn sự kiện");
    }
  };
  return (
    <div className={cx("wrapper")}>
      <Typography.Title level={3} className="text-center mt-3">
        Mẫu sắp xếp cho sự kiện:{" "}
        {optionTitle !== "Chọn sự kiện" && optionTitle + ")"}
      </Typography.Title>
      <div className="d-flex justify-content-end m-4">
        <DropdownButton
          as={ButtonGroup}
          id={`dropdown-variants-Secondary`}
          variant={"secondary"}
          title={
            (optionTitle ||
              (optionData &&
                optionData[0]?.name + " ( " + optionData[0]?.date)) + " ) "
          }
        >
          {optionData ? (
            optionData?.map((item, index) => {
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
            })
          ) : (
            <Empty />
          )}
        </DropdownButton>
      </div>
      <div className="sort-seat">
        <div className="sort-seat__main">
          <ul className="sort-seat__main__list reverse">
            {spData?.map((item) => {
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
            {spData?.map((item) => {
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
        {listSort.map((item, index) => {
          return (
            <Button onClick={() => handleSoftList(item)}>
              {listText[index]}
              {item.az ? <BiSortAZ></BiSortAZ> : <BiSortZA></BiSortZA>}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default SortSeat;
