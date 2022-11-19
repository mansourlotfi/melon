import axios from "axios";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useContext, useEffect } from "react";
import Layout from "../components/layout";
import { Store } from "../utility/Store";
// import useStyles from '../utility/styles';
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import {
  Typography,
  List,
  ListItem,
  TextField,
  Button,
  Link,
  Grid,
  Container,
} from "@mui/material";
// import { useSnackbar } from 'notistack';
// import { getError } from '../utility/error';
import { toast } from "react-toastify";
import PublicLayout from "../components/publicLayout";

export default function Register() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    if (userInfo) {
      router.push("/dashboard");
    }
  }, []);

  // const classes = useStyles();
  const submitHandler = async ({
    name,
    email,
    phone,
    password,
    confirmPassword,
  }: any) => {
    // closeSnackbar();
    if (password !== confirmPassword) {
      return toast.error("رمز ورود با تکرار آن مطابقت ندارد");
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        phone,
        password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", data);
      // router.push(redirect?.toString() || "/admin/dashboard");
      router.push("/admin/dashboard");
      toast.success("کاربر ایجاد شد");
    } catch (err: any) {
      // enqueueSnackbar(getError(err), { variant: "error" });
      toast.error(err.response?.data);
    }
  };

  return (
    <PublicLayout title="Register">
      <Container>
        <Grid container justifyContent="center">
          <Grid item lg={6} md={6} xs={12}>
            <form onSubmit={handleSubmit(submitHandler)}>
              <Typography component="h1" variant="h1">
                ثبت نام
              </Typography>
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
                    render={({ field }: any) => (
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
                    render={({ field }: any) => (
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
                      minLength: 11,
                      maxLength: 11,
                    }}
                    render={({ field }: any) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="phone"
                        label="موبایل"
                        inputProps={{ type: "phone" }}
                        error={Boolean(errors.phone)}
                        helperText={
                          errors.name
                            ? errors.name.type === "minLength"
                              ? "phone length is 11"
                              : "phone is required"
                            : ""
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
                      required: true,
                      minLength: 6,
                    }}
                    render={({ field }: any) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="password"
                        label="رمز عبور"
                        inputProps={{ type: "password" }}
                        error={Boolean(errors.password)}
                        helperText={
                          errors.password
                            ? errors.password.type === "minLength"
                              ? "Password length is more than 5"
                              : "Password is required"
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
                      required: true,
                      minLength: 6,
                    }}
                    render={({ field }: any) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="confirmPassword"
                        label="تکرار رمز عبور"
                        inputProps={{ type: "password" }}
                        error={Boolean(errors.confirmPassword)}
                        helperText={
                          errors.confirmPassword
                            ? errors.confirmPassword.type === "minLength"
                              ? "Confirm Password length is more than 5"
                              : "Confirm  Password is required"
                            : ""
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
                    ورود
                  </Button>
                </ListItem>
                <ListItem>
                  قبلا ثبت نام کردید؟ &nbsp;
                  <NextLink
                    href={`/login?redirect=${redirect || "/"}`}
                    passHref
                    legacyBehavior
                  >
                    <Link>ورود</Link>
                  </NextLink>
                </ListItem>
              </List>
            </form>
          </Grid>
        </Grid>
      </Container>
    </PublicLayout>
  );
}
