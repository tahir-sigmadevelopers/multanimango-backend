import express from "express";
import { 
  createOrder, 
  getAllOrders, 
  getOrderById,
  getOrderStats, 
  updateOrderStatus, 
  deleteOrder 
} from "./Controller.js";

const app = express();

app.post("/orders/create", createOrder);
app.get("/orders/stats", getOrderStats);
app.get("/orders", getAllOrders);
app.get("/orders/:id", getOrderById);
app.put("/orders/:id/status", updateOrderStatus);
app.delete("/orders/:id", deleteOrder);



export default app;
