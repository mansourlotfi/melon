import mongoose from "mongoose";

const accountsTreeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    referencAccount: { type: String, required: false },
    code: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    essence: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const AccountsTree =
  mongoose.models.AccountsTree ||
  mongoose.model("AccountsTree", accountsTreeSchema);
export default AccountsTree;
