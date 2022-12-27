import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    code: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: Object, required: false },
    cellPhone: { type: String, required: true },
    address: { type: String, required: false },
    credit: { type: String, required: false },
    contactType: {
      typeName: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);
export default Contact;
