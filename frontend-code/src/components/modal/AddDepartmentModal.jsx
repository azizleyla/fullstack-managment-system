import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  defineStyleConfig,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { baseUrl } from "../../utils/constants";
import { mutate } from "swr";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const schema = yup
  .object({
    name: yup.string().required("The departmentname field is required."),
  })
  .required();

const CloseBtnStyle = defineStyleConfig({
  _hover: {
    backgroundColor: "red.500",
    color: "white",
  },
});
const SaveBtnStyle = defineStyleConfig({
  _hover: {
    opacity: 0.8,
  },
});

const AddDepartmentModal = ({ isOpen, onClose, selectedDep }) => {
  const onSubmit = async (data) => {
    try {
      if (selectedDep.id) {
        await axios.post(
          `${baseUrl}departments/update/${selectedDep.id}`,
          data,
        );
      } else {
        await axios.post(`${baseUrl}departments/store`, data);
      }
      // Invalidate the SWR cache for the specified endpoint
      mutate(`${baseUrl}departments/index`);
      // onClose();
      window.location.reload();
      setTimeout(() => {
        toast.success("Deparment added successfully");
      }, 3000);
    } catch (error) {
      console.error("Error occured");
    }
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    console.log(selectedDep);
    if (selectedDep) {
      reset(selectedDep);
    }
  }, [selectedDep]);

  return (
    <Modal
      size="3xl"
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="16px">
          {selectedDep.name ? "Edit Department" : "Add New Department"}
        </ModalHeader>
        <Divider />

        <ModalCloseButton />
        <ModalBody p="15px 20px">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel fontSize="14px">Department Name</FormLabel>
            <Controller
              rules={{ required: true }}
              name="name"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
            {errors.name ? (
              <span class="error-msg">{errors.name.message}</span>
            ) : null}

            <Controller
              name="is_active"
              control={control}
              render={({ field: { value, onChange } }) => (
                <>
                  <FormLabel>Status</FormLabel>
                  <Switch
                    onChange={(e) => onChange(e.target.checked)}
                    isChecked={value}
                    label="Status"
                  />
                </>
              )}
            />
          </form>
        </ModalBody>

        <ModalFooter>
          <Button
            {...CloseBtnStyle}
            bg="transparent"
            border="1px"
            color="red.500"
            borderColor="red.500"
            mr={3}
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            type="click"
            onClick={handleSubmit(onSubmit)}
            {...SaveBtnStyle}
            color="white"
            bg="#184780"
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddDepartmentModal;
