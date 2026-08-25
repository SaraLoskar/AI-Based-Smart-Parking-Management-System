import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const vehicleSchema = new Schema(
    {
        id: { type: String, default: uuidv4, required: true, unique: true },
        userId: { type: String, ref: "User", required: true },
        vehicleNumber: { type: String, required: true },
        vehicleType: { type: String, enum: ["Car", "Bike", "EV", "Jeep"], required: true },
        brand: { type: String, required: true, },
        model: { type: String, required: true, },
        color: { type: String },
    },
    { timestamps: true }
);

export default model("Vehicle", vehicleSchema);
