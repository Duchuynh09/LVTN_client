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
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { BiTable } from "react-icons/bi";
import eventApi from "../../api/eventApi";
import sendMailApi from "../../api/sendMailApi";
import style from "./EventManager.scss";
import { exportFile } from "../../services/handleFileExcel.js";
import PreViewModal from "../../components/PreviewList";
import { message } from "antd";
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
  const [preview, setPreview] = useState(false);
  const yearList = useRef();
  const [previewProps, setPreviewProps] = useState({
    users: [],
  });
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
  const hanldePreviewDsCoTheDangKy = (item) => {
    setPreviewProps({
      users: item.dsCoTheDangKy,
    });
  };
  const hanldePreviewDsCoTheDangKySPending = async (item) => {
    const res2 = await eventApi.getDssvCoTheDangKySpending(item._id);
    if (res2.state === "success") handleClose();
    setPreviewProps({
      users: res2.data,
    });
  };
  const handlePreviewExport = (item) => {
    setPreviewProps({
      users: item.dsDaDangKy,
      handleExport: handleExport,
    });
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
  function handleExport(dsDaDangKy) {
    exportFile(dsDaDangKy);
  }
  const handleCreateFile = (id, year = 2023) => {
    const handleApi = async () => {
      const payload2 = {
        idEvent: id,
        date: year,
      };
      const res2 = await eventApi.addDataCTDK(payload2);
      if (res2.state === "success") handleClose();
    };
    const fetchEvents = async () => {
      const res = await eventApi.getEvents();
      setDataEvent(res.data);
      message.success("Duyệt danh sách thành công");
    };
    handleApi();
    fetchEvents();
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
            <th>Thiết bị mượn</th>
            <th>Người tạo</th>
            <th>Giới hạn tham gia</th>
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
                <td>
                  {item.devices.map((device) => {
                    return (
                      <div>{`- ${device.quantity} ${device.device.name}`}</div>
                    );
                  })}
                </td>

                <td>{item.author}</td>
                {item.limit === "all" ? (
                  <td>{item.limit}</td>
                ) : (
                  <td>
                    {item.dsCoTheDangKy.length > 0
                      ? item.limit + " người"
                      : "Chưa duyệt danh sách"}
                    {optionShow === "DXL" && (
                      <>
                        <PreViewModal
                          open={preview}
                          onCancel={() => setPreview(false)}
                          {...previewProps}
                        />

                        <OverlayTrigger
                          placement="top"
                          overlay={
                            <Tooltip id="tooltip">
                              <strong>Xem danh sách</strong>
                            </Tooltip>
                          }
                        >
                          {item.dsCoTheDangKy.length === 0 ? (
                            <Button
                              className="m-2"
                              onClick={() => {
                                hanldePreviewDsCoTheDangKySPending(item);
                                setPreview(true);
                              }}
                              disabled={!item.dsCoTheDangKy}
                            >
                              Xem trước
                            </Button>
                          ) : (
                            <Button
                              className="m-2"
                              onClick={() => {
                                hanldePreviewDsCoTheDangKy(item);
                                setPreview(true);
                              }}
                              disabled={!item.dsCoTheDangKy}
                            >
                              <BiTable></BiTable>
                            </Button>
                          )}
                        </OverlayTrigger>
                      </>
                    )}
                  </td>
                )}
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
                      variant="secondary"
                      onClick={() => {
                        handlePreviewExport(item);
                        setPreview(true);
                      }}
                    >
                      Xuất file người tham gia
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
                      onClick={() => {
                        handleCreateFile(item._id);
                      }}
                    >
                      Duyệt danh sách
                    </Button>
                  )}
                  <Button
                    className="ms-2"
                    variant="danger"
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
