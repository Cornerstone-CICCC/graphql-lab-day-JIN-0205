import { IOrder, Order } from "../models/order.model";

const getOrders = async () => {
  return await Order.find();
};
const createOrder = async (data: Omit<IOrder, "id">) => {
  const order = new Order(data);
  return await order.save();
};
const updateOrder = async (id: string, data: Partial<IOrder>) => {
  return await Order.findByIdAndUpdate(id, data);
};
const deleteOrder = async (id: string) => {
  return await Order.findByIdAndDelete(id);
};

export default {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
