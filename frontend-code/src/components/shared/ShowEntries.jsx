import { Select, Text } from "@chakra-ui/react";
import React from "react";

const ShowEntries = ({ limit, setLimit }) => {
  return (
    <>
      <Text mr={2}>Show</Text>
      <div>
        <Select value={limit} onChange={(e) => setLimit(e.target.value)}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </Select>
      </div>
      <Text ml={2}>entries</Text>
    </>
  );
};

export default ShowEntries;
