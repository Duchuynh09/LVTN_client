import classnames from "classnames/bind";
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  Container,
  Form,
  Button,
  InputGroup,
  Tooltip,
  ButtonToolbar,
  OverlayTrigger,
} from "react-bootstrap";
import { BiTable, BiInfoCircle } from "react-icons/bi";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import eventApi from "../../api/eventApi";
import ModalConText from "../../store/ModalContext";

import devicesApi from "../../api/devicesApi";

import style from "../RegisterSeat/RegisterSeat.scss"; // sài chung style với trang register seat
import SelectDevices from "../../components/SelectDevices";
import sponsorsApi from "../../api/sponsorApi";
import { importFile, importFileLink } from "../../services/handleFileExcel.js";
import { message } from "antd";
import PreViewModal from "../../components/PreviewList";
const typesEvent = [
  {
    id: "typeEvent-radio1",
    label: "Giáo dục",
    value: "educate",
    description: "Hội nghị, hội thảo, triển lãm, khóa đào tạo, v.v.",
    defaultChecked: true,
  },
  {
    id: "typeEvent-radio2",
    label: "Thương mại",
    value: "trading",
    description: "Triển lãm thương mại, hội chợ, hội thảo, v.v.",
  },
  {
    id: "typeEvent-radio3",
    label: "Giải trí",
    value: "entertain",
    description: "Buổi hòa nhạc, buổi biểu diễn, lễ hội, v.v.",
  },
  {
    id: "typeEvent-radio4",
    label: "Thể thao",
    value: "sport",
    description: "Giải đấu, trận đấu, hội nghị, v.v.",
  },
  {
    id: "typeEvent-radio5",
    label: "Văn hóa",
    value: "culture",
    description: "Lễ hội, triển lãm, buổi biểu diễn, v.v.",
  },
];
const cx = classnames.bind(style);
function CreateEvent() {
  const specialSeatCheckFirst = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const specialSeatCheckSencond = ["I", "K", "L", "M", "N", "O", "P", "Q"];
  const specialSeatCheckThird = ["R", "S", "T", "u", "v", "x", "Y", "Z"];
  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm();
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [deviceSelected, setDeviceSeleted] = useState([]);
  const [sponsorOptions, setSponsorOptions] = useState([]);
  const [sponsorSelected, setSponsorSeleted] = useState([]);
  const [dssv, setDssv] = useState();
  const next = useNavigate();

  const ModalConTextt = useContext(ModalConText);
  const user = JSON.parse(localStorage.getItem("user"));

  const [radioCheck, setRadioCheck] = useState("all");
  const [typeDssv, setTypeDssv] = useState("file");
  const [radioTimeCheck, setRadioTimeCheck] = useState("Sáng");
  const [specialSeatCheck, setSpecialSeatCheck] = useState([]);
  const [preview, setPreview] = useState(false);
  const dssvFile = watch("dssv");
  const typeEvent = watch("typeEvent");
  useEffect(() => {
    if (radioCheck === "limit") {
      if (dssvFile) {
        if (typeDssv === "file") {
          const dssvName = dssvFile[0].name;
          const extension = dssvName
            .substring(dssvName.lastIndexOf("."))
            .toUpperCase();

          if (extension === ".XLS" || extension === ".XLSX") {
            importFile(dssvFile[0], addDssv);
          } else {
            message.error("Chọn đúng file XLS hoặc XLSX");
          }
        } else {
          const dssvName = dssvFile;
          const extension = dssvName
            .substring(dssvName.lastIndexOf("."))
            .toUpperCase();
          if (extension === ".XLS" || extension === ".XLSX") {
            importFileLink(dssvFile, addDssv);
          } else {
            message.error("Chọn đúng file XLS hoặc XLSX");
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dssvFile]);
  const changeQuantity = (key, quantity) => {
    const newArray = [...deviceOptions];
    const newOption = newArray.find((item) => item.key === key);
    if (newOption) {
      newOption.quantity = quantity;
      setDeviceOptions(newArray);
    } else {
      ModalConTextt.setShow(true);
      ModalConTextt.setMess("Lỗi khi tìm thiết bị để tằng số lượng");
      ModalConTextt.setType("danger");
    }
  };
  const addDssv = (ds) => {
    setDssv(ds);
  };
  const getOption = useCallback(async () => {
    const devices = await devicesApi.getAllDevice();
    setDeviceOptions(
      devices.map((device) => ({
        label: device.name,
        value: device.name,
        key: device._id,
        quantity: 1,
        max: device.stock,
      }))
    );
    const sponsors = await sponsorsApi.getAllSponsor();
    setSponsorOptions(
      sponsors.map((sponsor) => ({
        label: sponsor.name,
        value: sponsor.name,
        key: sponsor._id,
      }))
    );
  }, []);
  useLayoutEffect(() => {
    getOption();
  }, [getOption]);
  function handleDiviceSelectedChange(values) {
    setDeviceSeleted(values);
  }
  function handleSponsorSelectedChange(values) {
    setSponsorSeleted(values);
  }
  useEffect(() => {
    if (user.role === "sinhVien") {
      next("/home");
    }
  }, [user, next]);
  const handleCheckSeat = (value, checked) => {
    if (!checked) {
      const list = specialSeatCheck.filter((item) => {
        return item !== value;
      });
      setSpecialSeatCheck(list);
    } else {
      setSpecialSeatCheck([...specialSeatCheck, value]);
    }
  };
  const submit = async (data) => {
    const selectDay = new Date(data.date);
    const today = new Date();
    if (selectDay.getTime() < today.getTime()) {
      ModalConTextt.setShow(true);
      ModalConTextt.setMess("Xin vui lòng chọn ngày diễn ra trong tương lai!");
      ModalConTextt.setType("danger");
    } else {
      // console.log("ngay ban chon ok");
      let payload = {
        name: data.name,
        author: data.email,
        date: data.date.split("-").reverse().toString().replace(/,/g, "/"), // format date -> dd/mm/yyyy
        // limit: radioCheck === "all" ? radioCheck : data.linkDs,
        type: typeEvent,
        limit: radioCheck === "all" ? radioCheck : dssv.length,
        time: radioTimeCheck,
        specialSeat: specialSeatCheck,
        devices: deviceOptions.filter((o) => {
          return deviceSelected.includes(o.label);
        }),
        sponsors: sponsorOptions.filter((o) => {
          return sponsorSelected.includes(o.label);
        }),
        dssv: dssv,
      };
      const createPendingEvent = async () => {
        const res = await eventApi.createPendingEvent(payload);
        if (res.state === "success") {
          ModalConTextt.setShow(true);
          ModalConTextt.setMess(
            "Tạo thành công, chúng tôi sẽ xem xét và liên hệ với bạn qua email!"
          );
          ModalConTextt.setType("success");
        } else {
          ModalConTextt.setShow(true);
          ModalConTextt.setMess("Có lỗi xảy ra, vui lòng đăng ký lại!");
          ModalConTextt.setType("danger");
        }
      };
      createPendingEvent();
    }
  };

  return (
    <div className={cx("wrapper")}>
      <PreViewModal
        users={dssv ? dssv : []}
        open={preview}
        onCancel={() => setPreview(false)}
      />
      <Container>
        <div className={cx("form-container")}>
          <h2 className="text-center">Tạo sự kiện</h2>
          <Form
            onSubmit={handleSubmit(submit)}
            className={cx("form-container__main")}
          >
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Control
                type="text"
                name="name"
                placeholder="Tên sự kiện"
                spellCheck={false}
                {...register("name", { required: true })}
              />
              {errors.name?.type === "required" && (
                <p className="text-danger">Vui lòng nhập tên sự kiện!</p>
              )}
            </Form.Group>
            {/* Check type event */}
            <Form.Group className="mb-3" controlId="formBasicClass">
              <span>Chọn loại sự kiện?</span>
              {typesEvent.map((type) => {
                return (
                  <Form.Check
                    type={"radio"}
                    id={type.id}
                    name="typeEvent"
                    value={type.value}
                    label={`${type.label}
                    ( ${type.description})`}
                    {...register("typeEvent")}
                    defaultChecked={type.defaultChecked && true}
                  />
                );
              })}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMssvsdad">
              <Form.Control
                type="date"
                name="date"
                placeholder="Ngày tổ chức vd: 01/02/2022"
                spellCheck={false}
                {...register("date", { required: true })}
              />
              {errors.date?.type === "required" && (
                <p className="text-danger">Vui lòng nhập ngày tổ chức!</p>
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
                <p className="text-danger">Vui lòng nhập email!</p>
              )}
              {errors.email?.type === "pattern" && (
                <p className="text-danger">Vui lòng kiểm tra lại email!</p>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <SelectDevices
                title={"thiết bị để mượn"}
                selected={deviceSelected}
                handleChange={handleDiviceSelectedChange}
                options={deviceOptions}
                changeQuantity={changeQuantity}
              />
              <SelectDevices
                title={"nhà tài trợ"}
                selected={sponsorSelected}
                handleChange={handleSponsorSelectedChange}
                isDevice={false}
                options={sponsorOptions}
                changeQuantity={() => {
                  console.log("not use");
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicClass2">
              <span>Sự kiện diễn ra vào?</span>
              <Form.Check
                type={"radio"}
                id={`default-radio3`}
                name="time"
                value={"Sáng"}
                label={`Sáng 7AM - 11AM`}
                onChange={(e) => setRadioTimeCheck(e.target.value)}
                defaultChecked
              />

              <Form.Check
                type={"radio"}
                id={`default-radio4`}
                name="time"
                value={"Chiều"}
                label={`Chiều 1PM - 5AM`}
                onChange={(e) => setRadioTimeCheck(e.target.value)}
              />

              <Form.Check
                type={"radio"}
                id={`default-radio5`}
                name="time"
                value={"Tối"}
                label={`Tối 6PM - 10PM`}
                onChange={(e) => setRadioTimeCheck(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicClass3">
              <span>Hàng ghế nào không dành cho sinh viên?</span>
              <div className="d-flex gap-4">
                {specialSeatCheckFirst.map((item) => {
                  return (
                    <Form.Check
                      type={"checkbox"}
                      className="specialSeatCheck"
                      name="time"
                      value={item}
                      label={item}
                      onChange={(e) =>
                        handleCheckSeat(e.target.value, e.target.checked)
                      }
                    />
                  );
                })}
              </div>
              <div className="d-flex gap-4">
                {specialSeatCheckSencond.map((item) => {
                  return (
                    <Form.Check
                      type={"checkbox"}
                      className="specialSeatCheck"
                      name="time"
                      value={item}
                      label={item}
                      onChange={(e) =>
                        handleCheckSeat(e.target.value, e.target.checked)
                      }
                    />
                  );
                })}
              </div>
              <div className="d-flex gap-4">
                {specialSeatCheckThird.map((item) => {
                  return (
                    <Form.Check
                      type={"checkbox"}
                      className="specialSeatCheck"
                      name="time"
                      value={item}
                      label={item}
                      onChange={(e) =>
                        handleCheckSeat(e.target.value, e.target.checked)
                      }
                    />
                  );
                })}
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicClass4">
              <span>Ai có thể tham gia?</span>
              <Form.Check
                type={"radio"}
                id={`default-radio1`}
                name="limit"
                value={"all"}
                label={`Tất cả sinh viên`}
                onChange={(e) => setRadioCheck(e.target.value)}
                defaultChecked
              />

              <Form.Check
                type={"radio"}
                name="limit"
                value={"limit"}
                onChange={(e) => setRadioCheck(e.target.value)}
                id={`default-radio2`}
                label={`Danh sách đính kèm`}
              />
            </Form.Group>
            {radioCheck === "limit" && (
              <>
                <Form.Group className="mb-3 ms-4" controlId="formBasicClass5">
                  <Form.Check
                    defaultChecked
                    type={"radio"}
                    name="typeDssv"
                    value={"file"}
                    onChange={(e) => {
                      resetField("dssv");
                      setTypeDssv(e.target.value);
                    }}
                    id={`default-radio2`}
                    label={`Thêm tệp có sẵn`}
                  ></Form.Check>
                  <Form.Check
                    type={"radio"}
                    name="typeDssv"
                    value={"link"}
                    onChange={(e) => {
                      resetField("dssv");
                      setTypeDssv(e.target.value);
                    }}
                    id={`default-radio2`}
                    label={`Thêm đường dẫn tệp`}
                  ></Form.Check>
                  <InputGroup>
                    {typeDssv === "file" ? (
                      <Form.Control
                        type="file"
                        name="dssv"
                        spellCheck={false}
                        {...register("dssv", { required: true })}
                      />
                    ) : (
                      <Form.Control
                        type="text"
                        name="dssv"
                        placeholder="Link danh sách"
                        spellCheck={false}
                        {...register("dssv", { required: true })}
                      />
                    )}
                    <ButtonToolbar>
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip id="tooltip">
                            <strong>Xem danh sách</strong>
                          </Tooltip>
                        }
                      >
                        <Button
                          onClick={() => setPreview(!preview)}
                          disabled={!dssvFile}
                        >
                          <BiTable></BiTable>
                        </Button>
                      </OverlayTrigger>
                    </ButtonToolbar>
                  </InputGroup>
                </Form.Group>
              </>
            )}
            <Form.Group className="mb-3 ms-4" controlId="formBasicClass6">
              {errors.dssv?.type === "required" && (
                <p className="text-danger">Vui lòng cung cấp danh sách!</p>
              )}
            </Form.Group>

            <Button type="submit" className={cx("register", "w-100", "mt-4")}>
              Tạo sự kiện
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default CreateEvent;
