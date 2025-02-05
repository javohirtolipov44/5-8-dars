import orderService from "../services/order.service.js";

class orderController {
  constructor() {
    this.orderService = new orderService();
  }

  async dailySalesController(req, res) {
    try {
      const order = await this.orderService.dailySales();
      res.json(order);
    } catch (error) {
      res.json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default orderController;
