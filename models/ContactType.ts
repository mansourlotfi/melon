import mongoose from "mongoose";

const contactTypesSchema = new mongoose.Schema(
  {
    typeName: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const ContactTypes =
  mongoose.models.ContactTypes ||
  mongoose.model("ContactTypes", contactTypesSchema);

export default ContactTypes;
