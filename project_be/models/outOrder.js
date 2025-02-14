import mongoose, { Schema } from "mongoose";

const outOrderSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "products",
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "customers",
    },
    out_price: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0)
          throw new Error(
            "Price must be a number and greater than or equal zero"
          );
      },
    },

    quantity_real: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) throw new Error("Quantity > 0");
      },
    },
    quantity_doc: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) throw new Error("Quantity > 0");
      },
    },
    staff: {
      type: Schema.Types.ObjectId,
      ref: "accounts",
    },
    receiver: {
      type: String,
      required: true,
    },

    invoice: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const outOrders = mongoose.model("outOrders", outOrderSchema);
// Export model
export default outOrders;
