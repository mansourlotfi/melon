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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Image from "next/image";

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
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };

    default:
      return state;
  }
}

function AddProduct() {
  const { state } = useContext(Store);
  const [units, setUnits] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const [{ loading, error, loadingUpdate, loadingUpload }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
    });
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { userInfo } = state;

  const fetchPackingUnits = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const { data } = await axios.get(`/api/admin/units`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      setUnits(data);
    } catch (err) {
      // dispatch({ type: "FETCH_FAIL", payload: getError(err) });
    }
  };

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    } else {
      fetchPackingUnits();
    }
  }, []);

  const uploadHandler = async (e: any, imageField = "image") => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post("/api/admin/upload", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch({ type: "UPLOAD_SUCCESS" });
      setValue(imageField, data.secure_url);
      setImageUrl(data.secure_url);
    } catch (err) {
      // dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
    }
  };

  const submitHandler = async ({ code, name, image }: any) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.post(
        `/api/admin/products`,
        {
          code,
          name,
          packingUnit: selectedUnit,
          image,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: "UPDATE_SUCCESS" });
      router.push("/admin/products");
    } catch (err: any) {
      // dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
    }
  };

  return (
    <Layout title={`Add Product `}>
      <Grid container spacing={1} justifyContent="center">
        <Grid item lg={6} md={6} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                افزودن محصول جدید
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
                        label="کد"
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
                        label="نام"
                        error={Boolean(errors.name)}
                        helperText={errors.name ? "name is required" : ""}
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      واحد بسته بندی
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="packingUnit"
                      name="packingUnit"
                      value={units.find((unit) => unit._id === selectedUnit)}
                      label="واحد بسته بندی"
                      onChange={(e) => setSelectedUnit(e.target.value)}
                      required
                    >
                      {units.map((unit: any) => (
                        <MenuItem key={unit._id} value={unit._id}>
                          {unit.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* value={brand} onChange={brandHandler} */}
                </ListItem>
                <ListItem>
                  <Controller
                    name="image"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="image"
                        label="تصویر"
                        error={Boolean(errors.image)}
                        helperText={errors.image ? "Image is required" : ""}
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <Grid container justifyContent="space-between">
                    <Grid item alignSelf="center">
                      <LoadingButton
                        loading={loadingUpload}
                        variant="contained"
                        component="label"
                      >
                        آپلود عکس
                        <input type="file" onChange={uploadHandler} hidden />
                      </LoadingButton>
                    </Grid>
                    <Grid item>
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt="Picture of the author"
                          width={200}
                          height={200}
                        />
                      )}
                    </Grid>
                  </Grid>
                </ListItem>

                <ListItem>
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    fullWidth
                    loading={loadingUpload}
                    color="primary"
                  >
                    بهروزرسانی
                  </LoadingButton>
                </ListItem>
              </List>
            </form>
          </List>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(AddProduct), { ssr: false });
