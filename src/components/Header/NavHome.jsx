import React from "react";
import { cx } from ".";
import { Link } from "react-router-dom";
function NavHome({ currentPage, currentLang }) {
  return (
    <li
      key={"home"}
      className={cx("nav__list__item", {
        active: currentPage === "/home",
      })}
    >
      <Link to={"/home"}>{currentLang === "vi" ? "Trang chủ" : "Home"}</Link>
    </li>
  );
}

export default NavHome;
