import ParkingArea from "../models/parkingArea.model.js";
import { v4 as uuidv4 } from "uuid";

// Create Parking Area
export const createParkingArea = async (req, res) => {
  console.log("Parking API Hit");
  try {
    const {
      name,
      address,
      latitude,
      longitude,
      totalSlots,
      availableSlots,
      pricePerHour,
      openingTime,
      closingTime,
      isActive,
    } = req.body;

    console.log("Received Parking Area Data:", req.body);
    if (
      !name ||
      !address ||
      latitude === undefined ||
      longitude === undefined ||
      totalSlots === undefined ||
      availableSlots === undefined ||
      pricePerHour === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const parkingArea = await ParkingArea.create({
      id: uuidv4(),
      name,
      address,
      latitude,
      longitude,
      totalSlots,
      availableSlots,
      pricePerHour,
      openingTime,
      closingTime,
      isActive,
    });

    return res.status(201).json({
      success: true,
      message: "Parking area created successfully.",
      data: parkingArea,
    });
  } catch (error) {
    console.error("Create Parking Area Error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Parking Areas
export const getAllParkingAreas = async (req, res) => {
  try {
    const parkingAreas = await ParkingArea.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: parkingAreas.length,
      data: parkingAreas,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Parking Area By ID
export const getParkingAreaById = async (req, res) => {
  try {
    const parkingArea = await ParkingArea.findOne({
      id: req.params.id,
    });

    if (!parkingArea) {
      return res.status(404).json({
        success: false,
        message: "Parking area not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: parkingArea,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Parking Area
export const updateParkingArea = async (req, res) => {
  try {
    const parkingArea = await ParkingArea.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!parkingArea) {
      return res.status(404).json({
        success: false,
        message: "Parking area not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Parking area updated successfully.",
      data: parkingArea,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Parking Area
export const deleteParkingArea = async (req, res) => {
  try {
    const parkingArea = await ParkingArea.findOneAndDelete({
      id: req.params.id,
    });

    if (!parkingArea) {
      return res.status(404).json({
        success: false,
        message: "Parking area not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Parking area deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Active Parking Areas
export const getActiveParkingAreas = async (req, res) => {
  try {
    const parkingAreas = await ParkingArea.find({
      isActive: true,
    });

    return res.status(200).json({
      success: true,
      count: parkingAreas.length,
      data: parkingAreas,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};