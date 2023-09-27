import { useForm } from "react-hook-form";
import { Container, Form, Button } from "react-bootstrap";
import classnames from "classnames/bind";
import { useContext, useEffect, useRef, useState } from "react";
import DataContext from "../../store/DataContext";
import ModalConText from "../../store/ModalContext";
// import eventApi from "../../api/eventApi";
import style from "./RegisterSeat.scss";
import sendMailApi from "../../api/sendMailApi";
import SelectDepartment from "../../components/SelectDepartment";
import FormProfile from "../../components/FormProfile";
import userApi from "../../api/userApi";
import EventSelection from "../../components/EventSelection";
const cx = classnames.bind(style);

function RegisterSeat() {
  const formSelect = useRef();

  const DataContextt = useContext(DataContext);
  const ModalConTextt = useContext(ModalConText);

  // const [optionData, setOptionData] = useState();
  const [optionTitle, setOptionTitle] = useState();
  const [indexOpSelect, setIndexOpSelect] = useState(0);
  const [optionState, setOptionState] = useState();

  const user = JSON.parse(localStorage.getItem("user"));
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  // Object.keys(errors);

  const submit = async (data) => {
    if (formSelect.current.value !== "no") {
      // optioneState là chọn sự kiện đăng kí

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
              email: user.email,
              subject: "Thông báo đăng ký tham gia sự kiện",
              content: `Chúc mừng bạn đã đăng ký tham gia sự kiện "${optionTitle}" thành công!`,
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
    const getuser = async () => {
      let userLocal = (await userApi.getOneUser(user.email)).data;
      setValue("mssv", userLocal.idUser);
      setValue("name", userLocal.name);
      setValue("major", userLocal.major.toUpperCase());
      setValue("class", userLocal.idClass);
      formSelect.current.value = userLocal.department
        ? userLocal.department
        : "no";
    };
    getuser();
  }, [user.email, setValue]);

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
            <FormProfile user={user} register={register} errors={errors} />

            <SelectDepartment ref={formSelect} bordered={true} />

            <EventSelection
              indexOpSelect={indexOpSelect}
              optionTitle={optionTitle}
              handleSelectOption={(item, index) =>
                handleSelectOption(item, index)
              }
            />
            <Button
              variant="outline-primary"
              type="submit"
              className={cx("register", "w-100", "mt-4")}
            >
              Xác nhận
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default RegisterSeat;
