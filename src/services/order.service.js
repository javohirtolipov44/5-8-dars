import orderModel from "../models/order.model.js";

class orderService {
  constructor() {
    this.orderModel = orderModel;
  }

  async addOrder(body) {
    console.log(body);
    const order = await this.orderModel.create({ ...body });

    return order;
  }

  async dailySales() {
    const order = await this.orderModel.aggregate([
      {
        $lookup: {
          from: "menu",
          localField: "menuItem",
          foreignField: "_id",
          as: "menuData",
        },
      },
      {
        $unwind: "$menuData",
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            category: "$menuData.category",
          },
          totalSales: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 },
        },
      },
    ]);
    return order;
  }

  async waiterPerformance() {
    const order = await this.orderModel.aggregate([
      {
        $group: {
          _id: "$waiter",
          totalOrders: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
      {
        $lookup: {
          from: "staff",
          localField: "_id",
          foreignField: "_id",
          as: "waiterData",
        },
      },
      {
        $unwind: "$waiterData",
      },
      {
        $project: {
          _id: 1,
          waiterName: "$waiterData.name",
          totalOrders: 1,
          totalAmount: 1,
          averageOrderValue: { $divide: ["$totalAmount", "$totalOrders"] },
        },
      },
    ]);

    return order;
  }

  async topDishes() {
    const order = this.orderModel.aggregate([
      {
        $group: {
          _id: "$menuItem",
          totalQuantity: { $sum: "$quantity" },
          totalRevenue: { $sum: "$totalAmount" },
        },
      },
      {
        $lookup: {
          from: "menu",
          localField: "_id",
          foreignField: "_id",
          as: "dishData",
        },
      },
      {
        $unwind: "$dishData",
      },
      {
        $project: {
          _id: "$_id",
          dishName: "$dishData.name",
          totalQuantity: 1,
          totalRevenue: 1,
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
      {
        $limit: 10,
      },
    ]);
    return order;
  }

  async orderTable(param) {
    const order = this.orderModel.aggregate([
      {
        $match: {
          table: +param.tableNumber,
        },
      },
      {
        $lookup: {
          from: "menu",
          localField: "menuItem",
          foreignField: "_id",
          as: "menuData",
        },
      },
      {
        $unwind: "$menuData",
      },
      {
        $lookup: {
          from: "staff",
          localField: "waiter",
          foreignField: "_id",
          as: "waiterData",
        },
      },
      {
        $unwind: "$waiterData",
      },
      {
        $project: {
          _id: 1,
          orderDate: "$createdAt",
          items: {
            menuItem: {
              name: "$menuData.name",
              price: "$menuData.price",
            },
            quantity: "$quantity",
          },
          totalAmount: 1,
          status: 1,
          waiter: {
            name: "$waiterData.name",
          },
        },
      },
    ]);

    return order;
  }
}

export default orderService;
