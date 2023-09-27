import { BiCaretDown } from "react-icons/bi";
import TippyHeadless from "@tippyjs/react/headless";
import { Button } from "react-bootstrap";
import { cx } from ".";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { logo } from "../../assets/logo";
import { message } from "antd";

export default function NavTienIch(props) {
  const [showEmptySeat, setShowEmptySeat] = useState(false);
  const [showSeat, setShowSeat] = useState(false);
  const [showTienIch, setShowTienIch] = useState(false);

  const location = useLocation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const pathName = location.pathname;
    if (pathName.toString() !== "/map") {
      setShowSeat(false);
      setShowEmptySeat(false);
      localStorage.setItem("tienIch", JSON.stringify(false));
    }
  }, [location.pathname]); // tự động xóa tiện ích đã chọn khi ng dùng chuyển trang

  useEffect(() => {
    const ref = document.querySelectorAll(".seat__row:not(.empty)");
    const ref2 = document.querySelector(".seat__row.activeSeat"); // Xoa luon cho ngoi vua tim

    if (showSeat) {
      if (ref.length === 0) {
        message.error("Chưa có ghế nào có người ngồi");
      } else {
        ref.forEach((item) => {
          item.style.backgroundColor = "#008000";
        });
      }
      localStorage.setItem("tienIch", JSON.stringify(true));
    } else {
      ref.forEach((item) => {
        item.style.backgroundColor = "";
      });
      if (ref2) {
        ref2.classList.remove("activeSeat");
      }
      localStorage.setItem("tienIch", JSON.stringify(false));
    }
  }, [showSeat]);

  // Tìm chổ ngồi trống
  useEffect(() => {
    const ref = document.querySelectorAll(".seat__row.empty");
    if (showEmptySeat) {
      if (ref.length === 0) {
        message.success("Không còn ghế nào trống");
      } else {
        ref.forEach((item) => {
          item.style.backgroundColor = "red";
        });
      }
      localStorage.setItem("tienIch", JSON.stringify(true));
    } else {
      ref.forEach((item) => {
        item.style.backgroundColor = "";
      });
      localStorage.setItem("tienIch", JSON.stringify(false));
    }
  }, [showEmptySeat]);
  return (
    <li
      className={cx("nav__list__item tienIch", {
        activeTienIch: props.currentPage === "/map",
      })}
      onClick={() => setShowTienIch(!showTienIch)}
    >
      {/* Chọn tiện tích (xem ghế trống hay hông) */}
      <TippyHeadless
        interactive
        visible={showTienIch}
        onClickOutside={() => setShowTienIch(!showTienIch)}
        render={(props) => (
          <div
            tabIndex="-1"
            {...props}
            className={cx("nav__list__item__tienIch")}
          >
            <Button
              variant="danger"
              onClick={() => {
                setShowEmptySeat(!showEmptySeat);
              }}
            >
              Các ghế còn trống
            </Button>
            <Button
              variant="success"
              onClick={() => {
                setShowSeat(!showSeat);
              }}
            >
              Các ghế đã đăng ký
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                setShowSeat(false);
                setShowEmptySeat(false);
                localStorage.setItem("tienIch", JSON.stringify(false));
              }}
            >
              Xóa tiện ích
            </Button>
          </div>
        )}
      >
        <div>
          {props.currentLang === "vi" ? "Tiện ích" : "Convenient"}
          <BiCaretDown ></BiCaretDown>
        </div>
      </TippyHeadless>
    </li>
  );
}
