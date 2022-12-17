import nc from "next-connect";
import { isAdmin, isAuth } from "../../../../utility/auth";
import AccountsTree from "../../../../models/AccountsTree";
import db from "../../../../utility/db";

const handler = nc();
handler.use(isAuth, isAdmin);

handler.get(async (req, res) => {
  await db.connect();
  const accountsTree = await AccountsTree.find({});
  await db.disconnect();
  res.send(accountsTree);
});

handler.post(async (req, res) => {
  await db.connect();
  const newAccountTree = new AccountsTree({
    code: req.body.code,
    name: req.body.name,
    referencAccount: req.body.referencAccount,
    essence: req.body.essence,
    user: req.user._id,
  });

  const tree = await newAccountTree.save();
  const accountsTree = await AccountsTree.find({});
  await db.disconnect();
  res.send({ message: "Tree Created", tree });
});

export default handler;
