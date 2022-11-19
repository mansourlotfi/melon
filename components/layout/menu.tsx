import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

export const Adminenu = [
  {
    icon: <DashboardIcon />,
    title: "داشبورد",
    to: "/admin/dashboard",
    items: [],
  },
  {
    icon: <PeopleAltIcon />,
    title: "اطلاعات پایه",
    items: [
      {
        title: "کاربران",
        to: "/admin/users",
      },
      {
        title: "تعریف کاربر",
        to: "/admin/user/register-brooker",
      },
      {
        title: "میوه ها",
        to: "/admin/products",
      },
      {
        title: "تعریف میوه",
        to: "/admin/products/add-product",
      },
      {
        title: "واحد هاي اندازه گیري",
        to: "/admin/units",
      },
      {
        title: "تعریف واحد اندازه گیري",
        to: "/admin/unit/add-unit",
      },
    ],
  },
];
