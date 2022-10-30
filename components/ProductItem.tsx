import React from "react";
import NextLink from "next/link";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  CardActions,
  Button,
} from "@mui/material";

export default function ProductItem({ product, addToCartHandler }: any) {
  return (
    <Card>
      <NextLink href={`/product/${product.slug}`} passHref legacyBehavior>
        <CardActionArea>
          <CardMedia
            component="img"
            image={product.image}
            title={product.name}
          ></CardMedia>
          <CardContent>
            <Typography>{product.name}</Typography>
            <Rating value={product.rating} readOnly></Rating>
          </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <Typography>${product.price}</Typography>
        <Button
          size="small"
          color="primary"
          onClick={() => addToCartHandler(product)}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
}
