import nc from "next-connect";
import { isAdmin, isAuth } from "../../../../utility/auth";
import Contact from "../../../../models/Contact";
import db from "../../../../utility/db";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const contacts = await Contact.find({});
  await db.disconnect();
  res.send(contacts);
});

handler.post(async (req, res) => {
  await db.connect();
  const newContact = new Contact({
    code: req.body.code,
    name: req.body.name,
    phone: req.body.phone,
    cellPhone: req.body.cellPhone,
    address: req.body.address,
    credit: req.body.credit,
    contactType: req.body.contactType,
  });

  const contact = await newContact.save();
  await db.disconnect();
  res.send({ message: "Contact Created", contact });
});

export default handler;
