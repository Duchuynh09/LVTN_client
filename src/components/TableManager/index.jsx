import { ConfigProvider, Typography, Button, Form, Table } from "antd";
import React from "react";

function TableManager({
  form,
  loading,
  editingKey,
  handleAdd,
  columns,
  data,
  EditableCell,
}) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#212529",
            headerColor: "#fff",
            rowHoverBg: "#323539",
            headerBorderRadius: 0,
            colorText: "#fff",
            colorBgContainer: "#2c3034",
          },
        },
      }}
    >
      <main className="wrapper">
        <Typography.Title level={2} className="text-center mt-3">
          Các thiết bị sẵn có
        </Typography.Title>
        <Form form={form} component={false}>
          <Button
            disabled={editingKey !== ""}
            onClick={handleAdd}
            style={{
              backgroundColor: "#1C57A5",
              marginBottom: 16,
            }}
          >
            Thêm thiết bị
          </Button>
          <Table
            loading={loading}
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={columns}
          />
        </Form>
      </main>
      ;
    </ConfigProvider>
  );
}

export default TableManager;
