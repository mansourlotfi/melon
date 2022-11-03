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
import { Vazirmatn } from "@next/font/google";
import FavoriteIcon from "@mui/icons-material/Favorite";
const vazirMatn = Vazirmatn();

function PublicLayout({ title, description, children }: any) {
  return (
    <div className={vazirMatn.className}>
      <Head>
        <title>{title ? `${title} - Next Store` : "Next Store"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <Grid container flexDirection="column" component={Paper}>
        <Grid item container>
          <AppBar position="static" sx={styles.navbar}>
            <Toolbar>
              <Box display="flex" alignItems="center">
                <NextLink href="/" passHref legacyBehavior>
                  <Link>
                    <Typography>تست فونت</Typography>
                  </Link>
                </NextLink>
              </Box>
            </Toolbar>
          </AppBar>
        </Grid>
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
              <Typography>راه های ارتباطی ما</Typography>
              <Typography>09113360715</Typography>
              <Typography> info@me.com </Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography>لینک های مهم</Typography>
              <Typography> فروشگاه </Typography>
              <Typography> ورود به سامانه</Typography>
              <Typography> دریاره ما </Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography> ما را در شبکه های مجازی دنبال کنید</Typography>
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
