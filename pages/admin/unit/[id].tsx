import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useContext, useReducer } from "react";
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
} from "@mui/material";

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

function ProductEdit({ params }: any) {
  const unitId = params.id;
  const { state } = useContext(Store);
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

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    } else {
      const fetchData = async () => {
        try {
          dispatch({ type: "FETCH_REQUEST" });
          const { data } = await axios.get(`/api/admin/units/${unitId}`, {
            headers: { authorization: `Bearer ${userInfo.token}` },
          });
          dispatch({ type: "FETCH_SUCCESS" });
          setValue("code", data.code);
          setValue("name", data.name);
          setValue("packingWeight", data.packingWeight);
        } catch (err) {}
      };
      fetchData();
    }
  }, []);

  const submitHandler = async ({ code, name, packingWeight }: any) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios.put(
        `/api/admin/units/${unitId}`,
        {
          code,
          name,
          packingWeight,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } }
      );
      dispatch({ type: "UPDATE_SUCCESS" });
      router.push("/admin/units");
    } catch (err: any) {
      // dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
    }
  };

  return (
    <Layout title={`Edit Unit ${unitId}`}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  ویرایش واحد {unitId}
                </Typography>
              </ListItem>
              <ListItem>
                {loading && <CircularProgress></CircularProgress>}
                {error && <Typography>{error}</Typography>}
              </ListItem>
              <ListItem>
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
                      <Controller
                        name="packingWeight"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="packingWeight"
                            label="وزن بسته بندی به کیلوگرم"
                            error={Boolean(errors.packingWeight)}
                            helperText={
                              errors.packingWeight ? "Price is required" : ""
                            }
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>

                    <ListItem>
                      <Button
                        variant="contained"
                        type="submit"
                        fullWidth
                        color="primary"
                      >
                        بروزرسانی
                      </Button>
                      {loadingUpdate && <CircularProgress />}
                    </ListItem>
                  </List>
                </form>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ params }: any) {
  return {
    props: { params },
  };
}

export default dynamic(() => Promise.resolve(ProductEdit), { ssr: false });
