import express from "express";
import {
  syncSlotOccupancy,
  getSlotsForCamera,
  simulateDetection,
} from "../controllers/yolo.controller.js";

const router = express.Router();

// POST /api/yolo/occupancy-sync
router.post("/occupancy-sync", syncSlotOccupancy);

// GET /api/yolo/slots/:parkingAreaId
router.get("/slots/:parkingAreaId", getSlotsForCamera);

// POST /api/yolo/simulate-detection
router.post("/simulate-detection", simulateDetection);

export default router;
