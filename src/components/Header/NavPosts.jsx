import { Link } from "react-router-dom";
import { cx } from ".";

export function NavPosts(props) {
  return (
    <li
      className={cx("nav__list__item", {
        active: props.currentPage === "/posts",
      })}
    >
      <Link to={"/posts"}>
        {props.currentLang === "vi" ? "Bài đăng" : "Posts"}
      </Link>
    </li>
  );
}
