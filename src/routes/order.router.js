import { Router } from "express";
import orderController from "../controllers/order.controller.js";

const orderRouter = Router();
const controller = new orderController();

orderRouter.get("/orders/daily-sales", (req, res) => {
  controller.dailySalesController(req, res);
});

export default orderRouter;
