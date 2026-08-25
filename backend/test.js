import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/config/db.js";
import ParkingArea from "./src/models/parkingArea.model.js";

await connectDB();

const data = await ParkingArea.find();

console.log("Total =", data.length);
console.log(data);