import React, { Suspense, useCallback, useEffect, useState } from "react";
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
import { Switch } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import AlertDialogBox from "../shared/AlertDialog";
import useSWR from "swr";
import axios from "axios";
import GeneralSkeleton from "../shared/GeneralSkeleton";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { initialValues } from "utils/helper";

import Pagination from "components/shared/Pagination";
import ShowEntries from "components/shared/ShowEntries";
import { Link, useNavigate, useRoutes } from "react-router-dom";
import { AddButton } from "components/shared";

const baseUrl = process.env.REACT_APP_BASE_URL;

const DepartmentList = () => {
  const deleteModal = useDisclosure();
  const addModal = useDisclosure();
  const [selectedEmp, setSelectedEmp] = useState(initialValues());
  const [curPage, setCurPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchQuery, setSearchQuery] = useState(null);

  const { data, error, isLoading, mutate } = useSWR(
    `${baseUrl}employees/index?page=${curPage}&limit=${limit}`,
  );
  const employees = data?.employees;
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState(
    employees?.data?.map(() => false),
  );
  const allChecked = checkedItems?.every(Boolean);
  const isIndeterminate = checkedItems?.some(Boolean) && !allChecked;
  const isShowDeleteBtn =
    (checkedItems?.length > 0 ? allChecked : false) || isIndeterminate;

  const [selectedIds, setSelectedIds] = useState([]);

  const handlePageClick = (page) => {
    setCurPage(page);
  };

  const handleDelete = async () => {
    try {
      if (allChecked || isIndeterminate) {
        let allIds = employees.data.map((x) => x.id);
        let ids = { ids: selectedIds.length > 0 ? selectedIds : allIds };

        await axios.post(`${baseUrl}employees/destroy-ids`, ids);

        setCheckedItems(
          employees.data.length > 0
            ? employees.data.map(() => false)
            : false,
        );
        setSelectedIds([]);
      } else {
        await axios.post(`${baseUrl}employees/destroy/${selectedEmp.id}`);
      }

      setCurPage(1);
      mutate();
      setSelectedEmp(initialValues());

      toast.success("Department deleted successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleChange = async (e, id) => {
    let data = { is_active: e.target.checked };
    try {
      await axios.post(`${baseUrl}employees/update-status/${id}`, data);
      mutate();
    } catch (e) {
      console.error("Error changin status data:", e);
    }
  };

  if (error) return <p>Error loading data</p>;
  if (isLoading) return <GeneralSkeleton />;

  return (
    <Suspense fallback={<p>Loading..</p>}>
      <Text fontSize="27px" mb={10} color="#9BA5CA">
        Employee
      </Text>
      <TableContainer padding="20px" borderRadius="13px" bgColor="white">
        <Flex alignItems="center" justifyContent="space-between">
          <Text fontWeight="bold"  margin="20px 0">
            Employee
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
            isRedirect={true}
            text="Add Employee"
            addModal={addModal}
            setSelectedFunc={setSelectedEmp}
          />
        </Flex>
        <Flex alignItems="center" my="20px">
          
          <ShowEntries limit={limit} setLimit={setLimit} />

          <Spacer />
          {/* <Box>aa</Box> */}
          <Input
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
                  disabled={employees.data.length == 0}
                  isChecked={checkedItems?.length > 0 ? allChecked : false}
                  onChange={(e) =>
                    setCheckedItems(
                      employees.data.map(() => e.target.checked),
                    )
                  }
                />
              </Th>
              <Th color="#263871">Employee Name</Th>
              <Th color="#263871" width="40px">
                Email
              </Th>
              <Th color="#263871" width="30px">
                Department
              </Th>
              <Th color="#263871" width="40px">
                Status
              </Th>

              <Th color="#263871" width="80px">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.data.map((item, index) => (
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
                    // isChecked={checkedItems[index]}
                  />{" "}
                </Td>
                <Td>
                  {item.firstname} {item.lastname}
                </Td>
                <Td>{item.email}</Td>
                <Td>{item.department_name}</Td>
                {/* <Td>{item.created_date}</Td> */}

                <Td>
                  <Switch
                    onChange={(e) => handleChange(e, item.id)}
                    isChecked={item.is_active}
                    size="md"
                  />
                </Td>
                <Td>
                  <HStack>
                    <Button
                      onClick={() => {
                        addModal.onOpen();
                        setSelectedEmp(item);
                        navigate(`/admin/employee/${item.id}`);
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
                        setSelectedEmp(item);
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
            Showing page {employees.current_page} of {employees.last_page}
          </Text>
          <Spacer />
          <div className="pagination-container">
            <Pagination
              lastPage={employees.last_page}
              handlePageClick={handlePageClick}
              curPage={curPage}
            />
          </div>
        </Flex>
      </TableContainer>
      {createPortal(
        <AlertDialogBox
          handleDelete={handleDelete}
          text="Delete Employee"
          isOpen={deleteModal.isOpen}
          onClose={deleteModal.onClose}
        />,
        document.body,
      )}
    </Suspense>
  );
};

export default DepartmentList;
