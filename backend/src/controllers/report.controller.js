import Report from "../models/report.model.js";
import User from "../models/user.model.js";
import ParkingArea from "../models/parkingArea.model.js";
import { v4 as uuidv4 } from "uuid";

// Create Report
export const createReport = async (req, res) => {
  try {
    const {
      userId,
      parkingAreaId,
      title,
      description,
      reportType,
      status,
    } = req.body;

    if (!userId || !parkingAreaId || !title || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const user = await User.findOne({ id: userId });
    const parkingArea = await ParkingArea.findOne({ id: parkingAreaId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!parkingArea) {
      return res.status(404).json({
        success: false,
        message: "Parking area not found.",
      });
    }

    const report = await Report.create({
      id: uuidv4(),
      userId,
      parkingAreaId,
      title,
      description,
      reportType,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Report submitted successfully.",
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Reports
export const getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Report By ID
export const getReportById = async (req, res) => {
  try {
    const report = await Report.findOne({ id: req.params.id });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Reports By User
export const getReportsByUser = async (req, res) => {
  try {
    const reports = await Report.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Report
export const updateReport = async (req, res) => {
  try {
    const report = await Report.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Report updated successfully.",
      data: report,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Report
export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findOneAndDelete({
      id: req.params.id,
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Report deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};