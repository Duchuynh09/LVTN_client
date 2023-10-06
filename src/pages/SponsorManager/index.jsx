import { Button, Form, Tooltip } from "antd";
import { useCallback, useLayoutEffect, useState } from "react";
import sponsorApi from "../../api/sponsorApi.js";
import TableManager from "../../components/TableManager";
import { EditableCell } from "./EditableCell.jsx";
function SponsorManager() {
  const [form] = Form.useForm();
  const [sponsors, setSponsors] = useState();
  const [loading, setLoading] = useState();
  const [editingKey, setEditingKey] = useState("");
  const getData = useCallback(async () => {
    setLoading(true);
    const response = await sponsorApi.getAllSponsor();
    setSponsors(response);
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
    setSponsors([...sponsors.filter((sponsor) => sponsor._id !== "newData")]);
    setEditingKey("");
  };
  const handleAdd = () => {
    const newData = {
      _id: "newData",
      name: "",
      address: "",
      phone: 1234567890,
    };
    edit(newData);
    setSponsors([...sponsors, newData]);
  };
  const deleteSponsor = async (id) => {
    await sponsorApi.deleteSponsor(id);
    getData();
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      if (key === "newData") {
        setLoading(true);
        await sponsorApi.createSponsor(row);
        setLoading(false);
      } else {
        setLoading(true);
        await sponsorApi.updateSponsor(row, key);
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
      width: 30,
      render: (item, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      editable: true,
      render: (item, records, index) =>
        records.abbreviated_name
          ? `${item}(${records.abbreviated_name})`
          : item,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: "50%",
      editable: true,
      ellipsis: {
        showTitle: false,
      },
      render: (address) => (
        <Tooltip placement="topLeft" title={address}>
          {address}
        </Tooltip>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      render: (item, records, index) =>
        `0${item}`.replace(/\B(?=(\d{4})+(?!\d))/g, "-"),
      key: "phone",
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
          <>
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
              onClick={() => deleteSponsor(item._id)}
            >
              Xóa
            </Button>
          </>
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
        inputType: col.dataIndex === "phone" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <TableManager
      EditableCell={EditableCell}
      form={form}
      editingKey={editingKey}
      loading={loading}
      columns={mergedColumns}
      data={sponsors}
      handleAdd={handleAdd}
    />
  );
}

export default SponsorManager;
