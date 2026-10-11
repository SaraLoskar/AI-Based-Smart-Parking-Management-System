import express from "express";
import cors from "cors";
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import vehicleRoutes from './routes/vehicle.routes.js';
import parkingAreaRoutes from "./routes/parkingArea.routes.js"
import parkingSlotRoutes from "./routes/parkingSlot.routes.js"
import bookingRoutes from "./routes/booking.routes.js"
import notificationRoutes from "./routes/notification.routes.js"
//import path from "path";
//import { fileURLToPath } from "url";
import reportRoutes from "./routes/report.routes.js"
import paymentRoutes from "./routes/payment.routes.js"
import navigationRoutes from "./routes/navigation.routes.js"
import yoloRoutes from "./routes/yolo.routes.js"
import connectDB from "./config/db.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const frontendDistPath = path.resolve(__dirname, "../../mobile/dist");

const app = express();

app.use(cors());
app.use(express.json());
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection failed:", error.message);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// API Routes
app.use('/api/user', userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/vehicle', vehicleRoutes);
app.use("/api/parking-area", parkingAreaRoutes);
app.use("/api/parking-slot", parkingSlotRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/payment",paymentRoutes);
app.use("/api/navigation", navigationRoutes);
app.use("/api/yolo", yoloRoutes);

// Serve Frontend Static Web Build
// app.use(express.static(frontendDistPath));

// // Fallback for Single Page Application (Web frontend)
// app.use((req, res, next) => {
//   if (req.method === "GET" && !req.path.startsWith("/api")) {
//     return res.sendFile(path.join(frontendDistPath, "index.html"));
//   }
//   next();
// });

export default app;