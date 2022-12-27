import nc from "next-connect";
import { isAdmin, isAuth } from "../../../../../utility/auth";
import Contact from "../../../../../models/Contact";

import db from "../../../../../utility/db";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const contact = await Contact.findById(req.query.id);
  await db.disconnect();
  res.send(contact);
});

handler.put(async (req, res) => {
  await db.connect();
  const contact = await Contact.findById(req.query.id);
  // const unit = await Unit.findById(req.body.packingUnit).lean();

  if (contact) {
    contact.code = req.body.code;
    contact.name = req.body.name;
    contact.packingUnit = req.body.packingUnit;
    contact.image = req.body.image;
    await contact.save();
    await db.disconnect();
    res.send({ message: "Contact Updated Successfully" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Contact Not Found" });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const contact = await Contact.findById(req.query.id);
  if (contact) {
    await contact.remove();
    await db.disconnect();
    res.send({ message: "Contact Deleted" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Contact Not Found" });
  }
});

export default handler;
