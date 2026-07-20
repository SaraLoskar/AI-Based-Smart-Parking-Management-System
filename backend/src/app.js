import express from "express";
import cors from "cors";
import userRoutes from './routes/user.routes.js';
import authRoutes from './routes/auth.routes.js';
import vehicleRoutes from './routes/vehicle.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/vehicle', vehicleRoutes);
export default app;