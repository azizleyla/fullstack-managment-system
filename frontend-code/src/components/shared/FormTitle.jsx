import { Text } from "@chakra-ui/react";
import React from "react";

const FormTitle = ({ text }) => {
  return (
    <Text fontWeight="bold" margin="20px 0" fontSize="18px">
      {text}
    </Text>
  );
};

export default FormTitle;
