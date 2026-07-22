import Payment from "../models/payment.model.js";
import Booking from "../models/booking.model.js";
import User from "../models/user.model.js";
import { v4 as uuidv4 } from "uuid";

// Create Payment
export const createPayment = async (req, res) => {
  try {
    const {
      bookingId,
      userId,
      amount,
      paymentMethod,
      paymentStatus,
      transactionId,
    } = req.body;

    if (!bookingId || !userId || !amount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields.",
      });
    }

    const booking = await Booking.findOne({ id: bookingId });
    const user = await User.findOne({ id: userId });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const payment = await Payment.create({
      id: uuidv4(),
      bookingId,
      userId,
      amount,
      paymentMethod,
      paymentStatus,
      transactionId,
    });

    res.status(201).json({
      success: true,
      message: "Payment created successfully.",
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Payment By ID
export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findOne({ id: req.params.id });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Payments By User
export const getPaymentsByUser = async (req, res) => {
  try {
    const payments = await Payment.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Payment
export const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment updated successfully.",
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Payment
export const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findOneAndDelete({
      id: req.params.id,
    });

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};