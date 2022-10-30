import nc from "next-connect";
import Order from "../../../models/Order";
import { isAuth } from "../../../utility/auth";
import db from "../../../utility/db";
import { onError } from "../../../utility/error";

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.get(async (req, res) => {
  await db.connect();
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);
});

export default handler;
