import React from "react";
import NextLink from "next/link";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import Image from "next/image";

interface IProps {
  image: string;
  title: string;
  link?: string;
}
export default function FeatureItem(props: IProps) {
  return (
    <Card>
      <NextLink href={``} passHref legacyBehavior>
        <CardActionArea sx={{ minWidth: 200 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ color: "#ff5500" }}>
              {props.title}
            </Typography>
          </CardContent>
          <CardMedia sx={{ p: 2 }}>
            <Image
              alt={props.title}
              src={props.image}
              width={200}
              height={200}
            />
          </CardMedia>
        </CardActionArea>
      </NextLink>
    </Card>
  );
}
