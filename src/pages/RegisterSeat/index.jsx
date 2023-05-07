import { useForm } from "react-hook-form";
import { Container, Form, Button } from "react-bootstrap";
import classnames from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import DataContext from "../../store/DataContext";
import ModalConText from "../../store/ModalContext";
import eventApi from "../../api/eventApi";
import style from "./RegisterSeat.scss";
import sendMailApi from "../../api/sendMailApi";

const cx = classnames.bind(style);

function RegisterSeat() {
  const formSelect = useRef();

  const DataContextt = useContext(DataContext);
  const ModalConTextt = useContext(ModalConText);

  const [optionData, setOptionData] = useState();
  const [optionTitle, setOptionTitle] = useState();
  const [indexOpSelect, setIndexOpSelect] = useState(0);
  const [optionState, setOptionState] = useState();

  const user = JSON.parse(localStorage.getItem('user'))

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Object.keys(errors);

  const submit = async (data) => {
    if (formSelect.current.value !== "no") {
      if (optionState) {
        let isSuccess = null;
        if (optionState.limit === "all") {
          isSuccess = true;
        } else {
          isSuccess = DataContextt.checkMssv(data.mssv.toUpperCase());
        }

        if (!isSuccess) {
          ModalConTextt.setShow(true);
          ModalConTextt.setMess(
            "Bạn không nằm trong danh sách sinh viên dự lễ tốt nghiệp, vui lòng kiểm tra lại!"
          );
          ModalConTextt.setType("danger");
        } else {
          if (DataContextt.checkAlready(data.mssv)) {
            ModalConTextt.setShow(true);
            ModalConTextt.setMess("Bạn đã đăng kí rồi!");
            ModalConTextt.setType("info");

            setOptionTitle(null); 
            setIndexOpSelect(null); 
            setOptionState(null);
            DataContextt.setIdEvent(null);
          } else {
            let dataClient = {
              mssv: data.mssv.toUpperCase(),
              email: user.email,
              ten: data.name,
              lop: data.class.toUpperCase(),
              nghanh: data.major.toUpperCase(),
              maDonVi: formSelect.current.value,
              idEvent: optionState._id,
            };

            DataContextt.setClientData(dataClient); // dua du lieu len store de goi api va tao
            DataContextt.setCallApi(!DataContextt.callApi);
   


            setOptionTitle(null); 
            setIndexOpSelect(null); 
            setOptionState(null);
            DataContextt.setIdEvent(null);

            ModalConTextt.setShow(true);
            ModalConTextt.setMess("Đăng kí tham dự sự kiện thành công!");
            ModalConTextt.setType("success");

            const emailPayload = {
              email:user.email,
              subject: 'Thông báo đăng ký tham gia sự kiện',
              content:`Chúc mừng bạn đã đăng ký tham gia sự kiện "${optionTitle}" thành công!`
            }

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
      } else {
        // nếu k chọn sự kiện
        ModalConTextt.setShow(true);
        ModalConTextt.setMess("Vui lòng chọn sự kiện mà bạn muốn đăng ký!");
        ModalConTextt.setType("danger");
      }
    } else {
      // nếu k chọn đơn vị
      ModalConTextt.setShow(true);
      ModalConTextt.setMess("Vui lòng chọn đơn vị của bạn!");
      ModalConTextt.setType("danger");
    }
  };

  useEffect(() => {
    const fetchOptionEvent = async () => {
      const res = await eventApi.getEvents();
      setOptionData(res.data);
    };
    fetchOptionEvent();
  }, []);

  const handleSelectOption = (item, index) => {
    setOptionTitle(`${item.name} ( ${item.time} ${item.date} )`); // title cua su kien duoc chon
    setIndexOpSelect(index); // vi tri cua su kien duoc chon
    setOptionState(item); // su kien duoc chon
    DataContextt.setIdEvent(item._id);
  };
  return (
    <div className={cx("wrapper")}>
      <Container>
        <div className={cx("form-container")}>
          <h2 className="text-center">Đăng ký tham gia sự kiện</h2>

          <Form
            onSubmit={handleSubmit(submit)}
            className={cx("form-container__main")}
          >
            <Form.Group className="mb-3" controlId="formBasicMssv">
              <Form.Control
                type="text"
                name="mssv"
                placeholder={user.role === 'sinhVien' ? 'Mã số sinh viên' : 'Mã số cán bộ'}
                spellCheck={false}
                {...register("mssv", { required: true })}
              />
              {errors.mssv?.type === "required" && (
                <p className="text-danger">Vui lòng nhập mã số sinh viên</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="text"
                name="name"
                placeholder="Họ và tên"
                spellCheck={false}
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="text-danger">Vui lòng nhập họ và tên</p>
              )}
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="email"
                placeholder="Email"
                spellCheck={false}
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
              {errors.email?.type === "required" && (
                <p className="text-danger">Vui lòng nhập email</p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="text-danger">Vui lòng kiểm tra lại email</p>
              )}
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="formBasicClass">
              <Form.Control
                type="text"
                name="class"
                placeholder="DI19V7A5"
                spellCheck={false}
                {...register("class", { required: true })}
              />
              {errors.class?.type === "required" && (
                <p className="text-danger">Vui lòng nhập mã lớp của bạn</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMajor">
              <Form.Control
                type="text"
                name="major"
                placeholder="Chuyên nghành (vd: Công nghệ thông tin)"
                spellCheck={false}
                {...register("major", { required: true })}
              />
              {errors.major?.type === "required" && (
                <p className="text-danger">
                  Vui lòng nhập nghành hiện tại của bạn
                </p>
              )}
            </Form.Group>

            <Form.Select
              ref={formSelect}
              className="mb-3"
              aria-label="Default select example"
            >
              <option value="no">Chọn đơn vị</option>
              <option value="CA">
                Viện Nghiên cứu Phát triển Đồng bằng sông Cửu Long
              </option>
              <option value="DA">Viện Công nghệ Sinh học và Thực phẩm</option>
              <option value="DI">
                Trường Công nghệ Thông tin và Truyền thông
              </option>
              <option value="KT">Trường Kinh tế</option>
              <option value="NN">Trường Nông nghiệp</option>
              <option value="TN">Trường Bách Khoa</option>
              <option value="TS">Trường Thủy sản</option>
              <option value="FL">Khoa Ngoại ngữ</option>
              <option value="HG">Khoa Phát triển Nông thôn</option>
              <option value="KH">Khoa Khoa học Tự nhiên</option>
              <option value="LK">Khoa Luật</option>
              <option value="ML">Khoa Khoa học Chính trị</option>
              <option value="MT">
                Khoa Môi trường và Tài nguyên Thiên nhiên
              </option>
              <option value="SP">Khoa Sư phạm</option>
              <option value="TD">Khoa môn Giáo dục Thể chất</option>
              <option value="XH">Khoa Khoa học Xã hội và Nhân văn</option>
            </Form.Select>

            <DropdownButton
              as={ButtonGroup}
              id={`dropdown-variants-Secondary`}
              variant={"dark"}
              title={optionTitle || "Chọn sự kiện muốn đăng ký"}
              className="w-100"
            >
              {optionData?.map((item, index) => {
                if (index === indexOpSelect) {
                  return (
                    <Dropdown.Item
                      key={item._id}
                      active
                      onClick={() => handleSelectOption(item, index)}
                    >
                      {item.name + " ( " + item.time + " " + item.date + " ) "}
                    </Dropdown.Item>
                  );
                } else {
                  return (
                    <Dropdown.Item
                      key={item._id}
                      onClick={() => handleSelectOption(item, index)}
                    >
                      {item.name + " ( " + item.time + " " + item.date + " ) "}
                    </Dropdown.Item>
                  );
                }
              })}
            </DropdownButton>

            <Button
              variant="outline-primary"
              type="submit"
              className={cx("register", "w-100", "mt-4")}
            >
              Đăng ký
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default RegisterSeat;
