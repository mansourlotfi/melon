import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useEffect, useContext, useReducer, useState } from "react";
// import { getError } from "../../utility/error";
import { Store } from "../../../utility/Store";
import Layout from "../../../components/layout";
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
      return { ...state, loading: false, contacts: action.payload, error: "" };
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

function Contacts() {
  const { state } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;
  const [units, setUnits] = useState([]);

  const [
    { loading, error, contacts, loadingCreate, successDelete, loadingDelete },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    contacts: [],
    error: "",
  });

  console.log("contacts", contacts);

  const deleteHandler = async (contactId: any) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      dispatch({ type: "DELETE_REQUEST" });
      await axios.delete(`/api/admin/contacts/${contactId}`, {
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: "DELETE_SUCCESS" });
    } catch (err) {
      dispatch({ type: "DELETE_FAIL" });
    }
  };

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/contacts`, {
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
                      طرف حساب ها
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
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>کد</TableCell>
                          <TableCell>نام</TableCell>
                          <TableCell>تلفن ثابت</TableCell>
                          <TableCell>تلفن همراه</TableCell>
                          <TableCell>آدرس</TableCell>
                          <TableCell>اعتبار</TableCell>
                          <TableCell>نوع حساب</TableCell>
                          <TableCell>عملیات</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {contacts.map((contact: any) => (
                          <TableRow key={contact._id}>
                            <TableCell>{contact.code}</TableCell>
                            <TableCell>{contact.name}</TableCell>
                            <TableCell>{contact.phone}</TableCell>
                            <TableCell>{contact.cellPhone}</TableCell>
                            <TableCell>{contact.address}</TableCell>
                            <TableCell>{contact.credit}</TableCell>
                            <TableCell>{contact.contactType}</TableCell>
                            <TableCell>
                              <NextLink
                                href={`/admin/product/${contact._id}`}
                                passHref
                                legacyBehavior
                              >
                                <Button size="small" variant="contained">
                                  ویرایش
                                </Button>
                              </NextLink>
                              <Button
                                onClick={() => deleteHandler(contact._id)}
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

export default dynamic(() => Promise.resolve(Contacts), { ssr: false });
