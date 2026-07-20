import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const reportSchema = new Schema(
    {
        id: { type: String, default: uuidv4, unique: true },
        userId: { type: String, required: true, ref: 'User' },
        parkingAreaId: { type: String, required: true, ref: 'ParkingArea' },
        title: { type: String, required: true },
        description: { type: String, required: true },
        reportType: {
            type: String, default: "Other",
            enum: ["Parking Issue", "Payment Issue", "Slot Issue", "App Issue", "Other"],
        },
        status: {
            type: String, default: "Pending",
            enum: ["Pending", "In Progress", "Resolved"],
        },
        resolvedAt: { type: Date },
    },
    { timestamps: true }
);

export default model("Report", reportSchema);