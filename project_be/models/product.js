import mongoose, { Schema } from "mongoose";
// Product object schema
const imageSchema = new Schema(
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
const productSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "product code is required"],
      unique: [true, "Product code is unique value"],
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Product name is required"],
      unique: [true, "Product name is unique value"],
    },
    images: [imageSchema],

    supplier: {
      type: Schema.Types.ObjectId,
      ref: "suppliers",
    },

    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0) throw new Error("Quantity > 0");
      },
    },
    size: {
      type: String,
      required: true,
    },
    material: {
      type: String,
      required: true,
    },
    in_price: {
      type: Number,
      default: 0,
      validate(value) {
        if (value < 0)
          throw new Error(
            "Price must be a number and greater than or equal zero"
          );
      },
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
  },
  {
    timestamps: true,
  }
);

// Create Product model mapping DB
const Products = mongoose.model("products", productSchema);
// Export model
export default Products;
