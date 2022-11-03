import { Theme } from "@mui/material";
import { SxProps } from "@mui/system";

export const navbar: SxProps<Theme> = {
  backgroundColor: "#203040",
  "& a": {
    color: "#ffffdd",
    marginLeft: 10,
  },
};

export const body: SxProps<Theme> = {
  minHeight: "900px",
};

export const footer: SxProps<Theme> = {
  textAlign: "center",
  backgroundColor: "#5a126d",
};

export const footerSection: SxProps<Theme> = {
  background: "linear-gradient(135deg, #f761a1, #8c1bab)",
  backgroundImage:
    "linear-gradient(135deg, rgb(247, 97, 161), rgb(140, 27, 171))",
  minHeight: "400px",
  pb: "100px",
  pt: "100px",
  overflow: "hidden",
  position: "relative",
};
