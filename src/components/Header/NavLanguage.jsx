import { BiCaretDown } from "react-icons/bi";
import TippyHeadless from "@tippyjs/react/headless";
import { Button } from "react-bootstrap";
import { cx } from ".";

export function NavLanguage(props) {
  return (
    <div
      className={cx("nav__list__item language")}
      onClick={() => props.setShowLang(!props.showLang)}
    >
      <TippyHeadless
        interactive
        visible={props.showLang}
        onClickOutside={() => props.setShowLang(!props.showLang)}
        render={(props) => (
          <div
            tabIndex="-1"
            {...props}
            className={cx("nav__list__item__tienIch")}
          >
            <Button
              variant="success"
              onClick={() =>
                localStorage.setItem("language", JSON.stringify("vi"))
              }
            >
              Vietnamese (vi)
            </Button>
            <Button
              variant="success"
              onClick={() =>
                localStorage.setItem("language", JSON.stringify("en"))
              }
            >
              English (en)
            </Button>
          </div>
        )}
      >
        <div>
          {props.currentLang === "vi" ? "Vietnamese (vi)" : "English (en)"}
          <BiCaretDown></BiCaretDown>
        </div>
      </TippyHeadless>
    </div>
  );
}
