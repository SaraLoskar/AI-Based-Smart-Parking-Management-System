import Booking from "../models/booking.model.js";
import User from "../models/user.model.js";
import Vehicle from "../models/vehicle.model.js";
import ParkingArea from "../models/parkingArea.model.js";
import ParkingSlot from "../models/parkingSlot.model.js";
import { v4 as uuidv4 } from "uuid";

// Create Booking
export const createBooking = async (req, res) => {
  try {
    const {
      userId,
      vehicleId,
      parkingAreaId,
      parkingSlotId,
      startTime,
      endTime,
      bookingStatus,
    } = req.body;

    if (
      !userId ||
      !vehicleId ||
      !parkingAreaId ||
      !parkingSlotId ||
      !startTime ||
      !endTime
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const user = await User.findOne({ id: userId });
    const vehicle = await Vehicle.findOne({ id: vehicleId });
    const parkingArea = await ParkingArea.findOne({ id: parkingAreaId });
    const parkingSlot = await ParkingSlot.findOne({ id: parkingSlotId });

    if (!user)
      return res.status(404).json({ success: false, message: "User not found." });

    if (!vehicle)
      return res.status(404).json({ success: false, message: "Vehicle not found." });

    if (!parkingArea)
      return res.status(404).json({ success: false, message: "Parking area not found." });

    if (!parkingSlot)
      return res.status(404).json({ success: false, message: "Parking slot not found." });

    if (parkingSlot.status !== "Available") {
      return res.status(400).json({
        success: false,
        message: "Selected parking slot is not available.",
      });
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    const duration =
      (end.getTime() - start.getTime()) / (1000 * 60 * 60);

    if (duration <= 0) {
      return res.status(400).json({
        success: false,
        message: "End time must be after start time.",
      });
    }

    const amount = duration * parkingArea.pricePerHour;

    const booking = await Booking.create({
      id: uuidv4(),
      userId,
      vehicleId,
      parkingAreaId,
      parkingSlotId,
      startTime,
      endTime,
      duration,
      amount,
      bookingStatus,
    });

    parkingSlot.status = "Reserved";
    await parkingSlot.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Booking By ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({ id: req.params.id });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Bookings By User
export const getBookingsByUser = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.params.userId,
    });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Booking
export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking updated successfully.",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({
      id: req.params.id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};