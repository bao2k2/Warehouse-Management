import mongoose, { Schema } from "mongoose";

const logoSchema = new Schema(
  {
    url: {
      type: String,
    },
    caption: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const supplierSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "supplier code is required"],
      unique: [true, "supplier code is unique value"],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "supplier name is required"],
      unique: [true, "supplier name is unique value"],
    },
    logo: [logoSchema],
    description: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Suppliers = mongoose.model("suppliers", supplierSchema);
// Export model
export default Suppliers;
