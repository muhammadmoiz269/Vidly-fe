import { Form, Select } from "antd";
import React from "react";

const SelectBar = ({ label, name, mode, options }) => {
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <Form.Item label={label} name={name}>
      <Select
        showSearch
        placeholder="Select a person"
        optionFilterProp="label"
        onChange={onChange}
        onSearch={onSearch}
        options={options}
        mode={mode}
      />
    </Form.Item>
  );
};

export default SelectBar;
