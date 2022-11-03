import React from "react";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider, CssBaseline } from "@mui/material";

import createEmotionCache from "../utility/createEmotionCache";
import { StoreProvider } from "../utility/Store";
import lightTheme from "../styles/theme/lightTheme";
import "../styles/globals.css";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
// import { prefixer } from 'stylis';
const clientSideEmotionCache = createEmotionCache();

// const cacheRtl = createCache({
//   key: 'muirtl',
//   stylisPlugins: [prefixer, rtlPlugin],
// });

const cacheRtl = createCache({ key: "muirtl", stylisPlugins: [rtlPlugin] });

const MyApp = (props: any) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <StoreProvider>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </StoreProvider>
  );
};

export default MyApp;
