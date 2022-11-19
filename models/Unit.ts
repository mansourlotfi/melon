import mongoose from "mongoose";

const unitsSchema = new mongoose.Schema(
  {
    code: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    packingWeight: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Unit = mongoose.models.Unit || mongoose.model("Unit", unitsSchema);
export default Unit;
