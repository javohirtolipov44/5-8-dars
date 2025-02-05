import orderModel from "../models/order.model.js";

class orderService {
  constructor() {
    this.orderModel = orderModel;
  }
  async dailySales() {
    const order = await this.orderModel.aggregate([
      {
        $lookup: {
          from: "menu",
          localField: "items.menuItem",
          foreignField: "_id",
          as: "menuDetails",
        },
      },
      {
        $unwind: "$menuDetails",
      },
      {
        $group: {
          _id: {
            date: { $toDate: "$createdAt" },
            category: "$menuDetails.category",
          },
          totalSales: {
            $sum: { $multiply: ["$totalAmount", "$menuDetails.price"] },
          },
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    return order;
  }
}

export default orderService;
