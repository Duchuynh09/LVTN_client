import { Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import classNames from "classnames/bind";

import { Fragment } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { Modal, Button } from "react-bootstrap";
import { publicRoute, privateRoute } from "./config/routeConfig";
import DefaultLayout from "./layouts/DefaultLayout";
import ModalContext from "./store/ModalContext";

import style from "./App.scss";

const cx = classNames.bind(style)

function App() {
  const admin = {
    userName: "admin",
    pass: "123",
  };
  const ModalContextt = useContext(ModalContext);
  const handleClose = () => ModalContextt.setShow(false);
  return (
    <div>
      <Routes>
        {publicRoute.map((item, index) => {
          let Layout = DefaultLayout;
          if (item.layout) {
            Layout = item.layout;
          } else if (item.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={item.path}
              element={<Layout>{item.element}</Layout>}
            ></Route>
          );
        })}
        {admin.userName === "admin" &&
          admin.pass === "123" &&
          privateRoute.map((item, index) => {
            let Layout = DefaultLayout;
            if (item.layout) {
              Layout = item.layout;
            } else if (item.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={item.path}
                element={<Layout>{item.element}</Layout>}
              ></Route>
            );
          })}
      </Routes>

      <Modal show={ModalContextt.show} onHide={handleClose}>
        <div className={`border-3 rounded-3 border border-${ModalContextt.type} text-center`} >
          <Modal.Header closeButton></Modal.Header>
          <div className={`modal-title text-${ModalContextt.type}`}>
            <BiInfoCircle></BiInfoCircle>
            <span>Thông báo</span>
          </div>
          <p className="text-center modal-mess">
            <b>{ModalContextt.mess}</b>
          </p>
          <Modal.Footer>
            <Button variant={`${ModalContextt.type}`} className={cx('text-white')} onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
}
export default App;
