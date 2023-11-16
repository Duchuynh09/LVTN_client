import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import classnames from "classnames/bind";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import signUpApi from "../../../api/signUpApi";
import style from "./Register.scss";
import ModalContext from "../../../store/ModalContext";
import { Spin } from "antd";
const cx = classnames.bind(style);

function Register() {
  const next = useNavigate();

  const [valid, setValid] = useState(false);
  const [showErr, setShowErr] = useState(false);
  const [loading, setLoaing] = useState(false);
  const ModalContextt = useContext(ModalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submit = (data) => {
    if (data.pass === data.pass2) {
      setValid(true);
      setLoaing(true);
      try {
        const callApi = async () => {
          const result = await signUpApi.signUpUser({
            email: data.email,
            password: data.pass,
          });
          if (result.message === "success") {
            setLoaing(false);
            ModalContextt.setMess(
              result.notification || `Đăng ký tài khoản thành công!`
            );
            ModalContextt.setType("success");
            ModalContextt.setShow(!ModalContextt.show);
            next("/");
          } else {
            setLoaing(false);
            ModalContextt.setMess(
              result.notification || `Tài khoản đã tồn tại!`
            );
            ModalContextt.setType("danger");
            ModalContextt.setShow(!ModalContextt.show);
          }
        };
        callApi();
      } catch (error) {
        console.log(error);
      }
    } else {
      setValid(false);
      setShowErr(true);
    }
  };

  return (
    <Spin spinning={loading}>
      <div className={cx("wrapper")}>
        <Container>
          <div className={cx("form-container")}>
            <h2 className="text-center">Welcome to CTU E-learning!</h2>
            <Form
              onSubmit={handleSubmit(submit)}
              className={cx("form-container__main")}
              method="POST"
            >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                  })}
                />
                {errors.email?.type === "required" && (
                  <p className="text-danger">Vui lòng nhập email</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  name="pass"
                  placeholder="Mật khẩu"
                  {...register("pass", { required: true })}
                />
                {errors.pass?.type === "required" && (
                  <p className="text-danger">Vui lòng nhập mật khẩu</p>
                )}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword2">
                <Form.Control
                  type="password"
                  name="pass2"
                  placeholder="Mật khẩu"
                  {...register("pass2", { required: true })}
                />
                {errors.pass2?.type === "required" && (
                  <p className="text-danger">Vui lòng nhập lại mật khẩu</p>
                )}
                {!valid && showErr && (
                  <p className="text-danger">Mật khẩu không giống nhau</p>
                )}
              </Form.Group>
              <Button type="submit" className={cx("register", "w-100")}>
                Đăng ký ngay
              </Button>
            </Form>
          </div>
        </Container>
      </div>
    </Spin>
  );
}

export default Register;
