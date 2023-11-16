import { Link } from "react-router-dom";
import { cx } from ".";

export function NavPosts(props) {
  return (
    <li
      key={"posts"}
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
