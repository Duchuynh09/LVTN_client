import classnames from "classnames/bind";
import { useCallback, useContext, useEffect, useState } from "react";
import { BiBell, BiMessageAlt, BiMailSend } from "react-icons/bi";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";

import { logo } from "../../assets/logo";
import style from "./Header.scss";
import SearchContext from "../../store/SearchContext";
import ModalContext from "../../store/ModalContext";

import NavHome from "./NavHome";
import NavRegister from "./NavRegister";
import NavLogin from "./NavLogin";
import NavTienIch from "./NavTienIch";
// Lười sửa lại expot default
import { NavSearch } from "./NavSearch";
import { NavLanguage } from "./NavLanguage";
import { NavRegisterSeat } from "./NavRegisterSeat";
import { NavCreatEnvent } from "./NavCreatEnvent";
import { NavMap } from "./NavMap";
import { NavPosts } from "./NavPosts";
import { UserActive } from "./UserActive";
export const cx = classnames.bind(style);

/*
Tồn tại user mà sang trang login admin thì sao ????

Nếu không tồn tại user thì header sé là Home,Login,Register,Language
*/
function Header({ user }) {
  const next = useNavigate();
  const [searchVal, setSearchVal] = useState("");
  const [showLang, setShowLang] = useState(false);
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  const SearchContextt = useContext(SearchContext);
  const ModalContextt = useContext(ModalContext);
  const params = useParams();
  const location = useLocation();
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
    setCurrentPage(location.pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleLogout = useCallback(() => {
    document.cookie = `id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    localStorage.removeItem("user");
    next("/");
  }, [next]);

  const handleNotify = () => {
    ModalContextt.setShow(true);
    ModalContextt.setType("info");
    ModalContextt.setMess("Coming soon!");
  };
  useEffect(() => {
    try {
      const id = document.cookie
        .split("; ")
        .find((row) => row.startsWith("id="))
        .split("=")[1];
    } catch (error) {
      if (user) handleLogout();
    }
  }, [handleLogout, user]);
  return (
    <div className={cx("wrapper")}>
      <header className={cx("header")}>
        <div className={cx("header__logo")}>
          <img src={logo} alt="" />
        </div>
        {/* Dòng User Active */}
        <div className={cx("header__service")}>
          <div className={cx("header__service__item")}>
            <div className={cx("header__service__item__icon")}>
              <BiBell onClick={handleNotify}></BiBell>
              <BiMessageAlt onClick={handleNotify}></BiMessageAlt>
              <BiMailSend onClick={handleNotify}></BiMailSend>
            </div>
          </div>
          {/* Quản lí của người dùng */}
          {user && <UserActive user={user} handleLogout={handleLogout} />}
          {/* <div className={cx("header__service__item")}>
            <div className={cx("header__service__item__avt")}>
              
            </div>
          </div> */}
        </div>
      </header>
      <nav className={cx("nav")}>
        <ul className={cx("nav__list")}>
          <NavHome
            key={"navHome"}
            currentLang={currentLang}
            currentPage={currentPage}
          />
          <NavPosts currentLang={currentLang} currentPage={currentPage} />
          {!user && [
            <NavRegister
              key={"register"}
              currentPage={currentPage}
              currentLang={currentLang}
            />,
            <NavLogin
              key={"login"}
              currentPage={currentPage}
              currentLang={currentLang}
            />,
          ]}
          {user && (
            <NavMap currentPage={currentPage} currentLang={currentLang} />
          )}
          <NavTienIch currentPage={currentPage} currentLang={currentLang} />
          {/* Sắp xếp */}
          {user?.isAdmin && (
            <li
              key={"sort"}
              className={cx("nav__list__item", {
                active: currentPage === "/sort",
              })}
            >
              <Link to={"/sortSeat"}>
                {currentLang === "vi" ? "Sắp xếp" : "Sort"}
              </Link>
            </li>
          )}
          {user && (
            <NavRegisterSeat
              currentPage={currentPage}
              currentLang={currentLang}
            />
          )}
          {!params.login && (user?.isAdmin || user?.role === "giangVien") && (
            <NavCreatEnvent
              currentPage={currentPage}
              currentLang={currentLang}
            />
          )}
          {user?.isAdmin && (
            <li
              key={"eventManager"}
              className={cx("nav__list__item", {
                active: currentPage === "/eventManager",
              })}
            >
              <Link to={"/eventManager"}>
                {currentLang === "vi" ? "Quản lí sự kiện" : "Event management"}
              </Link>
            </li>
          )}
          <NavLanguage
            showLang={showLang}
            setShowLang={setShowLang}
            currentLang={currentLang}
          />
        </ul>
        <NavSearch
          searchVal={searchVal}
          setSearchVal={setSearchVal}
          handleSearch={handleSearch}
        />
      </nav>
    </div>
  );
}

export default Header;
