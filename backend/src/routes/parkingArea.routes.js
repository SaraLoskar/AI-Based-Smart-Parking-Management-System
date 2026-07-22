import express from "express";
import {
  createParkingArea,
  getAllParkingAreas,
  getParkingAreaById,
  updateParkingArea,
  deleteParkingArea,
  getActiveParkingAreas,
} from "../controllers/parkingArea.controllers.js"

const router = express.Router();
router.post("/", createParkingArea);
router.get("/", getAllParkingAreas);
router.get("/active", getActiveParkingAreas);
router.get("/:id", getParkingAreaById);
router.put("/:id", updateParkingArea);
router.delete("/:id", deleteParkingArea);

export default router;