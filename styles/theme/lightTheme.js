import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    h1: {
      fontSize: "1.6rem",
      fontWeight: 400,
      margin: "1rem 0",
    },
  },
});

export default lightTheme;
