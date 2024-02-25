import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import React from "react";

const Tags = ({ tags,deleteTag}) => {
  return tags.map((item) => (
    <Tag bg="#EBEFF8" m="2px 5px" borderRadius="4px" key={item.id}>
      <TagLabel fontSize="13px">{item.value}</TagLabel>
      <TagCloseButton onClick={() => deleteTag(item.id)} />
    </Tag>
  ));
};

export default Tags;
