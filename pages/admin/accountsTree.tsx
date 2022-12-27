import { LoadingButton, TreeItem, TreeView } from "@mui/lab";
import React, { useContext, useEffect, useReducer, useState } from "react";
import dynamic from "next/dynamic";
import Layout from "../../components/layout";
import {
  Box,
  Card,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Store } from "../../utility/Store";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import * as styles from "../../styles/styles.treeview";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "", treeData: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true, errorUpdate: "" };
    case "UPDATE_SUCCESS":
      return {
        ...state,
        loadingUpdate: false,
        errorUpdate: "",
        successUpdate: true,
      };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false, errorUpdate: action.payload };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true };
    case "DELETE_SUCCESS":
      return { ...state, loadingDelete: false, successDelete: true };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false };
    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };
    default:
      return state;
  }
}

const essenceType = [
  {
    id: 1,
    value: "بدهکار",
  },
  {
    id: 2,
    value: "بستانکار",
  },
  {
    id: 3,
    value: "خنثی",
  },
  {
    id: 4,
    value: "دوگانه",
  },
];

function nested(data, pid = undefined) {
  if (!data) return;
  return data.reduce((r, e) => {
    if (e.referencAccount == pid) {
      const obj = { ...e };
      const children = nested(data, e._id);
      if (children.length) obj.children = children;
      r.push(obj);
    }

    return r;
  }, []);
}

function AccountsTree() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();

  const [referencAccount, setReferencAccount] = useState([]);
  const [selectedReferencAccount, setSelectedReferencAccount] = useState(null);
  const [selectedEssence, setSelectedEssence] = useState(null);

  const [selectedNode, setSelectedNode] = useState({});
  const [selectedRoot, setSelectedRoot] = useState({});

  const [
    {
      loading,
      error,
      loadingUpdate,
      loadingUpload,
      successDelete,
      treeData,
      successUpdate,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  console.log("treeData", treeData);
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  const submitHandler = async ({ code, name }: any) => {
    try {
      dispatch({ type: "UPDATE_REQUEST" });
      await axios
        .post(
          `/api/admin/accountsTree`,
          {
            referencAccount: selectedReferencAccount,
            code,
            name,
            essence: selectedEssence,
          },
          { headers: { authorization: `Bearer ${userInfo.token}` } }
        )
        .then((res) => toast.success(res.data.message));
      dispatch({ type: "UPDATE_SUCCESS" });
    } catch (err: any) {
      console.log("err.response", err);
      // dispatch({ type: "UPDATE_FAIL", payload: getError(err) });
    }
  };

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/admin/accountsTree`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        const result = nested(data);
        dispatch({ type: "FETCH_SUCCESS", payload: result });
        setReferencAccount(data);
      } catch (err) {
        // dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    if (successDelete) {
      dispatch({ type: "DELETE_RESET" });
    } else {
      fetchData();
    }
  }, [successUpdate]);

  const handleChange = (event, nodeId) => {
    treeData.forEach((treeRoot) => {
      if (treeRoot._id === nodeId) {
        setSelectedRoot(treeRoot);
        setSelectedNode(treeRoot);
        return;
      }

      handleSelectedNode(treeRoot.children, treeRoot, nodeId);
    });
  };

  const handleSelectedNode = (children, treeRoot, nodeId) => {
    if (!children) {
      return;
    }

    for (let i = 0; i < children.length; i++) {
      let childNode = children[i];
      if (childNode.id === nodeId) {
        setSelectedRoot(treeRoot);
        setSelectedNode(childNode);
        return;
      }

      handleSelectedNode(childNode.children || [], treeRoot, nodeId);
    }
  };

  const displayTreeView = (treeViewArray) => {
    if (!treeViewArray) {
      return null;
    }
    return treeViewArray.map((treeViewItem) => {
      return (
        <TreeItem
          key={treeViewItem._id}
          nodeId={`${treeViewItem._id}`}
          label={treeViewItem.name}
        >
          {displayTreeView(treeViewItem.children)}
        </TreeItem>
      );
    });
  };

  return (
    <Layout title="accounts tree">
      <Grid container spacing={1} justifyContent="center">
        <Grid item lg={6} md={6} xs={12} mt={5}>
          <Card>
            <form onSubmit={handleSubmit(submitHandler)}>
              <List>
                <ListItem>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      حساب مرجع
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="referencAccount"
                      name="referencAccount"
                      value={referencAccount.find(
                        (AC) => AC._id === selectedReferencAccount
                      )}
                      label="حساب مرجع"
                      onChange={(e) =>
                        setSelectedReferencAccount(e.target.value)
                      }
                    >
                      {referencAccount.map((AC: any) => (
                        <MenuItem key={AC._id} value={AC._id}>
                          {AC.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </ListItem>
                <ListItem>
                  <Controller
                    name="code"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="code"
                        label="کد"
                        error={Boolean(errors.code)}
                        helperText={errors.code ? "code is required" : ""}
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>

                <ListItem>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="name"
                        label="عنوان حساب"
                        error={Boolean(errors.name)}
                        helperText={errors.name ? "name is required" : ""}
                        {...field}
                      ></TextField>
                    )}
                  ></Controller>
                </ListItem>
                <ListItem>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      ماهیت حساب
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="essence"
                      name="essence"
                      value={essenceType.find(
                        (AC) => AC.id === selectedEssence
                      )}
                      label="ماهیت حساب"
                      onChange={(e) => setSelectedEssence(e.target.value)}
                      required
                    >
                      {essenceType.map((AC: any) => (
                        <MenuItem key={AC.id} value={AC.id}>
                          {AC.value}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* value={brand} onChange={brandHandler} */}
                </ListItem>
                <ListItem>
                  <LoadingButton
                    variant="contained"
                    type="submit"
                    fullWidth
                    loading={loadingUpload}
                    color="primary"
                  >
                    ثبت
                  </LoadingButton>
                </ListItem>
              </List>
            </form>
          </Card>
        </Grid>
      </Grid>
      <Grid container>
        <Card sx={{ width: "100%" }}>
          <Grid container spacing={1} mt={10}>
            <TreeView
              onNodeSelect={handleChange}
              sx={{
                minHeight: 400,
                flexGrow: 1,
                maxWidth: 800,
                overflowY: "auto",
              }}
            >
              {displayTreeView(treeData)}
            </TreeView>
          </Grid>
        </Card>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(AccountsTree), { ssr: false });
