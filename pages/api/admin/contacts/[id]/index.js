import nc from "next-connect";
import { isAdmin, isAuth } from "../../../../../utility/auth";
import Product from "../../../../../models/Product";
import Unit from "../../../../../models/Unit";

import db from "../../../../../utility/db";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
});

handler.put(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  // const unit = await Unit.findById(req.body.packingUnit).lean();

  if (product) {
    product.code = req.body.code;
    product.name = req.body.name;
    product.packingUnit = req.body.packingUnit;
    product.image = req.body.image;
    await product.save();
    await db.disconnect();
    res.send({ message: "Product Updated Successfully" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Product Not Found" });
  }
});

handler.delete(async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  if (product) {
    await product.remove();
    await db.disconnect();
    res.send({ message: "Product Deleted" });
  } else {
    await db.disconnect();
    res.status(404).send({ message: "Product Not Found" });
  }
});

export default handler;
