import mongoose, { Schema } from "mongoose";

export type IProduct = {
  id: string;
  productName: string;
  productPrice: number;
};

const ProductSchema = new Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, require: true },
});

export const Product = mongoose.model("Product", ProductSchema);
