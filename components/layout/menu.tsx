import DashboardIcon from "@mui/icons-material/Dashboard";
import DatasetIcon from "@mui/icons-material/Dataset";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

export const Adminenu = [
  {
    icon: <DashboardIcon />,
    title: "داشبورد",
    to: "/admin/dashboard",
    items: [],
  },
  {
    icon: <DatasetIcon />,
    title: "اطلاعات پایه",
    items: [
      {
        title: "کاربران",
        to: "/admin/users",
      },
      {
        title: "تعریف فروشنده جدید",
        to: "/admin/user/register-brooker",
      },
      {
        title: "میوه ها",
        to: "/admin/products",
      },
      {
        title: "تعریف میوه جدید",
        to: "/admin/product/add-product",
      },
      {
        title: "واحد هاي اندازه گیري",
        to: "/admin/units",
      },
      {
        title: "تعریف واحد اندازه گیري",
        to: "/admin/unit/add-unit",
      },
      {
        title: "درخت حساب",
        to: "/admin/accountsTree",
      },
      {
        title: "نوع حساب",
        to: "/admin/contactType",
      },
      {
        title: "تعریف طرف حساب",
        to: "/admin/contacts/createContact",
      },
      {
        title: "طرف حساب ها",
        to: "/admin/contacts",
      },
    ],
  },
  {
    icon: <ReceiptLongIcon />,
    title: "عملیات",
    items: [
      {
        title: "کاربران",
        to: "/admin/users",
      },
    ],
  },
];
