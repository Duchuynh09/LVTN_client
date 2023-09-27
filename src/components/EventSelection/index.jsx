import React, { useState, useEffect } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import eventApi from "../../api/eventApi";

function EventSelection({ handleSelectOption, optionTitle, indexOpSelect }) {
  const [optionData, setOptionData] = useState();
  const hanleOnchange = (e) => {
    console.log(e);
  };
  useEffect(() => {
    const fetchOptionEvent = async () => {
      const res = await eventApi.getEvents();

      setOptionData(res.data);
    };
    fetchOptionEvent();
  }, []);
  return (
    <DropdownButton
      as={ButtonGroup}
      id={`dropdown-variants-Secondary`}
      variant={"dark"}
      title={optionTitle || "Chọn sự kiện"}
      className="w-100"
      onChange={hanleOnchange}
    >
      {optionData?.map((item, index) => {
        if (index === indexOpSelect) {
          return (
            <Dropdown.Item
              key={item._id}
              active
              onClick={() => {
                handleSelectOption(item, index);
                hanleOnchange(item);
              }}
            >
              {item.name + " ( " + item.time + " " + item.date + " ) "}
            </Dropdown.Item>
          );
        } else {
          return (
            <Dropdown.Item
              key={item._id}
              onClick={() => {
                handleSelectOption(item, index);
                hanleOnchange(item);
              }}
            >
              {item.name + " ( " + item.time + " " + item.date + " ) "}
            </Dropdown.Item>
          );
        }
      })}
    </DropdownButton>
  );
}

export default EventSelection;
