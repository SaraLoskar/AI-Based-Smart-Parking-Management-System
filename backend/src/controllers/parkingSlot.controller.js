import ParkingSlot from "../models/parkingSlot.model.js";
import ParkingArea from "../models/parkingArea.model.js";
import { v4 as uuidv4 } from "uuid";

// Create Parking Slot
export const createParkingSlot = async (req, res) => {
  try {
    const {
      parkingAreaId,
      slotNumber,
      vehicleType,
      status,
      floor,
      isActive,
    } = req.body;

    if (!parkingAreaId || !slotNumber || !vehicleType) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const parkingArea = await ParkingArea.findOne({ id: parkingAreaId });

    if (!parkingArea) {
      return res.status(404).json({
        success: false,
        message: "Parking area not found.",
      });
    }

    const existingSlot = await ParkingSlot.findOne({
      parkingAreaId,
      slotNumber,
    });

    if (existingSlot) {
      return res.status(400).json({
        success: false,
        message: "Slot number already exists in this parking area.",
      });
    }

    const parkingSlot = await ParkingSlot.create({
      id: uuidv4(),
      parkingAreaId,
      slotNumber,
      vehicleType,
      status,
      floor,
      isActive,
    });

    return res.status(201).json({
      success: true,
      message: "Parking slot created successfully.",
      data: parkingSlot,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Parking Slots
export const getAllParkingSlots = async (req, res) => {
  try {
    const slots = await ParkingSlot.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: slots.length,
      data: slots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Parking Slot By ID
export const getParkingSlotById = async (req, res) => {
  try {
    const slot = await ParkingSlot.findOne({ id: req.params.id });

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Parking slot not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: slot,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Slots By Parking Area
export const getSlotsByParkingArea = async (req, res) => {
  try {
    const slots = await ParkingSlot.find({
      parkingAreaId: req.params.parkingAreaId,
    });

    return res.status(200).json({
      success: true,
      count: slots.length,
      data: slots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Parking Slot
export const updateParkingSlot = async (req, res) => {
  try {
    const slot = await ParkingSlot.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Parking slot not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Parking slot updated successfully.",
      data: slot,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Parking Slot
export const deleteParkingSlot = async (req, res) => {
  try {
    const slot = await ParkingSlot.findOneAndDelete({
      id: req.params.id,
    });

    if (!slot) {
      return res.status(404).json({
        success: false,
        message: "Parking slot not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Parking slot deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Available Slots
export const getAvailableSlots = async (req, res) => {
  try {
    const slots = await ParkingSlot.find({
      status: "Available",
      isActive: true,
    });

    return res.status(200).json({
      success: true,
      count: slots.length,
      data: slots,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};