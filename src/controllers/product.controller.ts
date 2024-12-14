import { IProduct, Product } from "../models/product.model";

const getProducts = async () => {
  return await Product.find();
};
const createProduct = async (data: Omit<IProduct, "id">) => {
  const newProduct = new Product(data);
  await newProduct.save();
  return newProduct;
};
const getProductById = async (id: string) => {
  return await Product.findById(id);
};
const updateProduct = async (id: string, data: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};
const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

export default {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
