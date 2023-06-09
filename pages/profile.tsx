import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect, useContext, useState } from "react";
import { getError } from "../utility/error";
import { Store } from "../utility/Store";
import Layout from "../components/layout";
import { Controller, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import {
  Grid,
  Card,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

function Profile() {
  const { state, dispatch } = useContext(Store);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const router = useRouter();
  const { userInfo } = state;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userInfo) {
      return router.push("/login");
    }
    setValue("name", userInfo.name);
    setValue("email", userInfo.email);
  }, []);
  const submitHandler = async ({
    name,
    email,
    phone,
    password,
    confirmPassword,
  }: any) => {
    if (password !== confirmPassword) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios
        .put(
          "/api/users/profile",
          {
            name,
            email,
            phone,
            password,
          },
          { headers: { authorization: `Bearer ${userInfo.token}` } }
        )
        .finally(() => {
          setLoading(false);
        });
      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", data);
    } catch (err) {}
  };
  return (
    <Layout title="Profile">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Card>
            <List>
              <ListItem>
                <Typography component="h1" variant="h1">
                  پروفایل
                </Typography>
              </ListItem>
              <ListItem>
                <form onSubmit={handleSubmit(submitHandler)}>
                  <List>
                    <ListItem>
                      <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          minLength: 2,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="name"
                            label="نام"
                            inputProps={{ type: "name" }}
                            error={Boolean(errors.name)}
                            helperText={
                              errors.name
                                ? errors.name.type === "minLength"
                                  ? "Name length is more than 1"
                                  : "Name is required"
                                : ""
                            }
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>
                    <ListItem>
                      <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        rules={{
                          required: true,
                          pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="email"
                            label="ایمیل"
                            inputProps={{ type: "email" }}
                            error={Boolean(errors.email)}
                            helperText={
                              errors.email
                                ? errors.email.type === "pattern"
                                  ? "Email is not valid"
                                  : "Email is required"
                                : ""
                            }
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
                          required: true,
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="phone"
                            label="موبایل"
                            error={Boolean(errors.phone)}
                            helperText={
                              errors.phone ? "وارد کردن موبایل ضروری است" : ""
                            }
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>
                    <ListItem>
                      <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        rules={{
                          validate: (value) =>
                            value === "" ||
                            value.length > 5 ||
                            "Password length is more than 5",
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="password"
                            label="رمز عبور"
                            inputProps={{ type: "password" }}
                            error={Boolean(errors.password)}
                            helperText={
                              errors.password
                                ? "Password length is more than 5"
                                : ""
                            }
                            {...field}
                          ></TextField>
                        )}
                      ></Controller>
                    </ListItem>
                    <ListItem>
                      <Controller
                        name="confirmPassword"
                        control={control}
                        defaultValue=""
                        rules={{
                          validate: (value) =>
                            value === "" ||
                            value.length > 5 ||
                            "Confirm Password length is more than 5",
                        }}
                        render={({ field }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            id="confirmPassword"
                            label="تکرار رمز عبور"
                            inputProps={{ type: "password" }}
                            error={Boolean(errors.confirmPassword)}
                            helperText={
                              errors.password
                                ? "Confirm Password length is more than 5"
                                : ""
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
                        color="primary"
                        loading={loading}
                      >
                        به روزرسانی
                      </LoadingButton>
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

export default dynamic(() => Promise.resolve(Profile), { ssr: false });
