import { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";

import SeatList from "../../components/SeatList";
import SearchContext from "../../store/SearchContext";
import ModalContext from "../../store/ModalContext";
import DataContext from "../../store/DataContext";
import style from "./Map.scss";
import svApi from "../../api/svApi";

const cx = classNames.bind(style);

function Map() {
  const DataContextt = useContext(DataContext);
  const SearchContextt = useContext(SearchContext);
  const ModalContextt = useContext(ModalContext);
  const [data, setData] = useState(DataContextt.data);
  let idsv = SearchContextt.idSeat;

  useEffect(() => {
    if (SearchContextt.isSearch) {
      const fetchSvApi = async () => {
        const respone = await svApi.getDssvDaDangKy();
        DataContextt.setData(respone);
        for (let index = 0; index < respone.length; index++) {
          if (respone[index].mssv === idsv) {
            const sv = document.querySelector(`#${idsv}`);
            if (sv) {
              if (document.querySelector(".activeSeat")) {
                document
                  .querySelector(".activeSeat")
                  .classList.remove("activeSeat");
              }
              sv.classList.add("activeSeat");
              ModalContextt.setMess(
                `Vị trí ghế ngồi tạm thời của bạn là ${sv.firstElementChild.attributes.name.value} (Bạn vui lòng quay lại kiểm tra vào 2 ngày tới)`
              );

              ModalContextt.setType("success");
              ModalContextt.setShow(!ModalContextt.show);
              return;
            }
          } else if (idsv === "empty") {
            ModalContextt.setMess(
              "Vui lòng nhập mã số sinh viên của bạn để tìm kiếm ghế ngồi!"
            );
            ModalContextt.setType("danger");
            ModalContextt.setShow(!ModalContextt.show);
          } else if (idsv === undefined) {
          } else {
            ModalContextt.setMess(
              "Không tìm thấy ghế ngồi! (Vui lòng kiểm tra lại mã sinh viên hoặc refresh lại website!)"
            );
            ModalContextt.setType("info");
            ModalContextt.setShow(!ModalContextt.show);
          }
        }
      };
      fetchSvApi();
      SearchContextt.setIsSearch(false);
    }
  });

  useEffect(() => {
    setData(DataContextt.data);
  }, [DataContextt.data]);

  const A = [28];
  const B = [36];
  const C = [38];
  const D = [36];
  const E = [44];
  const F = [42];
  const G = [44];
  const H = [42];
  const I = [42];
  const K = [40];
  const L = [42];
  const M = [40];
  const N = [40];
  const O = [40];
  const P = [40];
  const Q = [38];
  const R = [38];
  const S = [36];
  const T = [36];
  const U = [34];
  const V = [36];
  const X = [36];
  const Y = [36];
  const Z = [24];

  const isFull = (item) => {
    let slpt = item[0];
    if (item[slpt] === undefined) {
      return false;
    } else {
      return true;
    }
  };

  for (let i = 0; i < DataContextt.data.length; i++) {
    // if (!isFull(A)) {
    //   A.push(data[i]);
    // } else  // day nay cho bgk
    if (!isFull(B)) {
      B.push(data[i]);
    } else if (!isFull(C)) {
      C.push(data[i]);
    } else if (!isFull(D)) {
      D.push(data[i]);
    } else if (!isFull(E)) {
      E.push(data[i]);
    } else if (!isFull(F)) {
      F.push(data[i]);
    } else if (!isFull(G)) {
      G.push(data[i]);
    } else if (!isFull(H)) {
      H.push(data[i]);
    } else if (!isFull(I)) {
      I.push(data[i]);
    } else if (!isFull(K)) {
      K.push(data[i]);
    } else if (!isFull(L)) {
      L.push(data[i]);
    } else if (!isFull(M)) {
      M.push(data[i]);
    } else if (!isFull(N)) {
      N.push(data[i]);
    } else if (!isFull(O)) {
      O.push(data[i]);
    } else if (!isFull(P)) {
      P.push(data[i]);
    } else if (!isFull(Q)) {
      Q.push(data[i]);
    } else if (!isFull(R)) {
      R.push(data[i]);
    } else if (!isFull(S)) {
      S.push(data[i]);
    } else if (!isFull(T)) {
      T.push(data[i]);
    } else if (!isFull(U)) {
      U.push(data[i]);
    } else if (!isFull(V)) {
      V.push(data[i]);
    } else if (!isFull(X)) {
      X.push(data[i]);
    } else if (!isFull(Y)) {
      Y.push(data[i]);
    } else {
      Z.push(data[i]);
    }
  }

  return (
    <div className="wrapper">
      <h2 className="mt-5 text-center">SƠ ĐỒ HỘI TRƯỜNG RÙA</h2>
      <div className={cx("seat-container")}>
        <SeatList Array={A} nameArray="A"></SeatList>
        <SeatList Array={B} nameArray="B"></SeatList>
        <SeatList Array={C} nameArray="C"></SeatList>
        <SeatList Array={D} nameArray="D"></SeatList>
        <SeatList Array={E} nameArray="E"></SeatList>
        <SeatList Array={F} nameArray="F"></SeatList>
        <SeatList Array={G} nameArray="G"></SeatList>
        <SeatList Array={H} nameArray="H"></SeatList>
        <SeatList Array={I} nameArray="I"></SeatList>
        <SeatList Array={K} nameArray="K"></SeatList>
        <SeatList Array={L} nameArray="L"></SeatList>
        <SeatList Array={M} nameArray="M"></SeatList>
        <SeatList Array={N} nameArray="N"></SeatList>
        <SeatList Array={O} nameArray="O"></SeatList>
        <SeatList Array={P} nameArray="P"></SeatList>
        <SeatList Array={Q} nameArray="Q"></SeatList>
        <SeatList Array={R} nameArray="R"></SeatList>
        <SeatList Array={S} nameArray="S"></SeatList>
        <SeatList Array={T} nameArray="T"></SeatList>
        <SeatList Array={U} nameArray="U"></SeatList>
        <SeatList Array={V} nameArray="V"></SeatList>
        <SeatList Array={X} nameArray="X"></SeatList>
        <SeatList Array={Y} nameArray="Y"></SeatList>
        <SeatList Array={Z} nameArray="Z"></SeatList>
      </div>
      <div className={cx("map-mobile")}>
        <img
          src="https://2.bp.blogspot.com/-5x7mA-I6gDA/XDBsvamqakI/AAAAAAAAHMs/cn7vjxYPqxY3cD8kSY6CHtdxEcmgDXBawCLcBGAs/s1600/ch%25E1%25BB%2597%2Bng%25E1%25BB%2593i%2B%25282%2529.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Map;
