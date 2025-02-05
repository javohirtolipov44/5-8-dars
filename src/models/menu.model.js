import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // ichimlik, taom, desert
    available: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const menuModel = mongoose.model("menu", menuSchema);

export default menuModel;
