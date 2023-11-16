import {
  BiCaretDown,
  BiWindowAlt,
  BiCog,
  BiLogOut,
  BiTask,
  BiGroup,
  BiCreditCardFront,
} from "react-icons/bi";
import TippyHeadless from "@tippyjs/react/headless";
import { Link } from "react-router-dom";
import { cx } from ".";
import { useState } from "react";
import { Dropdown } from "antd";
import { ScissorOutlined, TeamOutlined } from "@ant-design/icons";
export function UserActive({ user, handleLogout }) {
  const items = [
    {
      icon: <TeamOutlined />,
      label: <Link to="/sponsors">Quản lý nhà tài trợ</Link>,
      key: "0",
    },
    {
      icon: <ScissorOutlined />,
      label: <Link to="/devices">Quản lý thiết bị</Link>,
      key: "1",
    },
    {
      icon: <BiTask></BiTask>,
      label: <Link to="/eventManager">Quản lý sự kiện</Link>,
      key: "2",
    },
  ];
  const [showUserOption, setShowUserOption] = useState();
  return (
    <div className={cx("header__service__item")} key={"active"}>
      <TippyHeadless
        trigger="click"
        interactive
        visible={showUserOption}
        onClickOutside={() => setShowUserOption(!showUserOption)}
        render={(props) => (
          <div
            {...props}
            className={cx("userOption")}
            // onClick={() => setShowUserOption(!showUserOption)}
          >
            <div className={cx("userOption__item")}>
              <p>
                <Link to={"/profile"}>
                  <BiWindowAlt></BiWindowAlt> Trang cá nhân
                </Link>
              </p>
            </div>
            <div className={cx("userOption__item userOption__item__border")}>
              <p>
                <Link to={"/userEventManager"}>
                  <BiTask></BiTask>Sự kiện
                </Link>
              </p>
              <p>
                <Link to={"/userPostManager"}>
                  <BiCreditCardFront></BiCreditCardFront>Bài đăng
                </Link>
              </p>
              {user?.isAdmin && (
                <p>
                  <Link to={"/userManager"}>
                    <BiGroup></BiGroup>Quản lí người dùng
                  </Link>
                </p>
              )}

              {user?.isAdmin && (
                <p onClick={props.handleNotify}>
                  <Dropdown menu={{ items }} trigger={["click", "hover"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <BiCog />
                      Tùy chọn
                      <BiCaretDown></BiCaretDown>
                    </a>
                  </Dropdown>
                </p>
              )}
            </div>
            <div className={cx("userOption__item")}>
              <p onClick={handleLogout}>
                <BiLogOut></BiLogOut>Thoát
              </p>
            </div>
          </div>
        )}
      >
        <div
          className={cx("header__service__item__name")}
          onClick={() => setShowUserOption(!showUserOption)}
        >
          <span className={cx("user_name")}>{user.email}</span>
          <BiCaretDown></BiCaretDown>
        </div>
      </TippyHeadless>
    </div>
  );
}
