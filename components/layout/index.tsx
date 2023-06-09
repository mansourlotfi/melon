import React, { useContext, useEffect, useState } from "react";
import Head from "next/head";
import {
  AppBar,
  Container,
  Grid,
  Link,
  Paper,
  Toolbar,
  Typography,
  Badge,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import NextLink from "next/link";
import * as styles from "./styles";
import { Store } from "../../utility/Store";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Adminenu } from "./menu";

const SingleLevel = ({ item }: any) => {
  const router = useRouter();
  return (
    <NextLink href={item?.to ? item.to : ""} passHref legacyBehavior>
      <ListItem selected={router.route === item?.to} button component="a">
        {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
        <ListItemText primary={item.title} />
      </ListItem>
    </NextLink>
  );
};

const MultiLevel = ({ item }: any) => {
  const { items: children } = item;

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.title} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children.map((child: any, key: any) => (
            <DynamicMenuItem key={key} item={child} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export function hasChildren(item: any) {
  const { items: children } = item;

  if (children === undefined) {
    return false;
  }

  if (children.constructor !== Array) {
    return false;
  }

  if (children.length === 0) {
    return false;
  }

  return true;
}

const DynamicMenuItem = ({ item }: any) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} />;
};

function Layout({ title, description, children }: any) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const { cart } = state;
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [sidbarVisible, setSidebarVisible] = useState(false);

  const sidebarOpenHandler = () => {
    setSidebarVisible(true);
  };
  const sidebarCloseHandler = () => {
    setSidebarVisible(false);
  };

  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {}
  };

  const queryChangeHandler = (e: any) => {
    setQuery(e.target.value);
  };
  const submitHandler = (e: any) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  const loginClickHandler = (e: any) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = (e: any, redirect?: any) => {
    setAnchorEl(null);
    if (redirect) {
      router.push(redirect);
    }
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("cartItems");
    Cookies.remove("shippinhAddress");
    Cookies.remove("paymentMethod");
    router.push("/");
  };

  useEffect(() => {
    // fetchCategories();
  }, []);

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Melon` : "Melon"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <Grid container flexDirection="column" component={Paper}>
        <Grid item container>
          <AppBar position="static" sx={styles.navbar}>
            <Toolbar
              sx={{
                overflow: "hidden",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box display="flex" alignItems="center" sx={{ width: "100" }}>
                <IconButton
                  edge="start"
                  aria-label="open drawer"
                  onClick={sidebarOpenHandler}
                  sx={{ color: "#fff" }}
                  // className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <Drawer
                anchor="left"
                open={sidbarVisible}
                onClose={sidebarCloseHandler}
              >
                <List sx={{ minWidth: 200 }}>
                  <ListItem>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Grid item>
                        <Typography>بار فروشی و حق العمل کاری</Typography>
                      </Grid>
                      <Grid item>
                        <IconButton
                          aria-label="close"
                          onClick={sidebarCloseHandler}
                        >
                          <CloseIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider light />
                  {userInfo?.isAdmin &&
                    Adminenu.map((item, key): any => (
                      <DynamicMenuItem key={key} item={item} />
                    ))}
                  {userInfo?.isAdmin && (
                    <>
                      {/* <NextLink href="/admin/orders" passHref legacyBehavior>
                        <ListItem
                          selected={router.route === "/admin/orders"}
                          button
                          component="a"
                        >
                          <ListItemText primary="سفارشات"></ListItemText>
                        </ListItem>
                      </NextLink> */}
                    </>
                  )}
                </List>
              </Drawer>

              {userInfo ? (
                <>
                  <Button
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={loginClickHandler}
                  >
                    {userInfo.name}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={(e) => loginMenuCloseHandler(e)}
                  >
                    <MenuItem
                      onClick={(e) => loginMenuCloseHandler(e, "/profile")}
                    >
                      پروفایل
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, "/order-history")
                      }
                    >
                      تاریخچه سفارشات
                    </MenuItem>
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, "/admin/dashboard")
                        }
                      >
                        پنل ادمین
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutClickHandler}>خروج</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref legacyBehavior>
                  <Link>
                    <Typography component="span">ورود</Typography>
                  </Link>
                </NextLink>
              )}
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item container xs>
          <Container sx={styles.body}>{children}</Container>
        </Grid>
        <Grid item sx={styles.footer} xs="auto">
          <footer>
            <Typography>تمامی حقوق برای تیم محفوظ می باشد</Typography>
          </footer>
        </Grid>
      </Grid>
    </div>
  );
}

export default Layout;
