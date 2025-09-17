// models/Report.js
import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    media: [
  {
    url: {
      type: String,
      required: false // Or true, depending on your logic
    },
    type: {
      type: String, // 'image' or 'video'
      required: false
    }
  }
],
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: { type: String },
    },
    category: {
      type: String,
      enum: ["pothole", "streetlight", "garbage", "water", "other"],
      default: "other",
    },
    status: {
      type: String,
      enum: ["submitted", "in-progress", "resolved"],
      default: "submitted",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // admin/department staff
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);
