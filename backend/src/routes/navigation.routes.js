import express from "express";
import {
  getNearbyParkingAreas,
  getDirectionsToParkingArea,
  getParkingAreaMapPin,
} from "../controllers/navigation.controller.js";

const router = express.Router();

// GET /api/navigation/nearby?latitude=19.0760&longitude=72.8777&radius=15
router.get("/nearby", getNearbyParkingAreas);

// GET /api/navigation/directions/:parkingAreaId?latitude=19.0760&longitude=72.8777
router.get("/directions/:parkingAreaId", getDirectionsToParkingArea);

// GET /api/navigation/pin/:parkingAreaId
router.get("/pin/:parkingAreaId", getParkingAreaMapPin);

export default router;
