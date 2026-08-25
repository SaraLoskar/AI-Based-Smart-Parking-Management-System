import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const paymentSchema = new Schema(
    {
        id: { type: String, default: uuidv4, unique: true },
        bookingId: { type: String, required: true, ref: 'Booking' },
        userId: { type: String, required: true, ref: 'User' },
        amount: { type: Number, required: true },
        paymentMethod: {
            type: String, required: true,
            enum: ["UPI", "Card", "Net Banking", "Cash"],
        },
        paymentStatus: {
            type: String, default: "Pending",
            enum: ["Pending", "Success", "Failed", "Refunded"],
        },
        transactionId: { type: String },
        paymentDate: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default model("Payment", paymentSchema);