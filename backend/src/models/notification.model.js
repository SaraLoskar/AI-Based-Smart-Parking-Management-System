import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const notificationSchema = new Schema(
    {
        id: { type: String, default: uuidv4, unique: true },
        userId: { type: String, required: true, ref: 'User' },
        title: { type: String, required: true },
        message: { type: String, required: true },
        notificationType: {
            type: String, default: "General",
            enum: ["Booking", "Payment", "Reminder", "Parking", "General"],
        },
        isRead: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default model("Notification", notificationSchema);