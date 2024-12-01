import { Checkbox, Form } from "antd";
import React from "react";

const CheckBox = ({ name, label }) => {
  return (
    <Form.Item name={name} valuePropName="checked">
      <Checkbox>{label}</Checkbox>
    </Form.Item>
  );
};

export default CheckBox;
