import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, enum: ["waiter", "chef", "manager"], required: true },
    phone: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    versionKey: false,
  }
);

const staffModel = mongoose.model("staff", staffSchema);

export default staffModel;
