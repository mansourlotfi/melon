import nc from "next-connect";
import { isAdmin, isAuth } from "../../../../../utility/auth";
import ContactTypes from "../../../../../models/ContactType";
import db from "../../../../../utility/db";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.delete(async (req, res) => {
  await db.connect();
  const typeName = await ContactTypes.findById(req.query.id);
  if (typeName) {
    await typeName.remove();
    await db.disconnect();
    res.send({ message: "Type Deleted" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Type Not Found" });
  }
});

export default handler;
