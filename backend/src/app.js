import express from "express";
import cors from "cors";
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import vehicleRoutes from './routes/vehicle.routes.js';
import parkingAreaRoutes from "./routes/parkingArea.routes.js"
import parkingSlotRoutes from "./routes/parkingSlot.routes.js"
import bookingRoutes from "./routes/booking.routes.js"
import notificationRoutes from "./routes/notification.routes.js"
import reportRoutes from "./routes/report.routes.js"
import paymentRoutes from "./routes/payment.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/vehicle', vehicleRoutes);
app.use("/api/parking-area", parkingAreaRoutes);
app.use("/api/parking-slot", parkingSlotRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/payment",paymentRoutes);

export default app;