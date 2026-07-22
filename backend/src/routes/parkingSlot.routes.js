import express from "express";
import {
  createParkingSlot,
  getAllParkingSlots,
  getParkingSlotById,
  getSlotsByParkingArea,
  updateParkingSlot,
  deleteParkingSlot,
  getAvailableSlots,
} from "../controllers/parkingSlot.controller.js";

const router = express.Router();

router.post("/", createParkingSlot);

router.get("/", getAllParkingSlots);
router.get("/available", getAvailableSlots);
router.get("/parking-area/:parkingAreaId", getSlotsByParkingArea);
router.get("/:id", getParkingSlotById);

router.put("/:id", updateParkingSlot);

router.delete("/:id", deleteParkingSlot);

export default router;