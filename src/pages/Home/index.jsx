import classnames from "classnames/bind";
import { BiRightArrow } from "react-icons/bi";

import style from "./Home.scss";
import { categoryBg } from "../../assets/bg";
import infoLinks from "../../assets/fake-data/infoLinks";

const cx = classnames.bind(style);

function Home() {
  return (
    <div className="wrapper p-4">
      <div className={cx("mt-5")}>
        <div className={cx("head-content")}>
          <h1>Thông tin tốt nghiệp</h1>
          <div className={cx("head-content__line")}></div>
        </div>
        <div className={cx("mt-5")}>
          <img className={cx("categoryBg")} src={categoryBg} alt="" />
        </div>
        <div className={cx("body-content", "mt-5")}>
          <ul>
            {infoLinks.map((e) => (
              <li className="mt-2" key={e.link}>
                <BiRightArrow
                  className={cx("body-content__icon")}
                ></BiRightArrow>
                <a
                  target={"_blank"}
                  className={cx("body-content__link")}
                  href={e.link} rel="noreferrer"
                >
                  {e.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
