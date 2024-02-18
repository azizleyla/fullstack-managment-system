import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardHeader,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import AlertDialogBox from "../common/AlertDialog";

const EmployeList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <TableContainer>
        <Table
          border="1px"
          borderRadius="10px"
          borderColor="gray.200"
          variant="simple"
        >
          <Thead>
            <Tr>
              <Th>FirstName</Th>
              <Th>LastName</Th>
              <Th>Email</Th>
              <Th>Gender</Th>
              <Th>Role</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Leyla</Td>
              <Td>Aziz</Td>
              <Td>leyla@gmail.com</Td>
              <Td>Female</Td>
              <Td>Driver</Td>
              <Td>
                <Button bgColor="transparent">
                  <EditIcon color="green" />
                </Button>
                <Button bgColor="transparent" onClick={onOpen}>
                  <DeleteIcon color="red" />
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>Ali </Td>
              <Td>Aghayev</Td>
              <Td>ali@gmail.com</Td>
              <Td>Male</Td>
              <Td>Driver</Td>

              <Td>
                <Button bgColor="transparent">
                  <EditIcon color="green" />
                </Button>
                <Button bgColor="transparent">
                  <DeleteIcon color="red" />
                </Button>
              </Td>
            </Tr>
            <Tr>
              <Td>Aytac </Td>
              <Td>Mamedova</Td>
              <Td>aytac@gmail.com</Td>
              <Td>Female</Td>
              <Td>Farmer</Td>

              <Td>
                <Button bgColor="transparent">
                  <EditIcon color="green" />
                </Button>
                <Button bgColor="transparent">
                  <DeleteIcon color="red" />
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <AlertDialogBox
        text="Delete Employee"
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default EmployeList;
