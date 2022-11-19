import React from "react";
import Head from "next/head";
import {
  AppBar,
  Grid,
  Link,
  Paper,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import NextLink from "next/link";
import * as styles from "./styles";
import FavoriteIcon from "@mui/icons-material/Favorite";

function PublicLayout({ title, description, children }: any) {
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Melon` : "Melon"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <Grid
        container
        flexDirection="column"
        component={Paper}
        sx={{ minHeight: "100vh" }}
      >
        {/* <Grid item container>
          <AppBar position="static" sx={styles.navbar}>
            <Toolbar>
              <Box display="flex" alignItems="center">
                <NextLink href="/login" passHref legacyBehavior>
                  <Link>
                    <Typography>ورود به سامانه </Typography>
                  </Link>
                </NextLink>
              </Box>
            </Toolbar>
          </AppBar>
        </Grid> */}
        <Grid item container xs>
          {children}
        </Grid>
        <Grid
          container
          sx={styles.footerSection}
          alignSelf="center"
          justifyContent="space-between"
        >
          <Grid container pt={10}>
            <Grid item xs={4} textAlign="center">
              <Typography color={"#fff"}>راه های ارتباطی ما</Typography>
              <Typography color={"#fff"}>09113360715</Typography>
              <Typography color={"#fff"}> info@me.com </Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography color={"#fff"}>لینک های مهم</Typography>
              <Typography color={"#fff"}> فروشگاه </Typography>
              <Typography color={"#fff"}> ورود به سامانه</Typography>
              <Typography color={"#fff"}> دریاره ما </Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography color={"#fff"}>
                {" "}
                ما را در شبکه های مجازی دنبال کنید
              </Typography>
            </Grid>
          </Grid>
          <img
            src="/images/footer-vector.svg"
            style={{ position: "absolute", width: "100%", top: 0 }}
          />
        </Grid>
        <Grid item sx={styles.footer} xs="auto">
          <footer
            style={{
              alignSelf: "center",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#fff",
              }}
            >
              ساخته شده با
            </Typography>
            <FavoriteIcon sx={{ color: "red" }} />
          </footer>
        </Grid>
      </Grid>
    </div>
  );
}

export default PublicLayout;
