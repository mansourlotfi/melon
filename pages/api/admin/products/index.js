import nc from "next-connect";
import { isAdmin, isAuth } from "../../../../utility/auth";
import Product from "../../../../models/Product";
import db from "../../../../utility/db";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const products = await Product.find({});
  await db.disconnect();
  res.send(products);
});

handler.post(async (req, res) => {
  await db.connect();
  const newProduct = new Product({
    code: "sample name",
    name: req.body.name,
    packingUnit: req.body.packingUnit,
    packingWeight: req.body.packingWeight,
    image: "/images/shirt1.jpg",
  });

  const product = await newProduct.save();
  await db.disconnect();
  res.send({ message: "Product Created", product });
});

export default handler;
