import express from "express";
import { createVehicle, getAllVehicles, getVehicleById, getVehiclesByUserId, updateVehicle, deleteVehicle } from "../controllers/vehicle.controller.js";

const router = express.Router();

router.post("/", createVehicle);
router.get("/", getAllVehicles);
router.get("/:id", getVehicleById);
router.get("/user/:userId", getVehiclesByUserId);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

export default router;