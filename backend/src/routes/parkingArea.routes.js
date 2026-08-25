import express from "express";
import {
  createParkingArea,
  getAllParkingAreas,
  getParkingAreaById,
  updateParkingArea,
  deleteParkingArea,
  getActiveParkingAreas,
} from "../controllers/parkingArea.controllers.js"
<<<<<<< HEAD
=======
import { getNearbyParkingAreas } from "../controllers/navigation.controller.js";
>>>>>>> 2afa04d5f12b44fd0ff6f4c5394b610f847f9ac0

const router = express.Router();
router.post("/", createParkingArea);
router.get("/", getAllParkingAreas);
<<<<<<< HEAD
=======
router.get("/nearby", getNearbyParkingAreas);
>>>>>>> 2afa04d5f12b44fd0ff6f4c5394b610f847f9ac0
router.get("/active", getActiveParkingAreas);
router.get("/:id", getParkingAreaById);
router.put("/:id", updateParkingArea);
router.delete("/:id", deleteParkingArea);

export default router;