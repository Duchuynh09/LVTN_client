import { Route, Routes } from "react-router-dom";
import React, { useContext, Fragment } from "react";
import classNames from "classnames";
import { publicRoute, privateRoute } from "./config/routeConfig";
import DefaultLayout from "./layouts/DefaultLayout";
import ModalContext from "./store/ModalContext.js";
import DataContext from "./store/DataContext.js";
import style from "./App.scss";
import { ModalNotify } from "./components/ModalNotify";
export const cx = classNames.bind(style);
function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const ModalContextt = useContext(ModalContext);
  const DataContextt = useContext(DataContext);
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
          // Chắc chắn là default Layout vì item.Layout === undifine
          // Chưa có Layout được định nghĩ bên Routess
          return (
            <Route
              key={index}
              path={item.path}
              // Nếu tồn tại user thì chuyển sang trang Home lun
              element={<Layout>{item.element}</Layout>}
            ></Route>
          );
        })}
        {/* Phầm bên dưới là xử lý privateRoutes */}
        {(DataContextt.isAdmin || user?.isAdmin) &&
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
          
      <ModalNotify ModalContextt={ModalContextt} handleClose={handleClose} />
    </div>
  );
}
export default App;
