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
const customerSchema = new Schema(
  {
    id: {
      type: String,
      // required: [true, "customer code is required"],
      // unique: [true, "customer code is unique value"],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "customer name is required"],
      unique: [true, "customer name is unique value"],
    },
    // logo: [logoSchema],
    // description: {
    //   type: String,
    //   required: true,
    // },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      required: true,
    },
    // email: {
    //   type: String,
    //   required: true,
    // },
    // website: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Customers = mongoose.model("customers", customerSchema);
// Export model
export default Customers;
