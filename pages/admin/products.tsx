import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect, useContext, useReducer, useState } from "react";
// import { getError } from "../../utility/error";
import { Store } from "../../utility/Store";
import Layout from "../../components/layout";
import {
  Grid,
  Card,
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import Image from "next/image";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, products: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return { ...state, loadingCreate: false };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      state;
  }
}

function AdminProdcuts() {
  const { state } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;
  const [units, setUnits] = useState([]);

  const [
    { loading, error, products, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    products: [],
    error: "",
  });

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/products`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        // dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successDelete]);

  useEffect(() => {
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
    fetchPackingUnits();
  }, []);

  const createHandler = async () => {
    // if (!window.confirm("Are you sure?")) {
    //   return;
    // }
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(
        `/api/admin/products`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "CREATE_SUCCESS" });
      router.push(`/admin/product/${data.product._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
    }
  };
  const deleteHandler = async (productId: any) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/products/${productId}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: "DELETE_SUCCESS" });
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
    }
  };
  return (
    <Layout title="Products">
      <Grid container spacing={1}>
        <Grid item xs={12} mt={5}>
          <Card>
            <List>
              <ListItem>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Typography component="h1" variant="h1">
                      میوه ها
                    </Typography>
                    {loadingDelete && <CircularProgress />}
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                {loading ? (
                  <CircularProgress />
                ) : error ? (
                  <Typography>{error}</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>کد</TableCell>
                          <TableCell>نام</TableCell>
                          <TableCell>واحد بسته بندی</TableCell>
                          <TableCell>وزن بسته بندی</TableCell>
                          <TableCell>تصویر</TableCell>
                          <TableCell>عملیات</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {products.map((product: any) => (
                          <TableRow key={product._id}>
                            <TableCell>{product.code}</TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>
                              {
                                units.find(
                                  (item) => item._id === product?.packingUnit
                                )?.name
                              }
                            </TableCell>
                            <TableCell>
                              {
                                units.find(
                                  (item) => item._id === product?.packingUnit
                                )?.packingWeight
                              }
                              کیلوگرم
                            </TableCell>

                            <TableCell>
                              <Image
                                src={product.image}
                                alt="Picture of the product"
                                width={100}
                                height={100}
                              />
                            </TableCell>

                            <TableCell>
                              <NextLink
                                href={`/admin/product/${product._id}`}
                                passHref
                                legacyBehavior
                              >
                                <Button size="small" variant="contained">
                                  ویرایش
                                </Button>
                              </NextLink>
                              <Button
                                onClick={() => deleteHandler(product._id)}
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

export default dynamic(() => Promise.resolve(AdminProdcuts), { ssr: false });
