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
      ref: "Staff",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const orderModel = mongoose.model("menu", orderSchema);

export default orderModel;
