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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, types: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" };
    case "UPDATE_SUCCESS":
      return {
        ...state,
        loadingUpdate: false,
        refreshData: true,
        errorUpdate: "",
      };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
}

function Index() {
  const { state } = useContext(Store);
  const router = useRouter();

  const { userInfo } = state;
  const [
    { loading, error, loadingUpdate, successDelete, types, refreshData },
    dispatch,
  ] = useReducer(reducer, {
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

  const fetchData = async () => {
    try {
      dispatch({ type: "FETCH_REQUEST" });
      const { data } = await axios.get(`/api/admin/contactType`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      // dispatch({ type: "FETCH_FAIL", payload: err });
    }
  };

  const submitHandler = async ({ typeName }: any) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios
        .post(
          `/api/admin/contactType`,
          {
            typeName,
          },
          { headers: { authorization: `Bearer ${userInfo.token}` } }
        )
        .then(() => {
          dispatch({ type: "UPDATE_SUCCESS" });
          fetchData();
          reset();
        });
    } catch (err: any) {
      dispatch({ type: "UPDATE_FAIL", payload: err });
      toast.error(err.response?.data);
    }
  };

  const deleteHandler = async (id: any) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/contactType/${id}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: "DELETE_SUCCESS" });
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
    }
  };

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    }
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successDelete, refreshData]);

  return (
    <Layout title="contact type">
      <Grid container spacing={1} justifyContent="center">
        <Grid item lg={6} md={6} xs={12} mt={5}>
          <Card>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  افزودن نوع جدید
                </Typography>
              </ListItem>

              <form onSubmit={handleSubmit(submitHandler)}>
                <List>
                  <ListItem>
                    <Controller
                      name="typeName"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: true,
                      }}
                      render={({ field }) => (
                        <TextField
                          variant="outlined"
                          fullWidth
                          id="typeName"
                          label="نوع حساب"
                          error={Boolean(errors.typeName)}
                          helperText={
                            errors.typeName ? "typeName is required" : ""
                          }
                          {...field}
                        ></TextField>
                      )}
                    ></Controller>
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
        <Grid item xs={12} mt={5}>
          <Card>
            <List>
              <ListItem>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Typography component="h1" variant="h1">
                      نوع حساب های تعریف شده
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Typography>{error}</Typography>
                ) : (
                  <TableContainer sx={{ maxHeight: 400, overflowY: "auto" }}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell> ردیف</TableCell>
                          <TableCell>نوع حساب</TableCell>
                          <TableCell>عملیات</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {types.map((type: any, index: number) => (
                          <TableRow key={type._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{type.typeName}</TableCell>

                            <TableCell>
                              <Button
                                onClick={() => deleteHandler(type._id)}
                                size="small"
                                variant="contained"
                              >
                                حذف
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Index;
