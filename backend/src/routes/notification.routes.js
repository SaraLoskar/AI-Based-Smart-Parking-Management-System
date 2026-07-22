import express from "express";
import {
  createNotification,
  getAllNotifications,
  getNotificationById,
  getNotificationsByUser,
  markNotificationAsRead,
  updateNotification,
  deleteNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/", createNotification);

router.get("/", getAllNotifications);
router.get("/user/:userId", getNotificationsByUser);
router.get("/:id", getNotificationById);

router.put("/:id", updateNotification);
router.put("/read/:id", markNotificationAsRead);

router.delete("/:id", deleteNotification);

export default router;