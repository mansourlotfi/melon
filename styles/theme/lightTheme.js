import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  direction: "rtl",
  fontFamily: "Vazirmatn",

  palette: {
    mode: "light",
  },
  typography: {
    fontFamily: "Vazirmatn",
    h1: {
      fontSize: "1.6rem",
      fontWeight: 400,
      margin: "1rem 0",
      fontFamily: "Vazirmatn",
    },
    h4: {
      fontFamily: "Vazirmatn",
    },
  },
});

export default lightTheme;
