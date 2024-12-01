import { Radio } from "antd";
import React from "react";

const RadioBox = ({ radioList, value, onChange }) => {
  return (
    <Radio.Group onChange={onChange} value={value}>
      {radioList?.map((item) => (
        <Radio value={item.value}>{item.name}</Radio>
      ))}
    </Radio.Group>
  );
};

export default RadioBox;
