import { InputNumber, List, Select, Typography, message } from "antd";
function SelectDevices(
  { selected, handleChange, options, isDevice = true, title },
  props
) {
  return (
    <>
      <Typography.Text>Chọn {title} (nếu có)</Typography.Text>
      <Select
        className="mb-3"
        mode="multiple"
        allowClear
        placeholder={
          <Typography.Text style={{ opacity: 0.5 }}>
            Chọn {title}
          </Typography.Text>
        }
        style={{
          width: "100%",
        }}
        onChange={(item) => handleChange(item)}
        options={options.filter((o) => {
          return !selected.includes(o.label);
        })}
      />
      {isDevice && selected.length > 0 && (
        <List
          size="small"
          dataSource={options.filter((o) => {
            return selected.includes(o.label);
          })}
          renderItem={(item) => {
            return (
              <List.Item
                key={item.key}
                style={{
                  width: "50%",
                  display: "flex",

                  justifyContent: "space-between",
                }}
              >
                {item.label}
                <InputNumber
                  defaultValue={item.quantity}
                  onChange={(value) => {
                    if (value <= item.max)
                      props.changeQuantity(item.key, value);
                    else
                      message.error({
                        content: `Số lượng không đủ < ${item.max + 1}`,
                        duration: 0.8,
                      });
                  }}
                />
              </List.Item>
            );
          }}
        />
      )}
    </>
  );
}

export default SelectDevices;
