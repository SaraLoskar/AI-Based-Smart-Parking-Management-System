import express from "express";
import {
  createPayment,
  getAllPayments,
  getPaymentById,
  getPaymentsByUser,
  updatePayment,
  deletePayment,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/", createPayment);

router.get("/", getAllPayments);
router.get("/user/:userId", getPaymentsByUser);
router.get("/:id", getPaymentById);

router.put("/:id", updatePayment);

router.delete("/:id", deletePayment);

export default router;