// routes/reportRoutes.js
import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js"; // ⬅️ Import Multer-Cloudinary
import {
  createReport,
  getReports,
  updateReportStatus,
  getMyReports,
  updateMyReport,
} from "../controllers/reportController.js";

const router = express.Router();

// Citizen: submit report with optional photo/video/audio
// This is the fix
router.post("/", authMiddleware, upload.array("media", 10), createReport);

// Citizen: view my reports
router.get("/my", authMiddleware, getMyReports);

// Admin: update report status
router.put(
  "/:reportId",
  authMiddleware,
  roleMiddleware(["admin"]),
  updateReportStatus
);
 // New route for user edits
router.put(
  "/my/:reportId",
  authMiddleware,
  updateMyReport
);

// Admin & Citizen: view all reports (filters supported)
router.get("/", authMiddleware, getReports);

export default router;
