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

export function UserActive({ user, handleLogout }) {
  const [showUserOption, setShowUserOption] = useState();
  return (
    <div className={cx("header__service__item")}>
      <TippyHeadless
        interactive
        visible={showUserOption}
        onClickOutside={() => setShowUserOption(!showUserOption)}
        render={(props) => (
          <div
            {...props}
            className={cx("userOption")}
            onClick={() => setShowUserOption(!showUserOption)}
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
              {props.user?.isAdmin && (
                <p>
                  <Link to={"/userManager"}>
                    <BiGroup></BiGroup>Quản lí người dùng
                  </Link>
                </p>
              )}

              <p onClick={props.handleNotify}>
                <BiCog></BiCog>Tùy chọn
              </p>
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
