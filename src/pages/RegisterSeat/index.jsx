import { useForm } from "react-hook-form";
import { Container, Form, Button } from "react-bootstrap";
import classnames from "classnames/bind";
import { useContext } from "react";

import DataContext from "../../store/DataContext";
import ModalConText from "../../store/ModalContext";
import sendMailApi from "../../api/sendMailApi";
import style from "./RegisterSeat.scss";
// import sendMailApi from "../../api/sendMailApi";

const cx = classnames.bind(style);

function RegisterSeat() {
  const DataContextt = useContext(DataContext);
  const ModalConTextt = useContext(ModalConText);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Object.keys(errors);

  const submit = (data) => {
    const isSuccess = DataContextt.checkMssv(data.mssv.toUpperCase());
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
      } else {
        let dataClient = {
          mssv: data.mssv.toUpperCase(),
          email: data.email,
          ten: data.name,
          lop: data.class.toUpperCase(),
          nghanh: data.major.toUpperCase(),
          maDonVi: isSuccess.donvi,
        };

        DataContextt.setClientData(dataClient);
        DataContextt.setCallApi(!DataContextt.callApi);
        DataContextt.setTypeSort({ type: "mssv", atoZ: true });

        ModalConTextt.setShow(true);
        ModalConTextt.setMess("Đăng kí dự lễ tốt nghiệp thành công!");
        ModalConTextt.setType("success");

        const sendMai = async () => {
          try {
            await sendMailApi.sendMail(dataClient);
          } catch (error) {
            console.log(error);
          }
        };

        sendMai();
      }
    }
  };

  return (
    <div className={cx("wrapper")}>
      <Container>
        <div className={cx("form-container")}>
          <h2 className="text-center">Welcome to CTU E-learning!</h2>

          <Form
            onSubmit={handleSubmit(submit)}
            className={cx("form-container__main")}
          >
            <Form.Group className="mb-3" controlId="formBasicMssv">
              <Form.Control
                type="text"
                name="mssv"
                placeholder="Mã số sinh viên"
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

            <Form.Group className="mb-3" controlId="formBasicEmail">
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
            </Form.Group>

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

            <Button
              variant="outline-primary"
              type="submit"
              className={cx("register", "w-100")}
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
