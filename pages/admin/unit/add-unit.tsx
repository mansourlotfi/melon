import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Typography, List, ListItem, TextField, Grid } from "@mui/material";
import { toast } from "react-toastify";
import { Store } from "../../../utility/Store";
import Layout from "../../../components/layout";
import { LoadingButton } from "@mui/lab";

export default function RegisterBrooker() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const [loading, setLoading] = useState(false);
  const submitHandler = async ({ code, name, packingWeight }: any) => {
    try {
      setLoading(true);
      const { data } = await axios
        .post("/api/admin/units", {
          code,
          name,
          packingWeight,
          //   adminId: userInfo._id,
        })
        .finally(() => {
          setLoading(false);
        });
      router.push("/admin/units");
      toast.success("واحد جدید ایجاد شد");
    } catch (err: any) {
      toast.error(err.response?.data);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
  }, []);

  return (
    <Layout title="Register">
      <Grid container justifyContent="center">
        <Grid item lg={6} md={6} xs={12}>
          <form onSubmit={handleSubmit(submitHandler)}>
            <Typography component="h1" variant="h1">
              ثبت واحد جدید
            </Typography>
            <List>
              <ListItem>
                <Controller
                  name="code"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: true,
                    // minLength: 2,
                  }}
                  render={({ field }: any) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="code"
                      label="کد"
                      inputProps={{ type: "code" }}
                      error={Boolean(errors.code)}
                      helperText={
                        errors.code
                          ? errors.code.type === "minLength"
                            ? "code length is more than 1"
                            : "code is required"
                          : ""
                      }
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
                    // pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
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
                          ? errors.name.type === "pattern"
                            ? "name is not valid"
                            : "name is required"
                          : ""
                      }
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
                    // minLength: 11,
                    // maxLength: 11,
                  }}
                  render={({ field }: any) => (
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="packingWeight"
                      label="وزن بسته بندی به کیلوگرم"
                      inputProps={{ type: "packingWeight" }}
                      error={Boolean(errors.packingWeight)}
                      helperText={
                        errors.name
                          ? errors.name.type === "minLength"
                            ? "packingWeight length is 1"
                            : "packingWeight is required"
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
                  ثبت
                </LoadingButton>
              </ListItem>
            </List>
          </form>
        </Grid>
      </Grid>
    </Layout>
  );
}
