import nc from "next-connect";
import { isAdmin, isAuth } from "../../../../../utility/auth";
import Unit from "../../../../../models/Unit";
import db from "../../../../../utility/db";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const unit = await Unit.findById(req.query.id);
  await db.disconnect();
  res.send(unit);
});

handler.put(async (req, res) => {
  await db.connect();
  const unit = await Unit.findById(req.query.id);
  if (unit) {
    unit.code = req.body.code;
    unit.name = req.body.name;
    unit.packingWeight = req.body.packingWeight;
    await unit.save();
    await db.disconnect();
    res.send({ message: "Unit Updated Successfully" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Unit Not Found" });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const unit = await Unit.findById(req.query.id);
  if (unit) {
    await unit.remove();
    await db.disconnect();
    res.send({ message: "unit Deleted" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "unit Not Found" });
  }
});

export default handler;
