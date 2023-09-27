import { useContext, useEffect, useState } from "react";
import { Button, Form, Modal, Table } from "react-bootstrap";

import userApi from "../../api/userApi";
import ModalContext from "../../store/ModalContext";

// Quản lí sinh viên
function UserManager() {
  // bootstrap state
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  // state
  const [users, setUsers] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [typeManager, setTypeManager] = useState("all");
  const [emailUser, setEmailUser] = useState("");
  const [handleType, setHandleType] = useState("");
  const [loadData, setLoadData] = useState(false);
  const ModalContextt = useContext(ModalContext);

  useEffect(() => {
    const fectAllUser = async () => {
      const res = await userApi.getAllUser();
      setUsers(res.data);
    };
    fectAllUser();
  }, [loadData]);

  useEffect(() => {
    const fectAllLecturer = async () => {
      const res = await userApi.getLecturer();
      setLecturers(res.data);
    };
    fectAllLecturer();
  }, [loadData]);

  const handleFunction = (email, type) => {
    setEmailUser(email);
    setHandleType(type);
    setShow(true);
  };

  const handleUpLevel = async () => {
    const res = await userApi.upLevelUser({ email: emailUser });
    handleClose();
    if (res?.message === "success") {
      setLoadData(!loadData);
      ModalContextt.setMess(`Nâng quyền cho người dùng thành công!`);
      ModalContextt.setType("success");
      ModalContextt.setShow(!ModalContextt.show);
    }
  };

  const handleDelete = async () => {
    const res = await userApi.delUser({ email: emailUser });
    handleClose();
    if (res?.message === "success") {
      setLoadData(!loadData);

      ModalContextt.setMess(`Xóa tài khoản người dùng thành công!`);
      ModalContextt.setType("success");
      ModalContextt.setShow(!ModalContextt.show);
    }
  };

  return (
    <div className="wrapper">
      <div className="mt-5 d-flex justify-content-end">
        <Form.Select
          onChange={(e) => setTypeManager(e.target.value)}
          className="w-25"
          aria-label="Default select example"
        >
          <option value="all">Tất cả</option>
          <option value="sinhVien">Quản lí tài khoản sinh viên</option>
          <option value="giangVien">Quản lí tài khoản giảng viên</option>
        </Form.Select>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thao tác nguy hiểm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Thao tác này có thể ảnh hưởng đến hệ thống, vẫn tiếp tục?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>

          {handleType === "delete" ? (
            <Button variant="primary" onClick={handleDelete}>
              Tiếp tục
            </Button>
          ) : (
            <Button variant="primary" onClick={handleUpLevel}>
              Tiếp tục
            </Button>
          )}
        </Modal.Footer>
      </Modal>

      {users?.length > 0 &&
        (typeManager === "all" || typeManager === "sinhVien") && (
          <div>
            <h2 className="text-center m-5">
              Thông tin các tài khoản sinh viên
            </h2>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                  <th>Xử lí</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.email}</td>
                    <td>{item.role === "sinhVien" ? "Sinh viên" : ""}</td>
                    <td>
                      <Button
                        onClick={() => handleFunction(item.email, "uplevel")}
                      >
                        Nâng vai trò
                      </Button>
                      <Button
                        onClick={() => handleFunction(item.email, "delete")}
                        className="m-2"
                        variant="danger"
                      >
                        Xóa người dùng
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}

      {lecturers?.length > 0 &&
        (typeManager === "all" || typeManager === "giangVien") && (
          <div>
            <h2 className="text-center m-5">
              Thông tin các tài khoản giảng viên
            </h2>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Vai trò</th>
                  <th>Xử lí</th>
                </tr>
              </thead>
              <tbody>
                {lecturers?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.email}</td>
                    <td>{item.role === "giangVien" ? "Giảng viên" : ""}</td>
                    <td>
                      <Button
                        className="m-2"
                        variant="danger"
                        onClick={() => handleFunction(item.email, "delete")}
                      >
                        Xóa người dùng
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
    </div>
  );
}

export default UserManager;
