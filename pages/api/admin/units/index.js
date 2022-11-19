import nc from "next-connect";
// import { isAdmin, isAuth } from "../../../../utility/auth";
import Unit from "../../../../models/Unit";
import db from "../../../../utility/db";

const handler = nc();
// handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const units = await Unit.find({});
  await db.disconnect();
  res.send(units);
});

handler.post(async (req, res) => {
  await db.connect();
  const newUnit = new Unit({
    code: req.body.code,
    name: req.body.name,
    packingWeight: req.body.packingWeight,
  });

  const unit = await newUnit.save();
  await db.disconnect();
  res.send({ message: "Unit Created", unit });
});

export default handler;
