import axios from "axios";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utility/Store";
import Cookies from "js-cookie";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import { getError } from "../utility/error";
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
import PublicLayout from "../components/publicLayout";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";

function isJsonString(str: any) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export default function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping
  const { state, dispatch } = useContext(Store);
  const [loading, setLoading] = useState(false);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      router.push("/admin/dashboard");
    }
  }, []);

  const submitHandler = async ({ email, password }: any) => {
    // closeSnackbar();
    try {
      setLoading(true);
      const { data } = await axios
        .post("/api/users/login", {
          email,
          password,
        })
        .finally(() => {
          setLoading(false);
        });

      dispatch({ type: "USER_LOGIN", payload: data });
      Cookies.set("userInfo", data);
      router.push("/admin/dashboard");
    } catch (err: any) {
      // enqueueSnackbar(getError(err), { variant: "error" });
      toast.error(err.response?.data?.message ?? "اشکالی وجود دارد");
    }
  };
  return (
    <PublicLayout title="Login">
      <Container>
        <Grid container justifyContent="center">
          <Grid item lg={6} md={6} xs={12}>
            <form
              onSubmit={handleSubmit(submitHandler)}
              style={{ width: "100%" }}
            >
              <Typography component="h1" variant="h1">
                ورود
              </Typography>
              <List>
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
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    fullWidth
                    color="primary"
                    loading={loading}
                  >
                    ورود
                  </LoadingButton>
                </ListItem>
                <ListItem>
                  ثبت نام نکردید؟ &nbsp;
                  <NextLink
                    href={`/register?redirect=${redirect || "/"}`}
                    passHref
                    legacyBehavior
                  >
                    <Link>ثبت نام سریع</Link>
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
