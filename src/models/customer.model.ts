import mongoose, { Schema, Document } from "mongoose";

export type ICustomer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

const CustomerSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
});

export const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);
