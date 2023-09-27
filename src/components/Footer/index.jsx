import { BiBookmark, BiMailSend } from "react-icons/bi";
import {
  RiFacebookCircleFill,
  RiInstagramLine,
  RiYoutubeLine,
  RiLinkedinBoxFill,
} from "react-icons/ri";
import classnames from "classnames/bind";

import style from "./Footer.scss";
const cx = classnames.bind(style);

function Footer() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("footer")}>
        <div className={cx("footer__contact")}>
          <div className={cx("footer__contact__item")}>
            <BiBookmark></BiBookmark>
            <a
              href="https://helpdesk.ctu.edu.vn"
              target={"_blank"}
              rel="noreferrer"
            >
              https://helpdesk.ctu.edu.vn
            </a>
          </div>
          <div className={cx("footer__contact__item")}>
            <BiMailSend></BiMailSend>
            <a href="mailto:helpdesk.ctu.edu.vn">helpdesk.ctu.edu.vn</a>
          </div>
        </div>
        <div className={cx("footer__icon")}>
          <ul className={cx("footer__icon__list")}>
            <li className={cx("footer__icon__list__item")}>
              <RiFacebookCircleFill></RiFacebookCircleFill>
            </li>
            <li className={cx("footer__icon__list__item")}>
              <RiInstagramLine></RiInstagramLine>
            </li>
            <li className={cx("footer__icon__list__item")}>
              <RiYoutubeLine></RiYoutubeLine>
            </li>
            <li className={cx("footer__icon__list__item")}>
              <RiLinkedinBoxFill></RiLinkedinBoxFill>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
