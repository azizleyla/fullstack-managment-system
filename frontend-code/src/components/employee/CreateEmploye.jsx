import {
  Box,
  Button,
  ButtonGroup,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Switch,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { AddButton } from "components/shared";
import FormTitle from "components/shared/FormTitle";
import Tags from "components/shared/Tags";
import React, { Suspense, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Form, useNavigate, useParams, useRoutes } from "react-router-dom";
import { toast } from "react-toastify";
import useSWR from "swr";
import * as yup from "yup";

const baseUrl = process.env.REACT_APP_BASE_URL;

const schema = yup
  .object({
    firstname: yup.string().required("The firstname field is required."),
    lastname: yup.string().required("The lastname field is required."),
    email: yup.string().required("The email field is required."),
    department_id: yup
      .string()
      .required("The department_id field is required."),

    emp_id: yup.string().required("The EmpId field is required."),
  })
  .required();

const CreateEmploye = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [timezone, setTimeZone] = useState(null);
  const [langTags, setLangTags] = useState([]);
  const [tags, setTags] = useState([]);
  const [langValue, setLangValue] = useState("");

  const [tagValue, setTagValue] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  var aryIanaTimeZones = Intl.supportedValuesOf("timeZone");

  const { data, error, isLoading, mutate } = useSWR(
    `${baseUrl}employees/index`,
  );
  const selectedEmp = data?.employees?.data?.find(
    (x) => x.id == Number(id),
  );

  useEffect(() => {
    if (selectedEmp) {
      reset(selectedEmp);
    }
  }, [selectedEmp]);

  const onSubmit = async (data) => {
    let skills = tags.map((item) => item.value);
    let langs = langTags.map((item) => item.value);

    let dataObj = {
      ...data,
      langs,
      skills,
      timezone: timezone,
    };
    try {
      if (id) {
        await axios.post(`${baseUrl}employees/update/${id}`, dataObj);
      } else {
        await axios.post(`${baseUrl}employees/store`, dataObj);
      }
      navigate("/admin/employee-list");
      mutate();
      window.location.reload();
    } catch (error) {
      if (error && error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleKeyUpLangTags = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Prevent adding empty tags
      if (langValue.trim() !== "") {
        setLangTags([
          ...langTags,
          { value: langValue.trim(), id: crypto.randomUUID() },
        ]);
        setLangValue("");
      }
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Prevent adding empty tags
      if (tagValue.trim() !== "") {
        setTags([
          ...tags,
          { value: tagValue.trim(), id: crypto.randomUUID() },
        ]);
        setTagValue("");
      }
    }
  };

  // const handleKeyUp = () => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     // Prevent adding empty tags
  //     if (value.trim() !== "") {
  //       if (tags === undefined) {
  //         setLangTags([
  //           ...langTags,
  //           { value: value.trim(), id: crypto.randomUUID() },
  //         ]);
  //       } else {
  //         setTags([
  //           ...tags,
  //           { value: value.trim(), id: crypto.randomUUID() },
  //         ]);
  //       }
  //       setValue("");
  //     }
  //   }
  // }
  const deleteTag = (id) => {
    const newTags = tags.filter((item) => item.id !== id);
    setTags(newTags);
  };
  const deleteLangTags = (id) => {
    const newTags = langTags.filter((item) => item.id !== id);
    setLangTags(newTags);
  };

  useEffect(() => {
    const skillsArray = JSON.parse(selectedEmp?.skills ?? "[]");
    const langsArray = JSON.parse(selectedEmp?.languages ?? "[]");

    if (selectedEmp) {
      const updatedTags = skillsArray?.map((skill) => ({
        value: skill,
        id: crypto.randomUUID(),
      }));
      const updatedLangTags = langsArray?.map((lang) => ({
        value: lang,
        id: crypto.randomUUID(),
      }));
      setTags(updatedTags);
      setLangTags(updatedLangTags);
    }
  }, [id, selectedEmp]);

  const defineFormType = () => {
    return selectedEmp ? "Edit Employee" : "Create Employee";
  };

  return (
    <Suspense fallback={<p>Loading..</p>}>
      <Box bg="white" p="15px" borderRadius="7px" my="15px">
        <Text fontSize="19px" mb={10} fontWeight="bold">
          <FormTitle text={defineFormType()} />
        </Text>
        <form>
          <Grid templateColumns="repeat(6, 1fr)" gap={4}>
            <GridItem colSpan={3}>
              <FormLabel fontSize="14px">First Name</FormLabel>
              <Controller
                rules={{ required: true }}
                name="firstname"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
              {errors.firstname && (
                <span className="error-msg">
                  {errors.firstname.message}
                </span>
              )}
            </GridItem>
            <GridItem colSpan={3}>
              <FormLabel fontSize="14px">Last Name</FormLabel>
              <Controller
                rules={{ required: true }}
                name="lastname"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
              {errors.lastname && (
                <span className="error-msg">
                  {errors.lastname.message}
                </span>
              )}
            </GridItem>
            <GridItem colSpan={3}>
              <FormLabel fontSize="14px">Employee Id</FormLabel>
              <Controller
                rules={{ required: true }}
                name="emp_id"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
              {errors.emp_id && (
                <span className="error-msg">{errors.emp_id.message}</span>
              )}
            </GridItem>
            <GridItem colSpan={3}>
              <FormLabel fontSize="14px">Department</FormLabel>
              <Controller
                rules={{ required: true }}
                name="department_id"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    value={value}
                    onChange={onChange}
                    placeholder="Select option"
                  >
                    {data?.departments.map((item) => (
                      <option value={item.id}>{item.name}</option>
                    ))}
                  </Select>
                )}
              />
              {errors.department_id && (
                <span className="error-msg">
                  {errors.department_id.message}
                </span>
              )}
            </GridItem>

            <GridItem colSpan={3}>
              <FormLabel fontSize="14px">Email</FormLabel>
              <Controller
                rules={{ required: true }}
                name="email"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
              {errors.email && (
                <span className="error-msg">{errors.email.message}</span>
              )}
            </GridItem>
            <GridItem colSpan={3}>
              <FormLabel fontSize="14px">Mobile Number</FormLabel>
              <Controller
                rules={{ required: true }}
                name="phone"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </GridItem>
            <GridItem colSpan={3}>
              <FormLabel fontSize="14px">Languages</FormLabel>
              <Controller
                rules={{ required: true }}
                name="langs"
                control={control}
                render={({ field }) => (
                  <>
                    <div className="tag-input-container">
                      <Tags deleteTag={deleteLangTags} tags={langTags} />
                      <input
                        value={langValue}
                        onChange={(e) => setLangValue(e.target.value)}
                        onKeyUp={handleKeyUpLangTags}
                        style={{ border: "none", outline: "none" }}
                      />
                    </div>
                    <Input display="none" {...field} />
                  </>
                )}
              />
            </GridItem>
            <GridItem colSpan={3}>
              <FormLabel fontSize="14px">Skills</FormLabel>
              <Controller
                rules={{ required: true }}
                name="skills"
                control={control}
                render={({ field }) => (
                  <>
                    <div className="tag-input-container">
                      <Tags deleteTag={deleteTag} tags={tags} />
                      <input
                        onBlur={handleKeyUp}
                        value={tagValue}
                        onChange={(e) => setTagValue(e.target.value)}
                        onKeyUp={handleKeyUp}
                        style={{ border: "none", outline: "none" }}
                      />
                    </div>
                    <Input display="none" {...field} />
                  </>
                )}
              />
            </GridItem>
            <GridItem colSpan={3}>
              <FormLabel fontSize="14px">Country</FormLabel>
              <Controller
                rules={{ required: true }}
                name="country"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </GridItem>
            <GridItem colSpan={3}>
              <FormLabel fontSize="14px">Timezone</FormLabel>
              <Controller
                rules={{ required: true }}
                name="timezone"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    value={value}
                    onChange={onChange}
                    placeholder="Select option"
                  >
                    {aryIanaTimeZones.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </Select>
                )}
              />
            </GridItem>
          </Grid>
          <Button
            onClick={handleSubmit(onSubmit)}
            ml="auto"
            display="flex"
            fontSize="14px"
            color="white"
            my="15px"
            bg="#184780"
            size="md"
          >
            {defineFormType()}
          </Button>
        </form>
      </Box>
    </Suspense>
  );
};

export default CreateEmploye;
