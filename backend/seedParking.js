import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/config/db.js";
import ParkingArea from "./src/models/parkingArea.model.js";
import ParkingSlot from "./src/models/parkingSlot.model.js";

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

const parkingSlots = [
    // BKC Multi-Level Parking (parking001)
    { id: "slot_001", parkingAreaId: "parking001", slotNumber: "A1", vehicleType: "Car", status: "Occupied", floor: 1, isActive: true },
    { id: "slot_002", parkingAreaId: "parking001", slotNumber: "A2", vehicleType: "Car", status: "Available", floor: 1, isActive: true },
    { id: "slot_003", parkingAreaId: "parking001", slotNumber: "A3", vehicleType: "Car", status: "Available", floor: 1, isActive: true },
    { id: "slot_004", parkingAreaId: "parking001", slotNumber: "A4", vehicleType: "Car", status: "Occupied", floor: 1, isActive: true },
    { id: "slot_005", parkingAreaId: "parking001", slotNumber: "A5", vehicleType: "EV", status: "Available", floor: 1, isActive: true },
    { id: "slot_006", parkingAreaId: "parking001", slotNumber: "A6", vehicleType: "EV", status: "Available", floor: 1, isActive: true },
    { id: "slot_007", parkingAreaId: "parking001", slotNumber: "A7", vehicleType: "Bike", status: "Available", floor: 1, isActive: true },
    { id: "slot_008", parkingAreaId: "parking001", slotNumber: "A8", vehicleType: "Bike", status: "Available", floor: 1, isActive: true },

    // Phoenix Marketcity Parking (parking002)
    { id: "slot_009", parkingAreaId: "parking002", slotNumber: "B1", vehicleType: "Car", status: "Available", floor: 1, isActive: true },
    { id: "slot_010", parkingAreaId: "parking002", slotNumber: "B2", vehicleType: "Car", status: "Occupied", floor: 1, isActive: true },
    { id: "slot_011", parkingAreaId: "parking002", slotNumber: "B3", vehicleType: "Car", status: "Available", floor: 1, isActive: true },
    { id: "slot_012", parkingAreaId: "parking002", slotNumber: "B4", vehicleType: "Car", status: "Available", floor: 1, isActive: true },
    { id: "slot_013", parkingAreaId: "parking002", slotNumber: "B5", vehicleType: "EV", status: "Available", floor: 1, isActive: true },
    { id: "slot_014", parkingAreaId: "parking002", slotNumber: "B6", vehicleType: "EV", status: "Available", floor: 1, isActive: true },
    { id: "slot_015", parkingAreaId: "parking002", slotNumber: "B7", vehicleType: "Bike", status: "Available", floor: 1, isActive: true },
    { id: "slot_016", parkingAreaId: "parking002", slotNumber: "B8", vehicleType: "Bike", status: "Available", floor: 1, isActive: true },
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