import nc from "next-connect";
import { isAdmin, isAuth } from "../../../../utility/auth";
import ContactTypes from "../../../../models/ContactType";
import db from "../../../../utility/db";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const typeNames = await ContactTypes.find({});
  await db.disconnect();
  res.send(typeNames);
});

handler.post(async (req, res) => {
  await db.connect();
  const newTypes = new ContactTypes({
    typeName: req.body.typeName,
  });

  const typeName = await newTypes.save();
  await db.disconnect();
  res.send({ message: "Type Created", typeName });
});

export default handler;
