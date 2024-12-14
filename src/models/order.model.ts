import mongoose, { Schema, Document } from "mongoose";

export type IOrder = {
  id: string;
  // productId: mongoose.Schema.Types.ObjectId;
  // customerId: mongoose.Schema.Types.ObjectId;
  productId: string;
  customerId: string;
};

const OrderSchema: Schema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Customer",
  },
});

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
