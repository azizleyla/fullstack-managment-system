import React, { Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FormTitle, GeneralSkeleton, Tags } from "components/shared";
import {
  Box,
  Button,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import * as yup from "yup";
import axios from "axios";
import { baseUrl } from "utils/constants";

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

  const [langTags, setLangTags] = useState([]);
  const [skillTags, setSkillTags] = useState([]);
  const [langValue, setLangValue] = useState("");

  const [tagValue, setTagValue] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  var aryIanaTimeZones = Intl.supportedValuesOf("timeZone");

  const { data, error, isLoading } = useSWR(
    id ? `${baseUrl}employees/${id}` : null,
  );

  let employee = data?.employee;

  useEffect(() => {
    if (employee) {
      reset(employee);
    }
  }, [employee]);

  const onSubmit = async (data) => {
    let skills = skillTags.map((item) => item.value);
    let langs = langTags.map((item) => item.value);

    let dataObj = {
      ...data,
      langs,
      skills,
    };
    try {
      if (id) {
        await axios.post(`${baseUrl}employees/update/${id}`, dataObj);
      } else {
        await axios.post(`${baseUrl}employees/store`, dataObj);
      }
      navigate("/admin/employee-list");
      mutate(`${baseUrl}employees/index`);
      window.location.reload();
    } catch (error) {
      if (error && error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleKeyUp = (e, type) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (type == "skill") {
        if (tagValue.trim() !== "") {
          setSkillTags((prev) => [
            ...prev,
            { value: tagValue.trim(), id: crypto.randomUUID() },
          ]);
          setTagValue("");
        }
      } else {
        if (langValue.trim() !== "") {
          setLangTags((prev) => [
            ...prev,
            { value: langValue.trim(), id: crypto.randomUUID() },
          ]);
          setLangValue("");
        }
      }
    }
  };

  const deleteTag = (id, type) => {
    if (type == "skill") {
      const newTags = skillTags.filter((item) => item.id !== id);
      setSkillTags(newTags);
    } else {
      const newTags = langTags.filter((item) => item.id !== id);
      setLangTags(newTags);
    }
  };

  useEffect(() => {
    const skillsArray = JSON.parse(employee?.skills ?? "[]");
    const langsArray = JSON.parse(employee?.languages ?? "[]");

    if (employee) {
      const updatedTags = skillsArray?.map((skill) => ({
        value: skill,
        id: crypto.randomUUID(),
      }));
      const updatedLangTags = langsArray?.map((lang) => ({
        value: lang,
        id: crypto.randomUUID(),
      }));
      setSkillTags(updatedTags);
      setLangTags(updatedLangTags);
    }
  }, [id]);

  const defineFormType = () => {
    return employee ? "Edit Employee" : "Create Employee";
  };

  if (error) return <p>Error loading data....</p>;
  if (isLoading) return <GeneralSkeleton />;

  return (
    <Suspense fallback={<GeneralSkeleton />}>
      <Box bg="white" p="15px" borderRadius="7px" my="15px">
        <FormTitle text={defineFormType()} />

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
                      <Tags
                        type="lang"
                        deleteTag={deleteTag}
                        tags={langTags}
                      />
                      <input
                        value={langValue}
                        onChange={(e) => setLangValue(e.target.value)}
                        onKeyUp={(e) => handleKeyUp(e, "lang")}
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
                      <Tags
                        type="skill"
                        deleteTag={deleteTag}
                        tags={skillTags}
                      />
                      <input
                        onBlur={handleKeyUp}
                        value={tagValue}
                        onChange={(e) => setTagValue(e.target.value)}
                        onKeyUp={(e) => handleKeyUp(e, "skill")}
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
                      <option key={item} value={item}>
                        {item}
                      </option>
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
