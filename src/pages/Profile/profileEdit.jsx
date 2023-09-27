// /* eslint-disable react-hooks/rules-of-hooks */
import { useForm } from "react-hook-form";
import { Container, Form, Button } from "react-bootstrap";

import React, { useContext, useEffect, useRef, useState } from "react";

import DataContext from "../../store/DataContext";
import ModalConText from "../../store/ModalContext";
import eventApi from "../../api/eventApi";
import style from "./Profile.scss?inline";
import sendMailApi from "../../api/sendMailApi";
import SelectDepartment from "../../components/SelectDepartment";
import FormProfile from "../../components/FormProfile";
import classnames from "classnames/bind";

const cx = classnames.bind(style);

const ProfileEdit = () => {
  const formSelect = useRef();

  const DataContextt = useContext(DataContext);
  const ModalConTextt = useContext(ModalConText);

  const [optionData, setOptionData] = useState();
  const [optionTitle, setOptionTitle] = useState();
  const [indexOpSelect, setIndexOpSelect] = useState(0);
  const [optionState, setOptionState] = useState();
  const user = JSON.parse(localStorage.getItem("user"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Form
      //   onSubmit={handleSubmit(submit)}
      className={cx("form-container__main")}
    >
      <FormProfile user={user} register={register} errors={errors} />
      <SelectDepartment ref={formSelect} />
      <Button
        variant="outline-primary"
        type="submit"
        className={cx("register", "w-100", "mt-4")}
      >
        Cập nhật thông tin
      </Button>
    </Form>
  );
};

export default ProfileEdit;
