import { Link } from "react-router-dom";
import { cx } from ".";

export function NavMap(props) {
  return (
    <li
      className={cx("nav__list__item", {
        active: props.currentPage === "/map",
      })}
    >
      <Link to={"/map"}>{props.currentLang === "vi" ? "Bản đồ" : "Map"}</Link>
    </li>
  );
}
