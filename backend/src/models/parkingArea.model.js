import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const parkingAreaSchema = new Schema(
    {
        id: { type: String, default: uuidv4, unique: true },
        name: { type: String, required: true },
        address: { type: String, required: true, trim: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
        totalSlots: { type: Number, required: true, min: 1 },
        availableSlots: { type: Number, required: true, min: 0 },
        pricePerHour: { type: Number, required: true, min: 0 },
        openingTime: { type: String, default: "00:00" },
        closingTime: { type: String, default: "23:59" },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default model("ParkingArea", parkingAreaSchema);