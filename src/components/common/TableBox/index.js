import React from "react";
import { Table } from "antd";

const TableBox = ({ columns, data }) => {
  return <Table columns={columns} dataSource={data} />;
};

export default TableBox;
