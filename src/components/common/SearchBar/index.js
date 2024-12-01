import React from "react";
import { Input, Space } from "antd";
const { Search } = Input;

const SearchBar = ({ placeholder, onSearch, style }) => {
  return <Search placeholder={placeholder} onSearch={onSearch} style={style} />;
};

export default SearchBar;
