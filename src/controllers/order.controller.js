import orderService from "../services/order.service.js";

class orderController {
  constructor() {
    this.orderService = new orderService();
  }

  async addOrderController(req, res) {
    try {
      const body = req.body;
      const order = await this.orderService.addOrder(body);
      res.json(order);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }

  async dailySalesController(req, res) {
    try {
      const order = await this.orderService.dailySales();
      res.json({
        success: true,
        data: order,
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
      });
    }
  }

  async waiterPerformanceController(req, res) {
    try {
      const order = await this.orderService.waiterPerformance();
      res.json({
        success: true,
        data: order,
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
      });
    }
  }

  async topDishesController(req, res) {
    try {
      const order = await this.orderService.topDishes();
      res.json({
        success: true,
        data: order,
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
      });
    }
  }

  async orderTableController(req, res) {
    try {
      const param = req.params;
      const order = await this.orderService.orderTable(param);
      res.json({
        success: true,
        data: order,
      });
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default orderController;
