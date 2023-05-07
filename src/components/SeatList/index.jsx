import classNames from "classnames/bind";

import style from "./SeatList.scss";

const cx = classNames.bind(style);

function SeatList({ Array, nameArray = "" }) {
  const tmpArray = []; 
  
    for (let index = 0; index < Array[0]; index++) {
      if (Array[index + 1]) {
        tmpArray.push(Array[index + 1].mssv);
      } else {
        tmpArray.push(undefined);
      }
    }
  return (
    <div className={cx("seat-container__list")}>
      <div className={cx("seat-container__list__item", "reverse")}>
        {/* eslint-disable-next-line array-callback-return */}
        {tmpArray.map((item, i) => {
          let empty = undefined;
          if (!item) {
            empty = "empty";
          } // nếu item = undefine thì cho nó class là empty

          let index = i + 1;
          if (index % 2 > 0 && index < Array[0]) {
            return (
              <div id={item} className={cx("seat__row", empty)} key={index}>
                <span
                  className={cx("seat__row__item")}
                  name={nameArray + index}
                >
                  {index}
                </span>
              </div>
            );
          }
        })}
      </div>
      <div className={cx("seat-container__list__space")}>{nameArray}</div>
      <div className={cx("seat-container__list__item")}>
        {/* eslint-disable-next-line array-callback-return */}
        {tmpArray.map((item, i) => {
          let empty = undefined;
          if (!item) {
            empty = "empty";
          } // nếu item = undefine thì cho nó class là empty

          let index = i + 1;
          if (index % 2 === 0) {
            return (
              <div id={item} className={cx("seat__row", empty)} key={index}>
                <span
                  className={cx("seat__row__item")}
                  name={`${nameArray}${index}`}
                >
                  {index}
                </span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default SeatList;
