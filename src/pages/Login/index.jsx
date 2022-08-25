import { Container, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import classnames from "classnames/bind";

import style from "./Login.scss";
const cx = classnames.bind(style);

function Login() {
  return (
    <div className={cx("wrapper")}>
      <Container>
        <div className={cx("form-container")}>
          <h2 className="text-center">Welcome to CTU E-learning!</h2>
          <Form className={cx("form-container__main")}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="email" placeholder="Tên đăng nhập" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control type="password" placeholder="Mật khẩu" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Nhớ tên tài khoản" />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              Đăng nhập
            </Button>
            <p className="text-center m-2">Hoặc</p>
            <Button variant="outline-primary" type="submit" className={cx('register','w-100')}>
              <Link  to={'/register'}>Đăng ký ngay</Link>
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
