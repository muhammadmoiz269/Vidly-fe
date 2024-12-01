import { Flex, Tag } from "antd";
import React from "react";

const Chips = ({ tagsData, selectedTags, handleChange }) => {
  return (
    <Flex gap={4} wrap align="center">
      <span>Categories:</span>
      {tagsData.map((tag) => (
        <Tag.CheckableTag
          key={tag}
          checked={selectedTags.includes(tag)}
          onChange={(checked) => handleChange(tag, checked)}
        >
          {tag}
        </Tag.CheckableTag>
      ))}
    </Flex>
  );
};

export default Chips;
