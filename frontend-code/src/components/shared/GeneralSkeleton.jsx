import React from "react";
import {
  Skeleton,
  Stack,
} from "@chakra-ui/react";

const GeneralSkeleton = () => {
  const skeletonItems = Array(15).fill(<Skeleton height="20px" />);

  return (
    <Stack>
      {skeletonItems.map((item, index) => (
        <React.Fragment key={index}>{item}</React.Fragment>
      ))}
    </Stack>
  );
};

export default GeneralSkeleton;
