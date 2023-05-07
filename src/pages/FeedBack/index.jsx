import { useContext, useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import classnames from "classnames/bind";

import userApi from "../../api/userApi";
import ModalContext from "../../store/ModalContext";

import style from "./FeedBack.scss";
const cx = classnames.bind(style);

const FeedBack = () => {
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(false);

  const ModalContextt = useContext(ModalContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async (data) => {
    let email = data.email !== "" ? data.email : "Ẩn danh";

    const feedbackApi = await userApi.feedback({
      email,
      feedback: data.feedback,
    });
    if (feedbackApi.state === "success") {
      ModalContextt.setMess("Cảm ơn bạn đã góp ý cho hệ thống chúng tôi!");
      ModalContextt.setType("success");
      ModalContextt.setShow(!ModalContextt.show);
      setFetch(!fetch);
    } else {
      ModalContextt.setMess("Góp ý không thành công");
      ModalContextt.setType("info");
      ModalContextt.setShow(!ModalContextt.show);
    }
  };

  useEffect(() => {
    const fetchFeedBack = async () => {
      const res = await userApi.getFeedback();
  
      if (res.state === "success") {
        setData(res.data);
      }
    };
    fetchFeedBack();
  }, [fetch]);

  return (
    <div className="wrapper d-flex justify-content-between">
      <div className="feedBackLeft w-50 p-5">
        {data?.map((item, index) => (
          <div key={index} className={cx("feedBackItem")}>
            <div className="feedBackContent">
              <BiUserCircle className="feedBackAvt"></BiUserCircle>
              <span className="feedBackEmail">{item.email}</span>
            </div>
            <div className="feedBackDescription">
              <a
                href={item.description}
                target='_blank'
                rel="noopener noreferrer"
              >
                {item.description}
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="feedBackRight w-25 p-5 m-3">
        <Form onSubmit={handleSubmit(submit)}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="email"
              placeholder="example@gmail.com"
              spellCheck={false}
              {...register("email", { required: false })}
            />
            <Form.Text className="text-muted">
              Bạn có thể không nhập email!
            </Form.Text>
          </Form.Group>
          <Form.Control
            placeholder="Góp ý"
            as="textarea"
            name="feedback"
            aria-label="With textarea"
            {...register("feedback", { required: true })}
          />
          {errors.feedback?.type === "required" && (
            <p className="text-danger">Vui lòng nhập góp ý của bạn!</p>
          )}

          <Button variant="primary" type="submit" className="mt-4">
            Gửi
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default FeedBack;
