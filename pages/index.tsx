import { Grid, Typography, Link } from "@mui/material";
import type { NextPage } from "next";
import Layout from "../components/layout";
import NextLink from "next/link";
import db from "../utility/db";
import Product from "../models/Product";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../utility/Store";
import ProductItem from "../components/ProductItem";
import Carousel from "react-material-ui-carousel";

const Home: NextPage = (props: any) => {
  // const { products } = props;
  const { topRatedProducts, featuredProducts } = props;

  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async (product: any) => {
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
    <Layout>
      <Carousel animation="slide">
        {featuredProducts.map((product: any) => (
          <NextLink
            key={product._id}
            href={`/product/${product.slug}`}
            passHref
            legacyBehavior
          >
            <Link>
              <img src={product.featuredImage} alt={product.name}></img>
            </Link>
          </NextLink>
        ))}
      </Carousel>
      <Typography variant="h2">محصولات پرفروش</Typography>
      <Grid container spacing={3}>
        {topRatedProducts.map((product: any) => (
          <Grid item md={4} key={product.name}>
            <ProductItem
              product={product}
              addToCartHandler={addToCartHandler}
            />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
};

export default Home;

export async function getServerSideProps() {
  // await db.connect();
  // const products = await Product.find({}, "-reviews").lean();

  // await db.disconnect();
  // return {
  //   props: {
  //     products: products.map(db.convertDocToObj),
  //   },
  // };

  await db.connect();
  const featuredProductsDocs = await Product.find(
    { isFeatured: true },
    "-reviews"
  )
    .lean()
    .limit(3);
  const topRatedProductsDocs = await Product.find({}, "-reviews")
    .lean()
    .sort({
      rating: -1,
    })
    .limit(6);
  await db.disconnect();
  return {
    props: {
      featuredProducts: featuredProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
    },
  };
}
