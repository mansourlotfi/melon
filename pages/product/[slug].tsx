import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Layout from "../../components/layout";
import NextLink from "next/link";
import {
  Grid,
  Link,
  Typography,
  List,
  ListItem,
  Button,
  Card,
  Rating,
  TextField,
  CircularProgress,
} from "@mui/material";
import db from "../../utility/db";
import Product from "../../models/Product";
import { Store } from "../../utility/Store";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductScreens(props: any) {
  const router = useRouter();
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `/api/products/${product._id}/reviews`,
        {
          rating,
          comment,
        },
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      setLoading(false);
      fetchReviews();
    } catch (err) {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await axios.get(`/api/products/${product._id}/reviews`);
      setReviews(data);
    } catch (err) {}
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  if (!product) return <div>Product Not Found</div>;

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find(
      (x: any) => x._id === product._id
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  return (
    <Layout title={product.name} description={product.description}>
      <Grid mt={2} mb={2}>
        <NextLink href="/" passHref legacyBehavior>
          <Link>
            <Typography>Back to products</Typography>
          </Link>
        </NextLink>
      </Grid>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography>Categoty : {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand : {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Rating value={product.rating} readOnly></Rating>
              <Link href="#reviews">
                <Typography>({product.numReviews} reviews)</Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Typography>Description : {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? "In stock" : "Unavailable"}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <List>
          <ListItem>
            <Typography id="reviews" variant="h4">
              Customer Reviews
            </Typography>
          </ListItem>
          {reviews.length === 0 && <ListItem>No review</ListItem>}
          {reviews.map((review: any) => (
            <ListItem key={review._id}>
              <Grid container>
                <Grid item>
                  <Typography>
                    <strong>{review.name}</strong>
                  </Typography>
                  <Typography>{review.createdAt.substring(0, 10)}</Typography>
                </Grid>
                <Grid item>
                  <Rating value={review.rating} readOnly></Rating>
                  <Typography>{review.comment}</Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
          <ListItem>
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <List>
                  <ListItem>
                    <Typography variant="h4">Leave your review</Typography>
                  </ListItem>
                  <ListItem>
                    <TextField
                      multiline
                      variant="outlined"
                      fullWidth
                      name="review"
                      label="Enter comment"
                      value={comment}
                      onChange={(e: any) => setComment(e.target.value)}
                    />
                  </ListItem>
                  <ListItem>
                    <Rating
                      name="simple-controlled"
                      value={rating}
                      onChange={(e: any) => setRating(e.target.value)}
                    />
                  </ListItem>
                  <ListItem>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Submit
                    </Button>

                    {loading && <CircularProgress></CircularProgress>}
                  </ListItem>
                </List>
              </form>
            ) : (
              <Typography variant="h4">
                Please{" "}
                <Link href={`/login?redirect=/product/${product.slug}`}>
                  login
                </Link>{" "}
                to write a review
              </Typography>
            )}
          </ListItem>
        </List>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }, "-reviews").lean();

  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };

  // await db.connect();
  // const featuredProductsDocs = await Product.find(
  //   { isFeatured: true },
  //   "-reviews"
  // )
  //   .lean()
  //   .limit(3);
  // const topRatedProductsDocs = await Product.find({}, "-reviews")
  //   .lean()
  //   .sort({
  //     rating: -1,
  //   })
  //   .limit(6);
  // await db.disconnect();
  // return {
  //   props: {
  //     featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
  //     topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
  //   },
  // };
}
