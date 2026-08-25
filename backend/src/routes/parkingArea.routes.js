import express from "express";
import {
  createParkingArea,
  getAllParkingAreas,
  getParkingAreaById,
  updateParkingArea,
  deleteParkingArea,
  getActiveParkingAreas,
} from "../controllers/parkingArea.controllers.js"
import { getNearbyParkingAreas } from "../controllers/navigation.controller.js";

const router = express.Router();
router.post("/", createParkingArea);
router.get("/", getAllParkingAreas);
router.get("/nearby", getNearbyParkingAreas);
router.get("/active", getActiveParkingAreas);
router.get("/:id", getParkingAreaById);
router.put("/:id", updateParkingArea);
router.delete("/:id", deleteParkingArea);

export default router;