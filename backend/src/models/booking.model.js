import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const bookingSchema = new Schema(
    {
        id: { type: String, default: uuidv4, unique: true },
        userId: { type: String, required: true, ref: 'User' },
        vehicleId: { type: String, required: true, ref: 'Vehicle' },
        parkingAreaId: { type: String, required: true, ref: 'ParkingArea' },
        parkingSlotId: { type: String, required: true, ref: 'ParkingSlot' },
        bookingDate: { type: Date, default: Date.now },
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
        duration: { type: Number },
        bookingStatus: {
            type: String, default: "Pending",
            enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
        },
        amount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default model("Booking", bookingSchema);