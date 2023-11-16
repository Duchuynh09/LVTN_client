import { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import SearchContext from "../../store/SearchContext";
import ModalContext from "../../store/ModalContext";
import DataContext from "../../store/DataContext";
import style from "./Map.scss";
import eventApi from "../../api/eventApi";
import SeatContainer from "../../components/SeatContainer";
import { Spin } from "antd";

const cx = classNames.bind(style);

function Map() {
  const DataContextt = useContext(DataContext);
  const SearchContextt = useContext(SearchContext);
  const ModalContextt = useContext(ModalContext);
  let idsv = SearchContextt.idSeat;
  const [optionTitle, setOptionTitle] = useState();
  const [indexOpSelect, setIndexOpSelect] = useState(0);
  const [optionData, setOptionData] = useState();
  const [optionState, setOptionState] = useState();
  useEffect(() => {
    const fetchOptionEvent = async () => {
      const res = await eventApi.getEvents();
      setOptionData(res.data);
      // vua dki xong la cho ngoi se duoc cap nhat ngay
    };
    fetchOptionEvent();
  }, []);
  useEffect(() => {
    const fetchEventApiById = async () => {
      if (optionState) {
        const respone = await eventApi.getDssvDaDangKy(optionState?._id);
        DataContextt.setData(respone.data);
      }
    };
    fetchEventApiById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionTitle]);
  useEffect(() => {
    if (SearchContextt.isSearch) {
      if (!optionState) {
        // từ trang khác sang phải chọn lại sự kiện
        ModalContextt.setMess("Vui lòng chọn sự kiện mà bạn muốn tìm!");
        ModalContextt.setType("danger");
        ModalContextt.setShow(!ModalContextt.show);
      }
      const fetchEventApiById = async () => {
        if (optionState || optionData) {
          const respone = await eventApi.getDssvDaDangKy(
            optionState?._id || (optionData && optionData[0]._id)
          );

          DataContextt.setData(respone.data);
          for (let index = 0; index < respone.data.length; index++) {
            if (
              respone.data[index].mssv.toString().toUpperCase() ===
              idsv.toString().toUpperCase()
            ) {
              const sv = document.querySelector(
                `#${idsv.toString().toUpperCase()}`
              );

              if (sv) {
                setTimeout(() => {
                  if (document.querySelector(".activeSeat")) {
                    document
                      .querySelector(".activeSeat")
                      .classList.remove("activeSeat");
                  }
                  document
                    .querySelector(`#${idsv.toString().toUpperCase()}`)
                    ?.classList.add("activeSeat");
                }, 500); // tránh render quá nhanh mất class

                ModalContextt.setMess(
                  `Vị trí ghế ngồi tạm thời của bạn là ${sv.firstElementChild.attributes.name.value} (Bạn vui lòng quay lại kiểm tra vào 2 ngày tới)`
                );
                ModalContextt.setType("success");
                ModalContextt.setShow(!ModalContextt.show);
                return;
              }
            } else if (idsv === "empty") {
              ModalContextt.setMess(
                "Vui lòng nhập mã số sinh viên của bạn để tìm kiếm ghế ngồi!"
              );
              ModalContextt.setType("danger");
              ModalContextt.setShow(!ModalContextt.show);
            } else if (idsv === undefined) {
            } else {
              ModalContextt.setMess(
                "Không tìm thấy ghế ngồi! (Vui lòng kiểm tra lại mã sinh viên hoặc refresh lại website!)"
              );
              ModalContextt.setType("info");
              ModalContextt.setShow(!ModalContextt.show);
            }
          }
        }
      };
      fetchEventApiById();

      SearchContextt.setIsSearch(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SearchContextt.isSearch]);
  useEffect(() => {
    if (!optionTitle) {
      DataContextt.setData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionTitle]);
  const handleSelectOption = (item, index) => {
    if (JSON.parse(localStorage.getItem("tienIch"))) {
      ModalContextt.setShow(true);
      ModalContextt.setType("info");
      ModalContextt.setMess("Vui lòng bỏ chọn tiện ích!");
    } else {
      setOptionTitle(`${item.name} ( ${item.time} ${item.date} )`); // title cua su kien duoc chon
      setIndexOpSelect(index);
      setOptionState(item);
      DataContextt.setIdEvent(item._id);
    }
  };
  return (
    <div className="wrapper">
      <h2 className="mt-5 text-center">SƠ ĐỒ HỘI TRƯỜNG RÙA</h2>
      <div className="d-flex justify-content-end m-4">
        <DropdownButton
          as={ButtonGroup}
          id={`dropdown-variants-Secondary`}
          variant={"secondary"}
          title={optionTitle || "Chọn sự kiện"}
        >
          {optionData?.map((item, index) => {
            if (index === indexOpSelect) {
              return (
                <Dropdown.Item
                  key={item._id}
                  active
                  onClick={() => handleSelectOption(item, index)}
                >
                  {item.name + " ( " + item.time + " " + item.date + " ) "}
                </Dropdown.Item>
              );
            } else {
              return (
                <Dropdown.Item
                  key={item._id}
                  onClick={() => handleSelectOption(item, index)}
                >
                  {item.name + " ( " + item.time + " " + item.date + " ) "}
                </Dropdown.Item>
              );
            }
          })}
        </DropdownButton>
      </div>
      <SeatContainer></SeatContainer>
      <div className={cx("map-mobile")}>
        <img
          src="https://2.bp.blogspot.com/-5x7mA-I6gDA/XDBsvamqakI/AAAAAAAAHMs/cn7vjxYPqxY3cD8kSY6CHtdxEcmgDXBawCLcBGAs/s1600/ch%25E1%25BB%2597%2Bng%25E1%25BB%2593i%2B%25282%2529.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Map;
