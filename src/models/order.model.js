import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    table: { type: Number, required: true },
    status: {
      type: String,
      enum: ["new", "cooking", "ready", "completed"],
      default: "new",
    },
    totalAmount: { type: Number, required: true },
    waiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "staff",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
    menuItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "menu",
      required: true,
    }, // menuItem va quantity maydonlarini ozim qoshdim
    quantity: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;
