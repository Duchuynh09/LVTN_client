import { Form, Input, InputNumber } from "antd";
import { useState } from "react";

export const EditableCell = ({
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
    inputType === "number" ? (
      <InputNumber prefix="+84:" className="w-100" />
    ) : (
      <Input />
    );
  return (
    <td {...restProps}>
      {editing ? (
        inputType === "number" ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
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
