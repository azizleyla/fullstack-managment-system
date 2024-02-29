import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { FormTitle } from "components/shared";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const UserImport = () => {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file);
    try {
      await axios.post("http://your-laravel-api-url/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <FormTitle text="User Import" />
      <Card>
        <CardHeader>
          <Heading size="md">Import file</Heading>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel>Upload File</FormLabel>
            <Controller
              rules={{ required: true }}
              name="file"
              control={control}
              render={({ field }) => (
                <Input
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  placeholder="mysite"
                  {...field}
                />
              )}
            />
          </form>
        </CardBody>
        <Divider border="1px solid #e6ebf1" />
        <CardFooter>
          <Button
            type="click"
            onClick={handleSubmit(onSubmit)}
            ml="auto"
            colorScheme="blue"
          >
            Import Data
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserImport;
