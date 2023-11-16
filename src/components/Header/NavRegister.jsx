import { Link } from "react-router-dom";
import { cx } from ".";

function NavRegister({ currentPage, currentLang }) {
  return (
    <li
      key={"register"}
      className={cx("nav__list__item", {
        active: currentPage === "/register",
      })}
    >
      <Link to={"/register"}>
        {currentLang === "vi" ? "Đăng ký" : "Register"}
      </Link>
    </li>
  );
}
export default NavRegister;
