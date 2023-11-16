import { useEffect, useState, useContext } from "react";
import classNames from "classnames/bind";

import SeatList from "../SeatList";
import DataContext from "../../store/DataContext";
import style from "./SeatContainer.scss";

const cx = classNames.bind(style);

const SeatContainer = () => {
  const DataContextt = useContext(DataContext);

  const [data, setData] = useState(DataContextt.data);

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

  useEffect(() => {
    setData(DataContextt.data);
  }, [DataContextt.data]);
  if (data) {
    for (let i = 0; i < DataContextt.data?.length; i++) {
      if (!isFull(A) && data[i] && !DataContextt.specialSeat?.includes("A")) {
        A.push(data[i]);
      } // day nay cho bgk
      else if (
        !isFull(B) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("B")
      ) {
        B.push(data[i]);
      } else if (
        !isFull(C) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("C")
      ) {
        C.push(data[i]);
      } else if (
        !isFull(D) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("D")
      ) {
        D.push(data[i]);
      } else if (
        !isFull(E) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("E")
      ) {
        E.push(data[i]);
      } else if (
        !isFull(F) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("F")
      ) {
        F.push(data[i]);
      } else if (
        !isFull(G) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("G")
      ) {
        G.push(data[i]);
      } else if (
        !isFull(H) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("H")
      ) {
        H.push(data[i]);
      } else if (
        !isFull(I) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("I")
      ) {
        I.push(data[i]);
      } else if (
        !isFull(K) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("K")
      ) {
        K.push(data[i]);
      } else if (
        !isFull(L) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("L")
      ) {
        L.push(data[i]);
      } else if (
        !isFull(M) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("M")
      ) {
        M.push(data[i]);
      } else if (
        !isFull(N) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("N")
      ) {
        N.push(data[i]);
      } else if (
        !isFull(O) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("O")
      ) {
        O.push(data[i]);
      } else if (
        !isFull(P) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("P")
      ) {
        P.push(data[i]);
      } else if (
        !isFull(Q) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("Q")
      ) {
        Q.push(data[i]);
      } else if (
        !isFull(R) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("R")
      ) {
        R.push(data[i]);
      } else if (
        !isFull(S) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("S")
      ) {
        S.push(data[i]);
      } else if (
        !isFull(T) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("T")
      ) {
        T.push(data[i]);
      } else if (
        !isFull(U) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("U")
      ) {
        U.push(data[i]);
      } else if (
        !isFull(V) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("V")
      ) {
        V.push(data[i]);
      } else if (
        !isFull(X) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("X")
      ) {
        X.push(data[i]);
      } else if (
        !isFull(Y) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("Y")
      ) {
        Y.push(data[i]);
      } else if (
        !isFull(Z) &&
        data[i] &&
        !DataContextt?.specialSeat.includes("Z")
      ) {
        Z.push(data[i]);
      }
    }
  }

  return (
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
  );
};

export default SeatContainer;
