import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

connectDB();

const app = express();

// Middleware
app.use(express.json()); // JSON body parser
app.use(express.urlencoded({ extended: true })); // for form-data
app.use(cors()); // allow cross-origin
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
  res.send("🌍 Civic Reporting API is running...");
});

export default app;
