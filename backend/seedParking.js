import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/config/db.js";
import ParkingArea from "./src/models/parkingArea.model.js";

const parkingAreas = [
    {
        id: "parking001",
        name: "BKC Multi-Level Parking",
        address: "Bandra Kurla Complex, Mumbai",
        latitude: 19.0661,
        longitude: 72.8698,
        totalSlots: 500,
        availableSlots: 243,
        pricePerHour: 100,
        openingTime: "06:00",
        closingTime: "23:59",
        isActive: true,
    },
    {
        id: "parking002",
        name: "Phoenix Marketcity Parking",
        address: "Kurla West, Mumbai",
        latitude: 19.0866,
        longitude: 72.8892,
        totalSlots: 350,
        availableSlots: 160,
        pricePerHour: 80,
        openingTime: "08:00",
        closingTime: "23:30",
        isActive: true,
    }
];

const seed = async () => {
    try {
        await connectDB();

        await ParkingArea.deleteMany();

        await ParkingArea.insertMany(parkingAreas);

        console.log("Parking Areas Inserted Successfully ✅");

        process.exit();
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

seed();