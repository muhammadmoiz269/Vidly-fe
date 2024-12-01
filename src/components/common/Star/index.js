import { Rate } from "antd";
import React from "react";

const Star = ({ value, setValue, disabled }) => {
  return <Rate disabled={disabled} value={value} onChange={setValue} />;
};

export default Star;
