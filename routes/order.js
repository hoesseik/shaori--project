import express from "express";
import Order from "../models/Order.js";
import { sendOrderMail } from "../mail.js";

const router = express.Router();

router.post("/order", async (req, res) => {
  const { items, total, customer } = req.body;

  try {
    const order = await Order.create({ items, total, customer });
    await sendOrderMail(customer.email, order);
    res.json({ success: true, orderId: order._id });
  } catch (err) {
    console.error("Order fout:", err);
    res.status(500).json({ message: "Order mislukt" });
  }
});

export default router;
