import React, { useState, useContext } from "react";
import {
  Button,
  Avatar,
  Modal,
  Form,
  Input,
  message,
  Upload,
  Typography,
} from "antd";
import MyEditor from "./MyEditor"; // Import MyEditor từ thư mục của bạn
import { UploadOutlined } from "@ant-design/icons";
import { getBase64, beforeUpload } from "./imgCheck";
import Title from "antd/es/typography/Title";
import postsApi from "../../api/postsApi";

export default function PostCreate({ idEvent, handleCancel, openModal }) {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [editorData, setEditorData] = useState(""); // Thêm state để lưu dữ liệu của CKEditor
  const handleChange = (info) => {
    getBase64(info.file.originFileObj, (url) => {
      setImageUrl(url);
    });
    setImageFile(info.file.originFileObj);
  };

  const onFinish = async ({ title, ...values }) => {
    // Gửi dữ liệu và URL hình ảnh lên máy chủ hoặc xử lý theo ý của bạn ở đây.
    const formData = new FormData();
    formData.append("title", title);
    formData.append("user", JSON.parse(localStorage.getItem("user")).email);
    formData.append("description", editorData);
    formData.append("idEvent", idEvent);

    if (imageFile) {
      formData.append("image", imageFile);
    }
    // Thực hiện các thao tác gửi dữ liệu lên máy chủ ở đây.
    // Thay bằng model của thăng Vĩ +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    const repsponse = await postsApi.createPost(formData);
    if (repsponse.post) {
      message.success("tạo bài đăng thành công");
      handleCancel();
      form.resetFields();
      setEditorData("");
      setImageFile(null);
      setImageUrl(null);
    } else message.error(repsponse);
  };

  return (
    <Modal
      onCancel={handleCancel}
      open={openModal}
      title={
        <h2 style={{ display: "flex", justifyContent: "center" }}>
          Tạo bài viết
        </h2>
      }
      footer={[
        <Button
          type="text"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          className="btn btn-dark"
          onClick={form.submit}
        >
          Đăng
        </Button>,
      ]}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item name="title">
          <Input.TextArea
            bordered={false}
            size={"large"}
            placeholder="Vui lòng nhập tiêu đề "
            autoSize
          />
        </Form.Item>
        <hr />
        <Upload
          name="avatar"
          // listType="picture"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Hình ảnh"
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Tải ảnh</div>
            </div>
          )}
        </Upload>
        <hr />
        <Form.Item
          style={{
            color: "black",
          }}
        >
          <Typography>
            <Title style={{ textAlign: "center", marginTop: 10 }} level={3}>
              Nhập thông tin chính của bài viết
            </Title>
          </Typography>
          <MyEditor
            modules={true}
            data={editorData}
            handleChange={(data) => setEditorData(data)}
          />
        </Form.Item>
      </Form>
    </Modal>
    // </div>
  );
}
