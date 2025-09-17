import Report from "../models/Report.js";
import { successResponse, errorResponse } from "../utils/response.js";

// Citizen: Create a new report (This function is correct)
export const createReport = async (req, res) => {
  try {
    const { title, description, location, category } = req.body;

    let media = [];
    
    if (req.files && req.files.length > 0) {
      media = req.files.map(file => ({
        url: file.path, 
        type: file.mimetype.startsWith('image') ? 'image' : 'video'
      }));
    }

    const report = await Report.create({
      title,
      description,
      location,
      category,
      media: media, 
      createdBy: req.user._id,
    });

    return successResponse(res, report, "Report submitted successfully", 201);
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// Citizen/Admin: Get all reports
export const getReports = async (req, res) => {
  try {
    const { category, status } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;

    const reports = await Report.find(filter)
      .populate("createdBy", "name email role")
      .populate("assignedTo", "name email role")
      .select("+media") // ✅ ADDED THIS LINE to include the media array
      .sort({ createdAt: -1 });

    return successResponse(res, reports, "Reports fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// Admin: Update report status (This function is correct)
export const updateReportStatus = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { status, assignedTo } = req.body;

    const report = await Report.findByIdAndUpdate(
      reportId,
      { status, assignedTo },
      { new: true }
    );

    if (!report) {
      return errorResponse(res, "Report not found", 404);
    }

    return successResponse(res, report, "Report updated successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// Citizen: Update their own report (This function is correct)
export const updateMyReport = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { title, description } = req.body; 

    const report = await Report.findOne({ _id: reportId, createdBy: req.user._id });

    if (!report) {
      return errorResponse(res, "Report not found or you don't have permission to edit it", 404);
    }

    report.title = title || report.title;
    report.description = description || report.description;
    await report.save();

    return successResponse(res, report, "Report updated successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};

// Citizen: Get my reports
export const getMyReports = async (req, res) => {
  try {
    const reports = await Report.find({ createdBy: req.user._id })
      .select("+media") // ✅ ADDED THIS LINE to include the media array
      .sort({
        createdAt: -1,
      });
    return successResponse(res, reports, "My reports fetched successfully");
  } catch (error) {
    return errorResponse(res, error.message);
  }
};