import classnames from "classnames/bind";
import { useContext, useEffect, useState } from "react";
import {
  BiBell,
  BiMessageAlt,
  BiMailSend,
  BiCaretDown,
  BiSearch,
  BiWindowAlt,
  BiCog,
  BiLogOut,
  BiTask,
  BiGroup,
} from "react-icons/bi";
import TippyHeadless from "@tippyjs/react/headless";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import { logo } from "../../assets/logo";
import style from "./Header.scss";
import SearchContext from "../../store/SearchContext";
import ModalContext from "../../store/ModalContext";
const cx = classnames.bind(style);

function Header() {
  const next = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const [showEmptySeat, setShowEmptySeat] = useState(false);
  const [showSeat, setShowSeat] = useState(false);
  const [showTienIch, setShowTienIch] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [showUserOption, setShowUserOption] = useState(false);
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  const SearchContextt = useContext(SearchContext);
  const ModalContextt = useContext(ModalContext);

  const user = JSON.parse(localStorage.getItem("user"));

  const currentLang = JSON.parse(localStorage.getItem("language"));

  const handleSearch = () => {
    if (searchVal === "") {
      SearchContextt.setIdSeat("empty");
      SearchContextt.setIsSearch(true);
      next("/map");
    } else {
      SearchContextt.setIdSeat(searchVal);
      SearchContextt.setIsSearch(true);
      next("/map");
    }
  };

  useEffect(() => {
    setCurrentPage(window.location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.location.pathname]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const pathName = window.location.pathname;
    if (pathName.toString() !== "/map") {
      setShowSeat(false);
      setShowEmptySeat(false);
      localStorage.setItem("tienIch", JSON.stringify(false));
    }
  }); // tự động xóa tiện ích đã chọn khi ng dùng chuyển trang

  useEffect(() => {
    const ref = document.querySelectorAll(".seat__row.empty");
    if (showEmptySeat) {
      ref.forEach((item) => {
        item.style.backgroundColor = "red";
      });
      localStorage.setItem("tienIch", JSON.stringify(true));
    } else {
      ref.forEach((item) => {
        item.style.backgroundColor = "";
      });
      localStorage.setItem("tienIch", JSON.stringify(false));
    }
  }, [showEmptySeat]);

  useEffect(() => {
    const ref = document.querySelectorAll(".seat__row:not(.empty)");
    const ref2 = document.querySelector(".seat__row.activeSeat"); // Xoa luon cho ngoi vua tim

    if (showSeat) {
      ref.forEach((item) => {
        item.style.backgroundColor = "#008000";
      });
      localStorage.setItem("tienIch", JSON.stringify(true));
    } else {
      ref.forEach((item) => {
        item.style.backgroundColor = "";
      });
      if (ref2) {
        ref2.classList.remove("activeSeat");
      }

      localStorage.setItem("tienIch", JSON.stringify(false));
    }
  }, [showSeat]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    ModalContextt.setShow(true);
    ModalContextt.setType("success");
    ModalContextt.setMess("Đăng xuất thành công!");
    next("/");
  };

  const handleNotify = () => {
    ModalContextt.setShow(true);
    ModalContextt.setType("info");
    ModalContextt.setMess("Coming soon!");
  };

  return (
    <div className={cx("wrapper")}>
      <header className={cx("header")}>
        <div className={cx("header__logo")}>
          <img src={logo} alt="" />
        </div>
        <div className={cx("header__service")}>
          <div className={cx("header__service__item")}>
            <div className={cx("header__service__item__icon")}>
              <BiBell onClick={handleNotify}></BiBell>
              <BiMessageAlt onClick={handleNotify}></BiMessageAlt>
              <BiMailSend onClick={handleNotify}></BiMailSend>
            </div>
          </div>

          {user && (
            <div className={cx("header__service__item")}>
              <TippyHeadless
                interactive
                visible={showUserOption}
                onClickOutside={() => setShowUserOption(!showUserOption)}
                render={(props) => (
                  <div {...props} className={cx("userOption")}>
                    <div className={cx("userOption__item")}>
                      <p onClick={handleNotify}>
                        <BiWindowAlt></BiWindowAlt> Trang cá nhân
                      </p>
                    </div>
                    <div
                      className={cx(
                        "userOption__item userOption__item__border"
                      )}
                    >
                      <p>
                        <Link to={"/userEventManager"}>
                          <BiTask></BiTask>Sự kiện
                        </Link>
                      </p>
                      {user?.isAdmin && (
                        <p>
                          <Link to={"/userManager"}>
                            <BiGroup></BiGroup>Quản lí người dùng
                          </Link>
                        </p>
                      )}

                      <p onClick={handleNotify}>
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
          )}
          {/* <div className={cx("header__service__item")}>
            <div className={cx("header__service__item__avt")}>
              <img
                src="data:image/jpeg;base64,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"
                alt=""
              />
            </div>
          </div> */}
        </div>
      </header>
      <nav className={cx("nav")}>
        <ul className={cx("nav__list")}>
          <li
            className={cx("nav__list__item", {
              active: currentPage === "/home",
            })}
          >
            <Link to={"/home"}>
              {currentLang === "vi" ? "Trang chủ" : "Home"}
            </Link>
          </li>

          {!user && (
            <li
              className={cx("nav__list__item", {
                active: currentPage === "/register",
              })}
            >
              <Link to={"/register"}>
                {currentLang === "vi" ? "Đăng ký" : "Register"}
              </Link>
            </li>
          )}
          {!user && (
            <li
              className={cx("nav__list__item", {
                active: currentPage === "/",
              })}
            >
              <Link to={"/"}>
                {currentLang === "vi" ? "Đăng nhập" : "Login"}
              </Link>
            </li>
          )}

          {user && (
            <li
              className={cx("nav__list__item", {
                active: currentPage === "/map",
              })}
            >
              <Link to={"/map"}>{currentLang === "vi" ? "Bản đồ" : "Map"}</Link>
            </li>
          )}
          <li
            className={cx("nav__list__item tienIch", {
              activeTienIch: currentPage === "/map",
            })}
            onClick={() => setShowTienIch(!showTienIch)}
          >
            <TippyHeadless
              interactive
              visible={showTienIch}
              onClickOutside={() => setShowTienIch(!showTienIch)}
              render={(props) => (
                <div
                  tabIndex="-1"
                  {...props}
                  className={cx("nav__list__item__tienIch")}
                >
                  <Button
                    variant="danger"
                    onClick={() => {
                      setShowEmptySeat(!showEmptySeat);
                    }}
                  >
                    Các ghế còn trống
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => {
                      setShowSeat(!showSeat);
                    }}
                  >
                    Các ghế đã đăng ký
                  </Button>

                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowSeat(false);
                      setShowEmptySeat(false);
                      localStorage.setItem("tienIch", JSON.stringify(false));
                    }}
                  >
                    Xóa tiện ích
                  </Button>
                </div>
              )}
            >
              <div>
                {currentLang === "vi" ? "Tiện ích" : "Convenient"}
                <BiCaretDown></BiCaretDown>
              </div>
            </TippyHeadless>
          </li>

          {user?.isAdmin && (
            <li
              className={cx("nav__list__item", {
                active: currentPage === "/sort",
              })}
            >
              <Link to={"/sortSeat"}>
                {currentLang === "vi" ? "Sắp xếp" : "Sort"}
              </Link>
            </li>
          )}

          {/* {user?.isAdmin && (
            <li
              className={cx("nav__list__item", {
                active: currentPage === "updateGraList",
              })}
              onClick={() => setCurrentPage("updateGraList")}
            >
              <Link to={"/updateGraList"}>
                {currentLang === "vi"
                  ? "Cập nhật danh sách tốt nghiệp"
                  : "Update Graduation List"}
              </Link>
            </li>
          )} */}

          {user && (
            <li
              className={cx("nav__list__item", {
                active: currentPage === "/registerSeat",
              })}
            >
              <Link to={"/registerSeat"}>
                {currentLang === "vi"
                  ? "Đăng kí tham gia sự kiện"
                  : "Register for the event"}
              </Link>
            </li>
          )}

          {(user?.isAdmin || user?.role === "giangVien") && (
            <li
              className={cx("nav__list__item", {
                active: currentPage === "/createEvent",
              })}
            >
              <Link to={"/createEvent"}>
                {currentLang === "vi" ? "Tạo sự kiện" : "Create event"}
              </Link>
            </li>
          )}

          {user?.isAdmin && (
            <li
              className={cx("nav__list__item", {
                active: currentPage === "/eventManager",
              })}
            >
              <Link to={"/eventManager"}>
                {currentLang === "vi" ? "Quản lí sự kiện" : "Event management"}
              </Link>
            </li>
          )}

          <div
            className={cx("nav__list__item language")}
            onClick={() => setShowLang(!showLang)}
          >
            <TippyHeadless
              interactive
              visible={showLang}
              onClickOutside={() => setShowLang(!showLang)}
              render={(props) => (
                <div
                  tabIndex="-1"
                  {...props}
                  className={cx("nav__list__item__tienIch")}
                >
                  <Button
                    variant="success"
                    onClick={() =>
                      localStorage.setItem("language", JSON.stringify("vi"))
                    }
                  >
                    Vietnamese (vi)
                  </Button>
                  <Button
                    variant="success"
                    onClick={() =>
                      localStorage.setItem("language", JSON.stringify("en"))
                    }
                  >
                    English (en)
                  </Button>
                </div>
              )}
            >
              <div>
                {currentLang === "vi" ? "Vietnamese (vi)" : "English (en)"}
                <BiCaretDown></BiCaretDown>
              </div>
            </TippyHeadless>
          </div>
        </ul>
        <div className={cx("nav__search")}>
          <input
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className={cx("nav__search__box")}
            placeholder="Nhập mssv để tìm vị trí"
            spellCheck="false"
          />
          <BiSearch onClick={handleSearch}></BiSearch>
        </div>
      </nav>
    </div>
  );
}

export default Header;
