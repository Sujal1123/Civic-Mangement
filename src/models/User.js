import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
      enum: ["citizen", "staff", "admin"],
      default: "citizen",
    },
    department: {
      type: String, // Only for staff (e.g., "sanitation", "public works")
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
