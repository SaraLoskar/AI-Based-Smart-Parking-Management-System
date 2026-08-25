import express from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  getBookingsByUser,
  updateBooking,
  deleteBooking,
} from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/", createBooking);

router.get("/", getAllBookings);
router.get("/user/:userId", getBookingsByUser);
router.get("/:id", getBookingById);

router.put("/:id", updateBooking);

router.delete("/:id", deleteBooking);

export default router;