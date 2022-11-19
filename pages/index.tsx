import { Grid, Typography, Container, Button } from "@mui/material";
import { ReactElement } from "react";
import * as styles from "../styles/styles.home";
import Image from "next/image";
import FeatureItem from "../components/feature";
import PublicLayout from "../components/publicLayout";
import { NextPageWithLayout } from "./_app";
import Link from "next/link";

const Home: NextPageWithLayout = (props: any) => {
  return (
    <Grid container>
      <Grid container sx={styles.titleSection} position="relative">
        <Grid item xs={6} sx={{ textAlign: "center", alignSelf: "center" }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h2" sx={{ color: "#fff" }}>
                نرم افزار بار فروشی و حق العمل کاری ملون
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ color: "#fff" }}>
                کسب و کارت رو حرفه ای کن
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sx={{ textAlign: "center" }}>
          <Image
            alt="progress"
            src="/images/progress.svg"
            width={400}
            height={400}
          />
        </Grid>
        <img
          src="/images/intro-vector.svg"
          style={{
            position: "absolute",
            width: "100%",
            bottom: -1,
          }}
        />
      </Grid>
      <Container>
        <Grid container mt={10} mb={10} justifyContent="center">
          <Link href="/login">
            <Button variant="contained" color="primary">
              <Typography variant="h4">ورود به سامانه</Typography>
            </Button>
          </Link>
        </Grid>
        <Grid container mt={10} mb={10}>
          <Grid item xs={4}>
            <Image
              src="/images/fastWorking.svg"
              alt="asd"
              width={150}
              height={150}
              className="test"
            ></Image>
          </Grid>
          <Grid
            item
            xs={8}
            sx={{
              textAlign: "center",
              alignSelf: "center",
            }}
          >
            <Typography variant="h5" sx={{ color: "#ff5500" }}>
              در کمترین زمان فروشت رو بیشتر کن و هزینه هات رو کم کن
            </Typography>
          </Grid>
        </Grid>

        <Grid container justifyContent="space-around" mb={2}>
          <Grid item xs={12} textAlign="center" pb={5}>
            <Typography variant="h4" sx={{ color: "#ff5500" }}>
              امکانات نرم افزار ملون
            </Typography>
          </Grid>
          <FeatureItem image="/images/melon1.svg" title="فروش حق العمل کاری" />
          <FeatureItem image="/images/melon2.svg" title="گزارش گیری" />
          <FeatureItem image="/images/melon3.svg" title="شخصی سازی" />
        </Grid>

        <Grid container justifyContent="space-around" mt={10} mb={2}>
          <Grid item xs={12} textAlign="center" pb={5}>
            <Typography variant="h4" sx={{ color: "#ff5500" }}>
              مشتریان
            </Typography>
          </Grid>
          <FeatureItem image="/images/melon1.svg" title="فروش حق العمل کاری" />
          <FeatureItem image="/images/melon2.svg" title="گزارش گیری" />
          <FeatureItem image="/images/melon3.svg" title="شخصی سازی" />
        </Grid>
      </Container>
    </Grid>
  );
};

export default Home;

Home.getLayout = function getLayout(Home: ReactElement) {
  return <PublicLayout>{Home}</PublicLayout>;
};
