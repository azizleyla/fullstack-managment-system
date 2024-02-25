import { Previous, Paginator, PageGroup, Next } from "chakra-paginator";
import React from "react";
import {
  seperatorStyles,
  normalStyles,
  activeStyles,
} from "utils/styleconstant";

const Pagination = ({ curPage, lastPage, handlePageClick }) => {
  return (
    <Paginator
      activeStyles={activeStyles}
      currentPage={curPage}
      innerLimit={1}
      // isDisabled={isPaginatorDisabled}
      normalStyles={normalStyles}
      onPageChange={handlePageClick}
      outerLimit={1}
      pagesQuantity={lastPage}
      separatorStyles={seperatorStyles}
    >
      <Previous
        _hover={{ borderRadius: "0", bg: "#E2E8F0" }}
        bg="white"
        borderLeftRadius="0"
      >
        Previous
        {/* Or an icon from `react-icons` */}
      </Previous>
      <PageGroup align="center" />
      <Next _hover={{ borderRadius: "0", bg: "#E2E8F0" }} bg="white">
        Next
      </Next>
    </Paginator>
  );
};

export default Pagination;
