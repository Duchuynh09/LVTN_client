import { useState } from "react";
import ModalContext from "./ModalContext";

function ModalProvider({ children }) {
  const [show, setShow] = useState(false);
  const [mess, setMess] = useState('');

  const [type, setType] = useState('success');
  return (
    <ModalContext.Provider
      value={{ show, setShow, mess, setMess, type, setType }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalProvider;
