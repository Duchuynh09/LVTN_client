import React, { Fragment, useCallback, useLayoutEffect, useState } from "react";
import devicesApi from "../../api/devicesApi";
import { Button, Form, Input, InputNumber } from "antd";
import "./DeviceManager.scss";
import TableManager from "../../components/TableManager";
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? <InputNumber className="w-100" /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        inputType === "number" ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                min: 1,
                type: "number",
                message: `${title} phải > 0 !`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Nhập ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        )
      ) : (
        children
      )}
    </td>
  );
};
function DeviceManager() {
  const [form] = Form.useForm();
  const [devices, setDevices] = useState();
  const [loading, setLoading] = useState();
  const [editingKey, setEditingKey] = useState("");
  const getData = useCallback(async () => {
    setLoading(true);
    const response = await devicesApi.getAllDevice();
    setDevices(response);
    setLoading(false);
  }, []);
  useLayoutEffect(() => {
    getData();
  }, [getData]);
  const isEditing = (record) => record._id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record._id);
  };
  const cancel = () => {
    setEditingKey("");
  };
  // Hủy tạo
  const cancelCreate = () => {
    setDevices([...devices.filter((device) => device._id !== "newData")]);
    setEditingKey("");
  };
  const handleAdd = () => {
    const newData = {
      _id: "newData",
      name: "",
      stock: 1,
      description: ``,
    };
    edit(newData);
    setDevices([...devices, newData]);
  };
  const deleteDevice = async (id) => {
    await devicesApi.deleteDevice(id);
    getData();
  };
  function capitalizeFLetter(string = "") {
    return string[0].toUpperCase() + string.slice(1);
  }
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      if (key === "newData") {
        setLoading(true);
        row.name = capitalizeFLetter(row.name);
        row.description = capitalizeFLetter(row.description);
        await devicesApi.createDevice(row);
        setLoading(false);
      } else {
        setLoading(true);
        await devicesApi.updateDevice(row, key);
        setLoading(false);
      }
      getData();
      setEditingKey("");
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      render: (item, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Số lượng đang có",
      dataIndex: "stock",
      key: "stock",
      editable: true,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      editable: true,
    },
    {
      title: "Chức năng",
      render: (item, record, index) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              className="btn btn-success"
              onClick={() => save(record._id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Button>
            {record.name ? (
              <Button className="btn btn-secondary" onClick={cancel}>
                Hủy
              </Button>
            ) : (
              <Button className="btn btn-secondary" onClick={cancelCreate}>
                Hủy
              </Button>
            )}
          </span>
        ) : (
          <Fragment>
            <Button
              style={{
                marginRight: 8,
              }}
              className="btn btn-warning"
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Sửa
            </Button>
            <Button
              className="btn btn-danger"
              disabled={editingKey !== ""}
              onClick={() => deleteDevice(item._id)}
            >
              Xóa
            </Button>
          </Fragment>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "stock" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <TableManager
      title={"thiết bị"}
      EditableCell={EditableCell}
      form={form}
      editingKey={editingKey}
      loading={loading}
      columns={mergedColumns}
      data={devices}
      handleAdd={handleAdd}
    />
  );
}

export default DeviceManager;
