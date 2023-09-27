import React, { useState, useRef, useContext, useEffect } from "react";
import SelectDepartment from "../../components/SelectDepartment";
import { Button, Form, Input } from "antd";
import DataContext from "../../store/DataContext";
import ModalConText from "../../store/ModalContext";
import style from "./Profile.scss?inline";
import classnames from "classnames/bind";
import userApi from "../../api/userApi";
const cx = classnames.bind(style);

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const [dataForm, setDataForm] = useState();
  const formSelect = useRef();
  const ModalConTextt = useContext(ModalConText);
  // ===Get data user lây dữ liệu thông tin
  // const ModalContextt = useContext(ModalContext);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    async function getUser() {
      let userLocal = (await userApi.getOneUser(user.email)).data;
      setDataForm([
        {
          name: "idUser",
          value: userLocal.idUser,
        },
        {
          name: "name",
          value: userLocal.name,
        },
        {
          name: "idClass",
          value: userLocal.idClass,
        },
        {
          name: "major",
          value: userLocal.major,
        },
      ]);
      formSelect.current.value = userLocal.department
        ? userLocal.department
        : "no";
    }
    getUser();
  }, [user.email]);

  const submit = (data) => {
    const dataClient = {
      idUser: data.idUser.toUpperCase(),
      email: user.email,
      name: data.name,
      idClass: data.idClass.toUpperCase(),
      major: data.major.toUpperCase(),
      department: formSelect.current.value,
      // idEvent: optionState._id,
    };
    const callApi = async () => {
      const result = await userApi.updateProfile(dataClient);
      if (result.message === "success") {
        await setEdit(!edit);
        await ModalConTextt.setMess(`Cập nhật thành công`);
        await ModalConTextt.setType("success");
        await ModalConTextt.setShow(!ModalConTextt.show);
      } else {
        let messageFail = "";
        if (
          result.message.codeName === "DuplicateKey" &&
          result.message.keyValue.idUser
        ) {
          messageFail = "Mã số bị trùng";
        }
        ModalConTextt.setMess(
          `Có lỗi khi cập nhật : ${messageFail.toUpperCase()} `
        );
        ModalConTextt.setType("danger");
        ModalConTextt.setShow(!ModalConTextt.show);
      }
    };
    callApi();
  };
  const editForm = (data) => {
    setEdit(true);
    if (edit) {
      submit(data);
    }
  };
  // ===========Dữ liệu gửi cho server========

  return (
    <>
      <Form
        fields={dataForm}
        onFieldsChange={(_, fields) => {
          console.log(fields);
        }}
        className={cx("form-container__main")}
        onFinish={editForm}
        size="middle"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 19,
        }}
        layout="horizontal"
        disabled={!edit}
        style={{
          maxWidth: 700,
        }}
      >
        <Form.Item label="Mã số" name="idUser">
          <Input placeholder="Mã số sinh viên ..." bordered={edit} />
        </Form.Item>
        <Form.Item label="Tên đầy đủ" name="name">
          <Input placeholder="Họ và tên ..." bordered={edit} />
        </Form.Item>
        <Form.Item label="Mã lớp" name="idClass">
          <Input placeholder="Mã lớp cố vấn ..." bordered={edit} />
        </Form.Item>
        <Form.Item label="Ngành học" name="major">
          <Input placeholder="Tên ngành học ..." bordered={edit} />
        </Form.Item>
        <Form.Item label="Đơn vị" name="department">
          {/* Select của Antd */}
          {/* <SelectAntd bordered={edit} ref={formSelect} /> */}
          <SelectDepartment bordered={edit} ref={formSelect} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 19,
          }}
        >
          <Button
            className={cx("register", "w-100", "mt-4", "btn btn-dark")}
            disabled={false}
            htmlType="submit"
          >
            {edit ? "Xác nhận" : "Chỉnh sửa"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Profile;
