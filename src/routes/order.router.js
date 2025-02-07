import { Router } from "express";
import orderController from "../controllers/order.controller.js";

const orderRouter = Router();
const controller = new orderController();

orderRouter.get("/orders/daily-sales", (req, res) => {
  controller.dailySalesController(req, res);
});

orderRouter.post("/order", (req, res) => {
  controller.addOrderController(req, res);
});

orderRouter.get("/orders/waiter-performance", (req, res) => {
  controller.waiterPerformanceController(req, res);
});

orderRouter.get("/orders/top-dishes", (req, res) => {
  controller.topDishesController(req, res);
});

orderRouter.get("/orders/table/:tableNumber", (req, res) => {
  controller.orderTableController(req, res);
});

export default orderRouter;
