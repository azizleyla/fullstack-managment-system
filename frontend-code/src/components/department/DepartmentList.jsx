import React, { Suspense, useCallback, useEffect, useState } from "react";
import AlertDialogBox from "../shared/AlertDialog";
import GeneralSkeleton from "../shared/GeneralSkeleton";
import Pagination from "components/shared/Pagination";
import AddDepartmentModal from "../modal/AddDepartmentModal";
import useSWR from "swr";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Checkbox,
  Flex,
  HStack,
  Input,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { Switch } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { initialValues } from "utils/helper";
import ShowEntries from "components/shared/ShowEntries";
import { AddButton } from "components/shared";

const baseUrl = process.env.REACT_APP_BASE_URL;

const DepartmentList = () => {
  const deleteModal = useDisclosure();
  const addModal = useDisclosure();
  const [selectedDep, setSelectedDep] = useState(initialValues());
  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState(null);

  const {
    data: departments,
    error,
    isLoading,
    mutate,
  } = useSWR(
    `${baseUrl}departments/index?${
      searchQuery
        ? `search&query=${searchQuery}&page=${curPage}`
        : `page=${curPage}`
    }&limit=${limit}`,
    {
      suspense: true,
    },
  );

  const [checkedItems, setCheckedItems] = useState(
    departments?.data?.map(() => false),
  );

  const [selectedIds, setSelectedIds] = useState([]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;
  const isShowDeleteBtn =
    (checkedItems.length > 0 ? allChecked : false) || isIndeterminate;

  const handlePageClick = (page) => {
    setCurPage(page);
  };

  const handleDelete = async () => {
    try {
      if (allChecked || isIndeterminate) {
        let allIds = departments.data.map((x) => x.id);
        let ids = { ids: selectedIds.length > 0 ? selectedIds : allIds };

        await axios.post(`${baseUrl}departments/destroy-ids`, ids);

        setCheckedItems(
          departments.data.length > 0
            ? departments.data.map(() => false)
            : false,
        );
        setSelectedIds([]);
      } else {
        await axios.post(
          `${baseUrl}departments/destroy/${selectedDep.id}`,
        );
      }

      setCurPage(1);
      mutate();
      setSelectedDep(initialValues());

      toast.success("Department deleted successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleChange = async (e, id) => {
    let data = { is_active: e.target.checked };
    try {
      await axios.post(`${baseUrl}departments/update-status/${id}`, data);
      mutate();
    } catch (e) {
      console.error("Error deleting data:", e);
    }
  };

  const handleSearch = useCallback(
    (e) => {
      setSearchQuery(e.target.value);
      setCurPage(1);
    },
    [searchQuery],
  );

  if (error) return <p>Error loading data</p>;
  if (isLoading) return <GeneralSkeleton />;

  return (
    <Suspense fallback={<p>Loading..</p>}>
      <Text fontSize="27px" mb={10} color="#9BA5CA">
        Department
      </Text>
      <TableContainer padding="20px" borderRadius="13px" bgColor="white">
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontWeight="bold" margin="20px 0">
            Department
          </Text>
          {isShowDeleteBtn && (
            <Button
              onClick={handleDelete}
              ml={15}
              bg="transparent"
              border="1px"
              borderColor="#d3dfea"
            >
              <DeleteIcon color="#17263A" mr={2} />
              Delete
            </Button>
          )}

          <AddButton
            isRedirect={false}
            text="Add Department"
            addModal={addModal}
            setSelectedFunc={setSelectedDep}
          />
        </Flex>
        <Flex alignItems="center" my="20px">
          <ShowEntries limit={limit} setLimit={setLimit} />
          <Spacer />
          {/* <Box>aa</Box> */}
          <Input
            onKeyDown={(e) => handleSearch(e)}
            borderRadius="5px"
            width="180px"
            focusBorderColor="blue.300"
            size="md"
            placeholder="Search..."
          />
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th color="#263871" width="16px">
                No.
              </Th>
              <Th width="16px">
                <Checkbox
                  disabled={departments.data.length == 0}
                  isChecked={checkedItems.length > 0 ? allChecked : false}
                  onChange={(e) =>
                    setCheckedItems(
                      departments.data.map(() => e.target.checked),
                    )
                  }
                />
              </Th>
              <Th color="#263871">Department Name</Th>
              <Th color="#263871" width="40px">
                Status
              </Th>
              <Th color="#263871" width="80px">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {departments.data.map((item, index) => (
              <Tr key={item.id}>
                <Td>{index + 1}</Td>
                <Td>
                  <Checkbox
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      const itemId = item.id;
                      if (isChecked) {
                        // If the checkbox is checked, add the item ID to selectedIds
                        setSelectedIds((prevSelectedIds) => [
                          ...prevSelectedIds,
                          itemId,
                        ]);
                      } else {
                        // If the checkbox is unchecked, remove the item ID from selectedIds
                        setSelectedIds((prevSelectedIds) =>
                          prevSelectedIds.filter((id) => id !== itemId),
                        );
                      }

                      setCheckedItems([
                        ...checkedItems.slice(0, index),
                        e.target.checked,
                        ...checkedItems.slice(index + 1),
                      ]);
                    }}
                    isChecked={checkedItems[index]}
                  />
                </Td>
                <Td>{item.name}</Td>

                <Td>
                  <Switch
                    isChecked={item.is_active}
                    onChange={(e) => handleChange(e, item.id)}
                    size="md"
                  />
                </Td>
                <Td>
                  <HStack>
                    <Button
                      onClick={() => {
                        addModal.onOpen();
                        setSelectedDep(item);
                      }}
                      border="1px"
                      borderColor="#ccc"
                      padding="3px 5px"
                      bgColor="transparent"
                    >
                      <EditIcon color="#3368FF" />
                    </Button>
                    <Button
                      padding="3px 5px"
                      border="1px"
                      borderColor="#ccc"
                      bgColor="transparent"
                      onClick={() => {
                        deleteModal.onOpen();
                        setSelectedDep(item);
                      }}
                    >
                      <DeleteIcon color="red" />
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Flex my={5} alignItems="center">
          <Text>
            Showing page {departments.current_page} of{" "}
            {departments.last_page}
          </Text>
          <Spacer />
          <div className="pagination-container">
            <Pagination
              curPage={curPage}
              lastPage={departments.last_page}
              handlePageClick={handlePageClick}
            />
          </div>
        </Flex>
      </TableContainer>

      {createPortal(
        <AlertDialogBox
          handleDelete={handleDelete}
          text="Delete Department"
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.onClose}
        />,
        document.body,
      )}
      {createPortal(
        <AddDepartmentModal
          limit={limit}
          page={curPage}
          setCurPage={setCurPage}
          selectedDep={selectedDep}
          isOpen={addModal.isOpen}
          onClose={addModal.onClose}
        />,
        document.body,
      )}
    </Suspense>
  );
};

export default DepartmentList;
