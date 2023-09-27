import { BiInfoCircle } from "react-icons/bi";
import { Modal, Button } from "react-bootstrap";
import { cx } from "../App";

export function ModalNotify(props) {
  return (
    <Modal show={props.ModalContextt.show} onHide={props.handleClose}>
      <div
        className={`border-3 rounded-3 border border-${props.ModalContextt.type} text-center`}
      >
        <Modal.Header closeButton></Modal.Header>
        <div className={`modal-title text-${props.ModalContextt.type}`}>
          <BiInfoCircle></BiInfoCircle>
          <span>Thông báo</span>
        </div>
        <p className="text-center modal-mess">
          <b>{props.ModalContextt.mess}</b>
        </p>
        <Modal.Footer>
          <Button
            variant={`${props.ModalContextt.type}`}
            className={cx("text-white")}
            onClick={props.handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}
