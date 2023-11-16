import { useEffect, useState } from "react";
import { AutoComplete, Col } from "antd";
import { BiSearch } from "react-icons/bi";
import userApi from "../../api/userApi";
import { cx } from ".";
export function NavSearch(props) {
  // const [dataSet, setDataSet] = useState();
  // useEffect(() => {
  //   const getIdUser = async () => {
  //     const { arrIdUsers } = await userApi.getAllIdUser();
  //     console.log(arrIdUsers);
  //     setDataSet(arrIdUsers);
  //   };
  //   getIdUser();
  // }, []);
  // // const onSelect = (data) => {
  // //   console.log("onSelect", data);
  // // };
  // const handleSearch = (e) => {
  //   // console.log(e);
  //   // props.setSearchVal(e.target.value);
  // };
  return (
    <div className={cx("nav__search")} key={'search'}>
      <input
        type="text"
        className={cx("nav__search__box")}
        value={props.searchVal}
        onChange={(e) => props.setSearchVal(e.target.value)}
        placeholder="Nhập mssv để tìm vị trí"
        spellCheck="false"
      />
      <BiSearch onClick={props.handleSearch}></BiSearch>
    </div>
  );
}
