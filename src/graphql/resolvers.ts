import customerController from "../controllers/customer.controller";
import orderController from "../controllers/order.controller";
import productController from "../controllers/product.controller";
import { ICustomer } from "../models/customer.model";
import { IOrder } from "../models/order.model";
import { IProduct } from "../models/product.model";

// Finish the resolvers
export const resolvers = {
  Query: {
    hello: () => "Hello",
    products: async () => await productController.getProducts(),
    customers: async () => await customerController.getCustomers(),
    orders: async () => await orderController.getOrders(),
    getProductById: async (_: unknown, { id }: { id: string }) =>
      await productController.getProductById(id),
    getCustomerById: async (_: unknown, { id }: { id: string }) =>
      await customerController.getCustomerById(id),
  },
  Product: {
    customers: async (parent: { id: string }) => {
      const getAllOrders = await orderController.getOrders();
      const filteredOrders = getAllOrders.filter(
        (order) => order.productId.toString() === parent.id
      );
      const customerIds = filteredOrders.map((order) => order.customerId);
      const customers = customerIds.map((id) =>
        customerController.getCustomerById(id)
      );
      return customers;
    },
  },
  Customer: {
    products: async (parent: { id: string }) => {
      const getAllOrders = await orderController.getOrders();
      const filteredOrders = getAllOrders.filter(
        (order) => order.customerId.toString() === parent.id
      );
      const productIds = filteredOrders.map((order) => order.productId);
      const products = productIds.map((id) =>
        productController.getProductById(id)
      );
      return products;
    },
  },
  Order: {
    product: async (parent: { productId: string }) =>
      await productController.getProductById(parent.productId),
    customer: async (parent: { customerId: string }) =>
      await customerController.getCustomerById(parent.customerId),
  },
  Mutation: {
    addProduct: async (
      _: unknown,
      { productName, productPrice }: Omit<IProduct, "id">
    ) => await productController.createProduct({ productName, productPrice }),
    editProduct: async (
      _: unknown,
      { id, productName, productPrice }: IProduct
    ) =>
      await productController.updateProduct(id, { productName, productPrice }),
    removeProduct: async (_: unknown, { id }: { id: string }) =>
      await productController.deleteProduct(id),

    addCustomer: async (
      _: unknown,
      { firstName, lastName, email }: Omit<ICustomer, "id">
    ) =>
      await customerController.createCustomer({ firstName, lastName, email }),
    editCustomer: async (
      _: unknown,
      { id, firstName, lastName, email }: ICustomer
    ) =>
      await customerController.updateCustomer(id, {
        firstName,
        lastName,
        email,
      }),
    removeCustomer: async (_: unknown, { id }: { id: string }) =>
      await customerController.deleteCustomer(id),
    addOrder: async (_: unknown, { productId, customerId }: IOrder) =>
      await orderController.createOrder({ productId, customerId }),
    editOrder: async (_: unknown, { id, productId, customerId }: IOrder) =>
      await orderController.updateOrder(id, { productId, customerId }),
    removeOrder: async (_: unknown, { id }: { id: string }) =>
      await orderController.deleteOrder(id),
  },
};
