import { Select } from "antd";
import React, { forwardRef } from "react";
import { Form } from "react-bootstrap";
import style from "./SelectDepartment.scss";
import classnames from "classnames/bind";
const cx = classnames.bind(style);

function SelectAntd(props, ref) {
  return (
    <Select
      ref={ref}
      bordered={props.bordered}
      defaultValue={"no"}
      options={[
        { value: "no", label: "Chọn đơn vị" },
        {
          value: "CA",
          label: "Viện Nghiên cứu Phát triển Đồng bằng sông Cửu Long",
        },
        {
          value: "DA",
          label: "Viện Công nghệ Sinh học và Thực phẩm",
        },
        {
          value: "DI",
          label: "Trường Công nghệ Thông tin và Truyền thông",
        },
        {
          value: "KT",
          label: "Trường Kinh tế",
        },
        {
          value: "NN",
          label: "Trường Nông nghiệp",
        },
        {
          value: "FL",
          label: "Khoa Ngoại ngữ",
        },
        {
          value: "HG",
          label: "Khoa Phát triển Nông thôn",
        },
        {
          value: "KH",
          label: "Khoa Khoa học Tự nhiên",
        },
        {
          value: "LK",
          label: "Khoa Luật",
        },
        {
          value: "ML",
          label: "Khoa Khoa học Chính trị",
        },
        {
          value: "MT",
          label: "Khoa Môi trường và Tài nguyên Thiên nhiên",
        },
        {
          value: "SP",
          label: "Khoa Sư phạm",
        },
        {
          value: "TD",
          label: "Khoa Giáo dục Thể chất",
        },
        {
          value: "XH",
          label: "Khoa Khoa học Xã hội và Nhân văn",
        },
      ]}
    />
  );
}
// React Booststrap
function SelectDepartment({ bordered }, ref) {
  return (
    <Form.Select
      ref={ref}
      className={cx("mb-3", { bordered: !bordered })}
      aria-label="Default select example"
      disabled={!bordered}
    >
      <option value="no">Chọn đơn vị</option>
      <option value="CA">
        Viện Nghiên cứu Phát triển Đồng bằng sông Cửu Long
      </option>
      <option value="DA">Viện Công nghệ Sinh học và Thực phẩm</option>
      <option value="DI">Trường Công nghệ Thông tin và Truyền thông</option>
      <option value="KT">Trường Kinh tế</option>
      <option value="NN">Trường Nông nghiệp</option>
      <option value="TN">Trường Bách Khoa</option>
      <option value="TS">Trường Thủy sản</option>
      <option value="FL">Khoa Ngoại ngữ</option>
      <option value="HG">Khoa Phát triển Nông thôn</option>
      <option value="KH">Khoa Khoa học Tự nhiên</option>
      <option value="LK">Khoa Luật</option>
      <option value="ML">Khoa Khoa học Chính trị</option>
      <option value="MT">Khoa Môi trường và Tài nguyên Thiên nhiên</option>
      <option value="SP">Khoa Sư phạm</option>
      <option value="TD">Khoa môn Giáo dục Thể chất</option>
      <option value="XH">Khoa Khoa học Xã hội và Nhân văn</option>
    </Form.Select>
  );
}

export default forwardRef(SelectDepartment);
