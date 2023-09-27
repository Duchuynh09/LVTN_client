import { Link } from "react-router-dom";
import { cx } from ".";

export default function NavLogin({currentPage, currentLang}) {
  return (
    <li
      className={cx("nav__list__item", {
        active: currentPage === "/",
      })}
    >
      <Link to={"/"}>{currentLang === "vi" ? "Đăng nhập" : "Login"}</Link>
    </li>
  );
}
