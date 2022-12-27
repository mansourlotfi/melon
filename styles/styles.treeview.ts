import { makeStyles, Theme } from "@mui/material";
import { SxProps } from "@mui/system";

export const titleSection: SxProps<Theme> = {
  background: "linear-gradient(135deg, #ff5500, #8c1bab)",
  minHeight: "400px",
  pb: "200px",
  pt: "100px",
  overflow: "hidden",
};

// const useStyles = makeStyles(() => ({
// fly:{

// }
// })

export const treeBoxSXIcons: SxProps<Theme> = {
  display: "none",
  "&:hover": {
    display: "inline-block",
    width: 100,
    border: "1px solid #00FF00",
    color: "gray",
    backgroundColor: "lightblue",
  },
};
