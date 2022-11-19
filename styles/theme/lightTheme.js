import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  direction: "rtl",

  palette: {
    mode: "light",
  },
  typography: {
    h1: {
      fontSize: "1.6rem",
      fontWeight: 400,
      margin: "1rem 0",
    },
    h4: {},
  },
});

export default lightTheme;
