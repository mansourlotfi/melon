import nc from "next-connect";
import bcrypt from "bcryptjs";
import User from "../../../../models/User";
import db from "../../../../utility/db";
import { signToken } from "../../../../utility/auth";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    adminId: req.body.adminId,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
    isBrooker: true,
  });
  const user = await newUser.save();
  await db.disconnect();

  res.send({ message: `user ${user.name} created successfully` });
});

export default handler;
