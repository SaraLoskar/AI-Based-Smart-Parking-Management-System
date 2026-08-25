import express from "express";
import {
  createReport,
  getAllReports,
  getReportById,
  getReportsByUser,
  updateReport,
  deleteReport,
} from "../controllers/report.controller.js";

const router = express.Router();

router.post("/", createReport);

router.get("/", getAllReports);
router.get("/user/:userId", getReportsByUser);
router.get("/:id", getReportById);

router.put("/:id", updateReport);

router.delete("/:id", deleteReport);

export default router;