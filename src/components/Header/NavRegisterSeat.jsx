import { Link } from "react-router-dom";
import { cx } from ".";

export function NavRegisterSeat(props) {
  return (
    <li
      key={"registerSeat"}
      className={cx("nav__list__item", {
        active: props.currentPage === "/registerSeat",
      })}
    >
      <Link to={"/registerSeat"}>
        {props.currentLang === "vi" ? "Tham gia sự kiện" : "Join events"}
      </Link>
    </li>
  );
}
