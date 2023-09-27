import { Link } from "react-router-dom";
import { cx } from ".";

export function NavCreatEnvent(props) {
  return (
    <li
      className={cx("nav__list__item", {
        active: props.currentPage === "/createEvent",
      })}
    >
      <Link to={"/createEvent"}>
        {props.currentLang === "vi" ? "Tạo sự kiện" : "Create event"}
      </Link>
    </li>
  );
}
