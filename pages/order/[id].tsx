import React, { useCallback, useContext, useEffect, useReducer } from "react";
import dynamic from "next/dynamic";
import Layout from "../../components/layout";
import { Store } from "../../utility/Store";
import NextLink from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
// import { getError } from "../../utility/error";
import {
  Typography,
  CircularProgress,
  Grid,
  Card,
  List,
  ListItem,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Link,
} from "@mui/material";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false, errorPay: "" };
    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false, errorDeliver: action.payload };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
        errorDeliver: "",
      };
    default:
      state;
  }
}

function Order({ params }: any) {
  const orderId = params.id;
  const router = useRouter();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const [
    { loading, error, order, successPay, loadingDeliver, successDeliver },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  const fetchInitialData = useCallback(() => {
    if (!userInfo) {
      return router.push("/login");
    }
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        // dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
      if (successDeliver) {
        dispatch({ type: "DELIVER_RESET" });
      }
    } else {
      // piad bank script
    }
  }, [order, successPay, successDeliver]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  function createOrder(data: any, actions: any) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: totalPrice },
          },
        ],
      })
      .then((orderID: any) => {
        return orderID;
      });
  }
  function onApprove(data: any, actions: any) {
    return actions.order.capture().then(async function (details: any) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
      } catch (err) {
        // dispatch({ type: "PAY_FAIL", payload: getError(err) });
      }
    });
  }

  function onError(err: any) {}

  async function deliverOrderHandler() {
    try {
      dispatch({ type: "DELIVER_REQUEST" });
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "DELIVER_SUCCESS", payload: data });
    } catch (err) {
      // dispatch({ type: "DELIVER_FAIL", payload: getError(err) });
    }
  }

  return (
    <Layout title={`Order ${orderId}`}>
      <Typography component="h1" variant="h1">
        Order {orderId}
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography>{error}</Typography>
      ) : (
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography component="h4" variant="h4">
                    Shipping Address
                  </Typography>
                </ListItem>
                <ListItem>
                  {shippingAddress.fullName}, {shippingAddress.address},{" "}
                  {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                  {shippingAddress.country}
                  &nbsp;
                  {shippingAddress.location && (
                    <Link
                      variant="button"
                      target="_new"
                      href={`https://maps.google.com?q=${shippingAddress.location.lat},${shippingAddress.location.lng}`}
                    >
                      Show On Map
                    </Link>
                  )}
                </ListItem>
                <ListItem>
                  Status:{" "}
                  {isDelivered
                    ? `delivered at ${deliveredAt}`
                    : "not delivered"}
                </ListItem>
              </List>
            </Card>
            <Card>
              <List>
                <ListItem>
                  <Typography component="h4" variant="h4">
                    Payment Method
                  </Typography>
                </ListItem>
                <ListItem>{paymentMethod}</ListItem>
                <ListItem>
                  Status: {isPaid ? `paid at ${paidAt}` : "not paid"}
                </ListItem>
              </List>
            </Card>
            <Card>
              <List>
                <ListItem>
                  <Typography component="h4" variant="h4">
                    Order Items
                  </Typography>
                </ListItem>
                <ListItem>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Image</TableCell>
                          <TableCell>Name</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderItems.map((item: any) => (
                          <TableRow key={item._id}>
                            <TableCell>
                              <NextLink
                                href={`/product/${item.slug}`}
                                passHref
                                legacyBehavior
                              >
                                <Link>
                                  <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={50}
                                    height={50}
                                  ></Image>
                                </Link>
                              </NextLink>
                            </TableCell>

                            <TableCell>
                              <NextLink
                                href={`/product/${item.slug}`}
                                passHref
                                legacyBehavior
                              >
                                <Link>
                                  <Typography>{item.name}</Typography>
                                </Link>
                              </NextLink>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>{item.quantity}</Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography>${item.price}</Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </ListItem>
              </List>
            </Card>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h4">Order Summary</Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Items:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">${itemsPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Tax:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">${taxPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Shipping:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">${shippingPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        <strong>Total:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        <strong>${totalPrice}</strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {!isPaid && <ListItem>asd</ListItem>}
                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListItem>
                    {loadingDeliver && <CircularProgress />}
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={deliverOrderHandler}
                    >
                      Deliver Order
                    </Button>
                  </ListItem>
                )}
              </List>
            </Card>
          </Grid>
        </Grid>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ params }: any) {
  return { props: { params } };
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
