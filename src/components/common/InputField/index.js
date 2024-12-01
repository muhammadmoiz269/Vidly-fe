import React from "react";
import { Form, Input, InputNumber } from "antd";

const InputField = ({ label, name, rules, type }) => {
  return (
    <Form.Item label={label} name={name} rules={rules}>
      {type === "password" ? (
        <Input.Password />
      ) : type === "number" ? (
        <InputNumber />
      ) : (
        <Input />
      )}
    </Form.Item>
  );
};

export default InputField;
