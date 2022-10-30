import nc from "next-connect";
import Order from "../../../models/Order";
import { isAuth, isAdmin } from "../../../utility/auth";
import db from "../../../utility/db";
import { onError } from "../../../utility/error";

const handler = nc({
  onError,
});
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find({}).populate("user", "name");
  await db.disconnect();
  res.send(orders);
});

export default handler;
