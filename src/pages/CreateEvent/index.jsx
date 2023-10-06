import classnames from "classnames/bind";
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Container, Form, Button } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import eventApi from "../../api/eventApi";
import ModalConText from "../../store/ModalContext";

import devicesApi from "../../api/devicesApi";

import style from "../RegisterSeat/RegisterSeat.scss"; // sài chung style với trang register seat
import SelectDevices from "../../components/SelectDevices";
import sponsorsApi from "../../api/sponsorApi";

const cx = classnames.bind(style);
function CreateEvent() {
  const specialSeatCheckFirst = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const specialSeatCheckSencond = ["I", "K", "L", "M", "N", "O", "P", "Q"];
  const specialSeatCheckThird = ["R", "S", "T", "u", "v", "x", "Y", "Z"];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [deviceOptions, setDeviceOptions] = useState([]);
  const [deviceSelected, setDeviceSeleted] = useState([]);
  const [sponsorOptions, setSponsorOptions] = useState([]);
  const [sponsorSelected, setSponsorSeleted] = useState([]);

  const next = useNavigate();

  const ModalConTextt = useContext(ModalConText);
  const user = JSON.parse(localStorage.getItem("user"));

  const [radioCheck, setRadioCheck] = useState("all");
  const [radioTimeCheck, setRadioTimeCheck] = useState("Sáng");
  const [specialSeatCheck, setSpecialSeatCheck] = useState([]);

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

  const submit = (data) => {
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
        limit: radioCheck === "all" ? radioCheck : data.linkDs,
        time: radioTimeCheck,
        specialSeat: specialSeatCheck,
        devices: deviceOptions,
        sponsors: sponsorOptions,
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

            <Form.Group className="mb-3" controlId="formBasicClass2">
              <span>Hàng ghế nào không dành cho sinh viên?</span>
              <div className="d-flex gap-4">
                {specialSeatCheckFirst.forEach((item) => {
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
                {/* <div>
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"A"}
                    label={`A`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"B"}
                    label={`B`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"C"}
                    label={`C`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"D"}
                    label={`D`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"E"}
                    label={`E`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"F"}
                    label={`F`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"G"}
                    label={`G`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"H"}
                    label={`H`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />
                </div> */}
              </div>
              <div className="d-flex gap-4">
                {specialSeatCheckSencond.forEach((item) => {
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
                {/* <div>
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"I"}
                    label={`I`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"K"}
                    label={`K`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"L"}
                    label={`L`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"M"}
                    label={`M`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />{" "}
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"N"}
                    label={`N`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />{" "}
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"O"}
                    label={`O`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />{" "}
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"P"}
                    label={`P`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />{" "}
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"Q"}
                    label={`Q`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />
                </div> */}
              </div>
              <div className="d-flex gap-4">
                {specialSeatCheckThird.forEach((item) => {
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
                {/* <div>
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"R"}
                    label={`R`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"S"}
                    label={`S`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"T"}
                    label={`T`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"U"}
                    label={`U`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"V"}
                    label={`V`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"X"}
                    label={`X`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"Y"}
                    label={`Y`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />{" "}
                  <Form.Check
                    type={"checkbox"}
                    className="specialSeatCheck"
                    name="time"
                    value={"Z"}
                    label={`Z`}
                    onChange={(e) =>
                      handleCheckSeat(e.target.value, e.target.checked)
                    }
                  />
                </div> */}
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicClass">
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

              {errors.class?.type === "required" && (
                <p className="text-danger">Vui lòng nhập mã lớp của bạn!</p>
              )}
            </Form.Group>
            {radioCheck === "limit" && (
              <Form.Group className="mb-3" controlId="formBasicMajor">
                <Form.Control
                  type="text"
                  name="linkDs"
                  placeholder="Link đến danh sách"
                  spellCheck={false}
                  {...register("linkDs", { required: true })}
                />
                {errors.linkDs?.type === "required" && (
                  <p className="text-danger">
                    Vui lòng nhập đường dẫn đến danh sách!
                  </p>
                )}
              </Form.Group>
            )}

            <Button
              variant="outline-primary"
              type="submit"
              className={cx("register", "w-100", "mt-4")}
            >
              Tạo sự kiện
            </Button>
          </Form>
        </div>
      </Container>
    </div>
  );
}

export default CreateEvent;
