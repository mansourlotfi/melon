import nc from "next-connect";
import Product from "../../models/Product";
import User from "../../models/User";
import db from "../../utility/db";
import data from "../../utility/data";
const handler = nc();

handler.get(async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await Product.deleteMany();
  await Product.insertMany(data.products);

  await db.disconnect();
  res.send({ message: "Seeded successfully" });
});

export default handler;
