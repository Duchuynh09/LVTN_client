import React from "react";
import { Button, Empty, Modal, Typography } from "antd";
import { Table } from "react-bootstrap";

function PreViewModal({ users, open, onCancel, handleExport }) {
  return (
    <Modal
      width={"fit-content"}
      title={
        <Typography.Title level={3} className="text-center">
          Bảng danh sách người dùng
        </Typography.Title>
      }
      open={open}
      onCancel={onCancel}
      footer={
        handleExport && users.length > 0
          ? [
              <Button type="primary" onClick={() => handleExport(users)}>
                Xuất file
              </Button>,
            ]
          : []
      }
    >
      <div style={{ overflow: "auto", height: 300 }}>
        {users.length > 0 ? (
          <Table striped bordered hover variant="dark" responsive={true}>
            <thead>
              <tr>
                <th>#</th>
                <th>Mã số</th>
                <th>Tên</th>
                <th>Lớp</th>
                <th>Nghành</th>
                <th>Đơn vị</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.mssv}</td>
                  <td>{item.ten}</td>
                  <td>{item.lop}</td>
                  <td>{item.nghanh}</td>
                  <td>{item.maDonVi}</td>
                  <td>{item.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Empty />
        )}
      </div>
    </Modal>
  );
}

export default PreViewModal;
