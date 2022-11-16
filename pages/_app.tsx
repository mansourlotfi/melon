import React from "react";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { StoreProvider } from "../utility/Store";
import lightTheme from "../styles/theme/lightTheme";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const cacheRtl = createCache({ key: "muirtl", stylisPlugins: [rtlPlugin] });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return getLayout(
    <StoreProvider>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </ThemeProvider>
      </CacheProvider>
    </StoreProvider>
  );
};

export default MyApp;
