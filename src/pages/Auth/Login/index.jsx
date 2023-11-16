import { Container, Form, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import classnames from "classnames/bind";
import signInApi from "../../../api/signInApi";
import style from "./Login.scss";
import ModalContext from "../../../store/ModalContext";
import DataContext from "../../../store/DataContext";
import LoginWithGoogle from "../../../components/LoginWithGoogle";

const cx = classnames.bind(style);

function Login() {
  const param = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const ModalContextt = useContext(ModalContext);
  const DataContextt = useContext(DataContext);

  useEffect(() => {
    const checkLogin = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        if (user.isAdmin && param.login) {
          navigate("/home");
        }
        if (!user.isAdmin && !param.login) {
          navigate("/home");
        }
      }
    };
    checkLogin();
  }, [navigate, param]);
  const handleSignIn = async () => {
    if (param.login) {
      var currentDate = new Date();
      // Thêm 30 ngày
      currentDate.setMonth(currentDate.getMonth() + 1);
      // Chuyển ngày thành chuỗi ngày tháng hết hạn (GMT)
      var expires = currentDate.toUTCString();
      // Trang login admin mới có param login
      if (param.login === "login") {
        try {
          const check = await signInApi.signInAdmin({
            email,
            password,
          });
          if (check.state === "success") {
            const { id, ...info } = check.user;
            localStorage.setItem("user", JSON.stringify({ ...info }));
            localStorage.setItem("token", JSON.stringify(check.token));
            document.cookie = `token = ${JSON.stringify(
              check.token
            )};expires=${expires}; path=/`;
            document.cookie = `id = ${JSON.stringify(
              id
            )};expires=${expires}; path=/`;
            DataContextt.setIsAdmin(true);
            navigate("/home");
          } else {
            ModalContextt.setShow(true);
            ModalContextt.setType("danger");
            ModalContextt.setMess(
              "Tên đăng nhập hoặc mật khẩu không chính xác"
            );
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      try {
        const check = await signInApi.signInUser({
          email,
          password,
        });
        if (check.state === "success") {
          const { id, ...info } = check.user;
          localStorage.setItem("user", JSON.stringify({ ...info }));
          document.cookie = `token = ${JSON.stringify(check.token)}`;
          document.cookie = `token = ${JSON.stringify(
            check.token
          )};expires=${expires}; path=/`;
          document.cookie = `id = ${JSON.stringify(
            id
          )};expires=${expires}; path=/`;
          navigate("/home");
        } else {
          ModalContextt.setShow(true);
          ModalContextt.setType("danger");
          ModalContextt.setMess("Tên đăng nhập hoặc mật khẩu không chính xác");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={cx("wrapper")}>
      <Container>
        <div className={cx("form-container")}>
          <h2 className="text-center">Welcome to CTU E-learning!</h2>

          <Form className={cx("form-container__main")} method={"POST"}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                placeholder="Email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="Mật khẩu"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Nhớ tên tài khoản" />
            </Form.Group>
            <Button variant="primary" className="w-100" onClick={handleSignIn}>
              Đăng nhập
            </Button>
            <p className="text-center m-2">Hoặc</p>

            <div className="d-flex justify-content-evenly">
              <LoginWithGoogle />
              <Button className={cx("register")}>
                <Link to={"/register"}>
                  <b>Đăng ký ngay</b>
                </Link>
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default Login;
