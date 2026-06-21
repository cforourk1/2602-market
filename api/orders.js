import express from "express";
import { getIo } from "#socket";
import { createOrder, getOrderById, getOrders } from "#db/queries/orders";
import { createOrderProduct } from "#db/queries/orders_products";
import { getProductsByOrderId, getProductById } from "#db/queries/products";
import requireBody from "#middleware/requireBody";
import requireUser from "#middleware/requireUser";

const router = express.Router();
export default router;

router.use(requireUser);

router.get("/", async (req, res) => {
  const orders = await getOrders(req.user.id);
  res.send(orders);
});

// post an order - requires date, note, user id
router.post("/", requireBody(["date"]), async (req, res) => {
  const { date, note } = req.body;
  const order = await createOrder(date, note, req.user.id);
getIo().emit("new:order", order);
  res.status(201).send(order);
});

// get an order Id - it it doesnt match send an error  - this holds the id
router.param("id", async (req, res, next, id) => {
  const order = await getOrderById(id);
  if (!order) return res.status(404).send("Order not found.");
  req.order = order;
  next();
});

router.get("/:id", (req, res) => {
  if (req.order.user_id !== req.user.id) return res.status(403).send("Forbidden.");
  res.send(req.order);
});

//get order products by order user id has to match

router.get("/:id/products", async (req, res) => {
  if (req.order.user_id !== req.user.id) return res.status(403).send("Forbidden.");
  const products = await getProductsByOrderId(req.order.id);
  res.send(products);
});

// error handling for product not found

router.post("/:id/products", requireBody(["productId", "quantity"]), async (req, res) => {
  if (req.order.user_id !== req.user.id) return res.status(403).send("Forbidden.");
  const { productId, quantity } = req.body;
  const product = await getProductById(productId);
  if (!product) return res.status(400).send("Product not found.");
  const orderProduct = await createOrderProduct(req.order.id, productId, quantity);
  res.status(201).send(orderProduct);
});