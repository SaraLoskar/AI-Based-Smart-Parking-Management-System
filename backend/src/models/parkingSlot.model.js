import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const parkingSlotSchema = new Schema(
  {
    id: { type: String, default: uuidv4, unique: true },
    parkingAreaId: { type: String, required: true, ref: 'ParkingArea' },
    slotNumber: { type: String, required: true, trim: true },
    vehicleType: { type: String, required: true, enum: ["Car", "Bike", "EV"] },
    status: { type: String, required: true, enum: ["Available", "Occupied", "Reserved"], default: "Available" },
    floor: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model("ParkingSlot", parkingSlotSchema);