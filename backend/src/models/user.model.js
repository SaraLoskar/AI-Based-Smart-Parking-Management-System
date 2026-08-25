import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";


const userSchema = new Schema(
    {
        id: { type: String, default: uuidv4, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImage: { type: String, default: "" },
        vehicles: [{ type: String, ref: "Vehicle" }],//vehicle id
        role: { type: String, enum: ["user", "admin"], default: "user" },
        walletBalance: { type: Number, default: 0 },
        isVerified: { type: Boolean, default: false },
        otp: { type: String },
        otpExpiry: { type: Date },
        favorites: [{ type: String, ref: "ParkingArea" }],
    },
    { timestamps: true }
);

export default model("User", userSchema);
