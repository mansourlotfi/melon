import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useReducer, useState } from "react";
import { Store } from "../../../utility/Store";
import Layout from "../../../components/layout";
import { Controller, useForm } from "react-hook-form";
import {
  Grid,
  Card,
  List,
  ListItem,
  Typography,
  CircularProgress,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false, errorUpdate: "" };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };

    default:
      return state;
  }
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function AddContact() {
  const { state } = useContext(Store);
  const [contactTypes, setContactTypes] = useState([]);
  const [contactType, setContactType] = React.useState<string[]>([]);

  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const router = useRouter();
  const { userInfo } = state;

  const handleChange = (event: SelectChangeEvent<typeof contactType>) => {
    const {
      target: { value },
    } = event;
    setContactType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const fetchContactTypes = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const { data } = await axios.get(`/api/admin/contactType`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setContactTypes(data);
      dispatch({ type: "FETCH_SUCCESS" });
    } catch (err: any) {
      dispatch({ type: "FETCH_FAIL" });
    }
  };

  const submitHandler = async ({
    code,
    name,
    phone,
    cellPhone,
    address,
    credit,
  }: any) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.post(
        `/api/admin/contacts`,
        {
          code,
          name,
          phone,
          cellPhone,
          address,
          credit,
          contactType,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: "UPDATE_SUCCESS" });
      toast.success("طرف حساب ثبت شد");
      reset();
    } catch (err: any) {
      dispatch({ type: "UPDATE_FAIL" });
      toast.error(err.response?.data);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    } else {
      fetchContactTypes();
    }
  }, []);

  return (
    <Layout title={`Add Contact`}>
      <Grid container spacing={1} justifyContent="center">
        <Grid item lg={6} md={6} xs={12} mt={5}>
          <Card>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  افزودن طرف حساب جدید
                </Typography>
              </ListItem>

              <form onSubmit={handleSubmit(submitHandler)}>
                <List>
                  <ListItem>
                    <Controller
                      name="code"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="code"
                          label="کد طرف حساب"
                          error={Boolean(errors.code)}
                          helperText={errors.code ? "code is required" : ""}
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="name"
                          label="نام طرف حساب"
                          error={Boolean(errors.name)}
                          helperText={errors.name ? "name is required" : ""}
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <Controller
                      name="phone"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: false,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="phone"
                          label="شماره تماس ثابت"
                          error={Boolean(errors.phone)}
                          helperText={errors.phone ? "phone is required" : ""}
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <Controller
                      name="cellPhone"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="cellPhone"
                          label="شماره همراه"
                          error={Boolean(errors.cellPhone)}
                          helperText={
                            errors.cellPhone ? "cellPhone is required" : ""
                          }
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <Controller
                      name="address"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: false,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="address"
                          label="آدرس"
                          error={Boolean(errors.address)}
                          helperText={
                            errors.address ? "address is required" : ""
                          }
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <Controller
                      name="credit"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: false,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="credit"
                          label="سقف اعتبار"
                          error={Boolean(errors.credit)}
                          helperText={errors.credit ? "credit is required" : ""}
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
                  </ListItem>
                  <ListItem>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        نوع حساب
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="contactType"
                        name="contactType"
                        value={contactType}
                        label="نوع حساب"
                        onChange={handleChange}
                        multiple
                        renderValue={(selected) =>
                          selected.map((S) => S.typeName).join(", ")
                        }
                        MenuProps={MenuProps}
                      >
                        {contactTypes.map((CT) => (
                          <MenuItem key={CT._id} value={CT}>
                            <Checkbox checked={contactType.indexOf(CT) > -1} />
                            <ListItemText primary={CT.typeName} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </ListItem>

                  <ListItem>
                    <LoadingButton
                      variant="contained"
                      type="submit"
                      fullWidth
                      loading={loadingUpdate}
                      color="primary"
                    >
                      ثبت
                    </LoadingButton>
                  </ListItem>
                </List>
              </form>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(AddContact), { ssr: false });
