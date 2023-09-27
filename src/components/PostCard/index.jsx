// import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import { Avatar, Dropdown } from "antd";
import { noneImage } from "../../assets/logo";
import classnames from "classnames/bind";
import style from "./Card.scss";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import postsApi from "../../api/postsApi";
import { useStore, action } from "../../store";
import ModalContext from "../../store/ModalContext";
const cx = classnames.bind(style);

export default function Card({ id, edit, ...props }) {
  const [timeAgo, setTimeAgo] = useState("");
  const ModalContextt = useContext(ModalContext);
  const [state, dispatch] = useStore();
  const [showUserOption, setShowUserOption] = useState(false);
  const reset = useCallback(async () => {
    const posts = await postsApi.getAllPost();
    dispatch(action.fetchPosts(posts));
  }, [dispatch]);
  const getAgoTime = useCallback(() => {
    const createdAtDate = new Date(props.date);
    const now = new Date();
    const total = (now.getTime() - createdAtDate.getTime()) / 86400000;
    setTimeAgo(
      total < 1
        ? Math.round(total * 24) + " giờ trước"
        : Math.round(total) + " ngày trước"
    );
  }, [props.date]);

  const items = [
    {
      label: "Xóa",
      key: "delete",
    },
    {
      label: "Chỉnh sửa",
      key: "edit",
    },
  ];
  const handleNotify = () => {
    ModalContextt.setShow(true);
    ModalContextt.setType("info");
    ModalContextt.setMess("Coming soon!");
  };
  const deletePost = async () => {
    await postsApi.deletePost(id);
    reset();
  };
  const handleMenuClick = (e) => {
    switch (e.key) {
      case "delete":
        deletePost();
        break;
      case "edit":
        handleNotify();
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    getAgoTime();
  }, [getAgoTime]);
  return (
    <div className={cx("card")}>
      <div className="card-header" onClick={props.Click}>
        <Avatar size={"small"} className="profile" src={noneImage} />
        <div className="card-title-group">
          <h5 className="card-title">{props.author}</h5>
          <div className="card-date">{timeAgo}</div>
        </div>
      </div>

      {edit && (
        <div
          className={cx("card__extra__icon")}
          onClick={() => setShowUserOption(!showUserOption)}
        >
          <Dropdown
            className="card-features"
            menu={{ items, onClick: handleMenuClick }}
            placement={"bottomRight"}
            trigger={["click"]}
          >
            {<BiDotsHorizontalRounded></BiDotsHorizontalRounded>}
          </Dropdown>
        </div>
      )}
      <div className="card-text" onClick={props.Click}>
        {props.title}
      </div>
      {props.img && (
        <img
          onClick={props.Click}
          className="card-image"
          src={"http://localhost:5000/" + props.img.filename}
          alt="logo"
        />
      )}
    </div>
  );
}
