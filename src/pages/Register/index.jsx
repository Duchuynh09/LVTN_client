import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import classnames from "classnames/bind";

import style from "./Register.scss";
import { useState } from "react";
const cx = classnames.bind(style);

function Register() {
  const [valid, setValid] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const checkErrors = Object.keys(errors);
  const submit = (data) => {
    if (data.pass === data.pass2) {
      setValid(false);
    } else {
      setValid(true);
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text"
                name="mssv"
                placeholder="Mã số sinh viên"
                {...register("mssv", { required: true })}
              />
              {errors.mssv?.type === "required" && (
                <p className="text-danger">Vui lòng nhập mã số sinh viên</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="pass"
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
                type="pass"
                name="pass2"
                placeholder="Mật khẩu"
                {...register("pass2", { required: true })}
              />
              {errors.pass2?.type === "required" && (
                <p className="text-danger">Vui lòng nhập lại mật khẩu</p>
              )}
              {valid && <p>Mật khẩu không giống nhau</p>}
            </Form.Group>
            <Button
              variant="outline-primary"
              type="submit"
              className={cx("register", "w-100")}
            >
              Đăng ký ngay
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Register;
