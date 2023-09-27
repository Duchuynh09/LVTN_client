import classnames from "classnames/bind";
import { useEffect, useRef, useState } from "react";
import {
  Table,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Modal,
  Form,
} from "react-bootstrap";
import eventApi from "../../api/eventApi";
import sendMailApi from "../../api/sendMailApi";
import style from "./EventManager.scss";

const cx = classnames.bind(style);

function EventManager() {
  // bootstrap state
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setIdEvent(id);
  };

  // state
  const [dataEvent, setDataEvent] = useState();
  const [callApi, setCallApi] = useState(false);
  const [optionTitle, setOptionTitle] = useState();
  const [optionShow, setOptionShow] = useState("DXL");
  const [idEvent, setIdEvent] = useState("");
  const yearList = useRef();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (optionShow === "DXL") {
      const fetchEvents = async () => {
        const res = await eventApi.getEvents();
        setDataEvent(res.data);
      };
      fetchEvents();
    } else {
      const fetchPendingEvents = async () => {
        const res = await eventApi.getPendingEvents();
        setDataEvent(res.data);
      };
      fetchPendingEvents();
    }
  }, [callApi, optionShow]);

  const handleAccept = (idEvent) => {
    const createEvt = async () => {
      const res = await eventApi.createEvent(idEvent);
      if (res.state === "success") {
        setCallApi(!callApi);
        // gui mail cho author thong bao thanh cong

        const emailPayload = {
          email: user.email,
          subject: "Thông báo về việc tổ chức sự kiện",
          content: `Chúc mừng bạn, sự kiện mà bạn đăng ký "${optionTitle}" đã được chúng tôi thông qua!`,
        };

        const sendMai = async () => {
          try {
            await sendMailApi.sendMail(emailPayload);
          } catch (error) {
            console.log(error);
          }
        };

        // sendMai();
      }
    };
    createEvt();
  };

  const handleNoAccept = (idEvent) => {
    const deletePendingEvent = async () => {
      if (optionShow === "DXL") {
        // CÁI NÀY LÀ XÓA
        const res = await eventApi.deleteEvent(idEvent);
        if (res.state === "success") {
          setCallApi(!callApi);
        }
      } else {
        // CÁI NÀY LÀ KHÔNG DUYỆT
        const res = await eventApi.deletePendingEvent(idEvent);

        if (res.state === "success") {
          setCallApi(!callApi);
          // gui mail cho author thong bao event khong duoc duyệt

          const emailPayload = {
            email: user.email,
            subject: "Thông báo về việc tổ chức sự kiện",
            content: `Chúng tôi rất tiếc khi phải thông báo rằng sự kiện mà bạn tạo "${optionTitle}" không được chúng tôi thông qua!`,
          };

          const sendMai = async () => {
            try {
              await sendMailApi.sendMail(emailPayload);
            } catch (error) {
              console.log(error);
            }
          };

          // sendMai();
        }
      }
    };
    deletePendingEvent();
  };

  const handleClick = (type) => {
    if (type === "DXL") {
      setOptionTitle("Các sự kiện đã được xử lí");
      setOptionShow("DXL");
    } else {
      setOptionTitle("Các sự kiện chưa được xử lí");
      setOptionShow("CXL");
    }
  };

  const handleCreateFile = (id, year) => {
    const handleApi = async () => {
      const payload = {
        idEvent: id,
      };
      const payload2 = {
        idEvent: id,
        date: year,
      };
      const res = await eventApi.generateFile(payload);
      if (res.state === "success") {
        const res2 = await eventApi.addDataCTDK(payload2);
        console.log(res2);
      }
    };
    handleApi();
  };

  return (
    <div className={cx("wrapper")}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin danh sách</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Select ref={yearList} aria-label="Default select example">
            <option>Danh sách được ký vào năm?</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="primary"
            onClick={() => handleCreateFile(idEvent, yearList.current.value)}
          >
            Duyệt danh sách
          </Button>
        </Modal.Footer>
      </Modal>

      <h2 className="mt-3 text-center">
        {optionTitle || "Các sự kiện đã được xử lí"}
      </h2>
      <div className="d-flex justify-content-end m-3">
        <DropdownButton
          as={ButtonGroup}
          variant={"secondary"}
          title={optionTitle || "Các sự kiện đã được xử lí"}
        >
          <Dropdown.Item onClick={() => handleClick("DXL")}>
            Các sự kiện đã được xử lí
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleClick("CXL")}>
            Các sự kiện chưa được xử lí
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <Table striped bordered hover variant="dark" className="mt-3">
        <thead>
          <tr>
            <th></th>
            <th>Tên sự kiện</th>
            <th>Ngày diễn ra</th>
            <th>Thời gian</th>
            <th>Giới hạn tham gia</th>
            <th>Người tạo</th>
            <th>Xử lí</th>
          </tr>
        </thead>
        <tbody>
          {dataEvent?.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>

                {item.limit === "all" ? (
                  <td>{item.limit}</td>
                ) : (
                  <td>
                    <a target={"_blank"} href={item.limit} rel="noreferrer">
                      {item.limit}
                    </a>
                  </td>
                )}
                <td>{item.author}</td>

                <td>
                  {optionShow === "CXL" && (
                    <Button
                      className="m-2"
                      variant="primary"
                      onClick={() => handleAccept(item._id)}
                    >
                      Duyệt
                    </Button>
                  )}
                  {optionShow === "DXL" && (
                    <Button
                      className="m-2"
                      disabled={
                        item.limit === "all" ||
                        item.dsCoTheDangKy[0] !== undefined
                      }
                      variant="primary"
                      onClick={() => handleShow(item._id)}
                    >
                      Duyệt danh sách
                    </Button>
                  )}

                  <Button
                    variant="secondary"
                    onClick={() => handleNoAccept(item._id)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default EventManager;
