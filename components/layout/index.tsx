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
} from "@mui/material";
import NextLink from "next/link";
import * as styles from "./styles";
import { Store } from "../../utility/Store";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
import { Vazirmatn } from "@next/font/google";

const vazirMatn = Vazirmatn();

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
    fetchCategories();
  }, []);

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
                <IconButton
                  edge="start"
                  aria-label="open drawer"
                  onClick={sidebarOpenHandler}
                  sx={{ color: "#fff" }}
                  // className={classes.menuButton}
                >
                  {/* <MenuIcon  /> */}
                  ||||
                </IconButton>
                <NextLink href="/" passHref legacyBehavior>
                  <Link>
                    <Typography>تست فونت</Typography>
                  </Link>
                </NextLink>
              </Box>
              <Drawer
                anchor="left"
                open={sidbarVisible}
                onClose={sidebarCloseHandler}
              >
                <List>
                  <ListItem>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Typography>Shopping by category</Typography>
                      <IconButton
                        aria-label="close"
                        onClick={sidebarCloseHandler}
                      >
                        *close
                      </IconButton>
                    </Box>
                  </ListItem>
                  <Divider light />
                  {categories.map((category) => (
                    <NextLink
                      key={category}
                      href={`/search?category=${category}`}
                      passHref
                      legacyBehavior
                    >
                      <ListItem
                        button
                        component="a"
                        onClick={sidebarCloseHandler}
                      >
                        <ListItemText primary={category}></ListItemText>
                      </ListItem>
                    </NextLink>
                  ))}
                </List>
              </Drawer>
              <Grid item flexGrow={1} textAlign="center" alignSelf="center">
                <form onSubmit={submitHandler}>
                  <InputBase
                    name="query"
                    placeholder="Search products"
                    onChange={queryChangeHandler}
                    sx={{ backgroundColor: "#fff" }}
                  />
                  <IconButton
                    type="submit"
                    aria-label="search"
                    sx={{ color: "#fff" }}
                  >
                    search
                  </IconButton>
                </form>
              </Grid>

              <NextLink href="/cart" passHref legacyBehavior>
                <Link>
                  {cart.cartItems.length > 0 ? (
                    <Badge
                      badgeContent={cart.cartItems.length}
                      color="secondary"
                    >
                      Cart
                    </Badge>
                  ) : (
                    "Cart"
                  )}
                </Link>
              </NextLink>

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
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={(e) =>
                        loginMenuCloseHandler(e, "/order-history")
                      }
                    >
                      Order Hisotry
                    </MenuItem>
                    {userInfo.isAdmin && (
                      <MenuItem
                        onClick={(e) =>
                          loginMenuCloseHandler(e, "/admin/dashboard")
                        }
                      >
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref legacyBehavior>
                  <Link>
                    <Typography component="span">Login</Typography>
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
            <Typography>All rights reserved next store</Typography>
          </footer>
        </Grid>
      </Grid>
    </div>
  );
}

export default Layout;
