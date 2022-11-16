import nc from "next-connect";
import { isAdmin, isAuth } from "../../../../utility/auth";
import User from "../../../../models/User";
import db from "../../../../utility/db";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();

  const users = await User.find({ adminId: { $eq: req.query.adminId } });
  await db.disconnect();
  res.send(users);
});

export default handler;
