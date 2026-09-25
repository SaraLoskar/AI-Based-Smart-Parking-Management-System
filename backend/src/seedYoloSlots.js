import mongoose from "mongoose";
import dotenv from "dotenv";

import ParkingArea from "./models/parkingArea.model.js";
import ParkingSlot from "./models/parkingSlot.model.js";

dotenv.config();

const seedYoloSlots = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected");

    // Find BKC parking area
    const parkingArea = await ParkingArea.findOne({
      id: "parking001",
    });

    if (!parkingArea) {
      console.log("❌ parking001 was not found in the database.");
      process.exit(1);
    }

    console.log(`📍 Parking Area: ${parkingArea.name}`);

    // -----------------------------------------
    // CREATE 500 SLOTS
    // -----------------------------------------

    const floors = [
      { floor: 1, prefix: "A" },
      { floor: 2, prefix: "B" },
      { floor: 3, prefix: "C" },
      { floor: 4, prefix: "D" },
    ];

    let created = 0;
    let existing = 0;

    for (const floorData of floors) {
      for (let i = 1; i <= 125; i++) {
        const slotNumber = `${floorData.prefix}${i}`;

        // Check whether slot already exists
        const alreadyExists = await ParkingSlot.findOne({
          parkingAreaId: parkingArea.id,
          slotNumber,
        });

        if (alreadyExists) {
          existing++;
          continue;
        }

        await ParkingSlot.create({
          parkingAreaId: parkingArea.id,
          slotNumber,
          vehicleType: "Car",
          status: "Available",
          floor: floorData.floor,
          isActive: true,
        });

        created++;

        console.log(
          `✅ Created ${slotNumber} - Floor ${floorData.floor}`
        );
      }
    }

    // -----------------------------------------
    // UPDATE PARKING AREA COUNTS
    // -----------------------------------------

    const totalSlots = await ParkingSlot.countDocuments({
      parkingAreaId: parkingArea.id,
      isActive: true,
    });

    const availableSlots = await ParkingSlot.countDocuments({
      parkingAreaId: parkingArea.id,
      status: "Available",
      isActive: true,
    });

    parkingArea.totalSlots = totalSlots;
    parkingArea.availableSlots = availableSlots;

    await parkingArea.save();

    console.log("");
    console.log("==========================================");
    console.log("       YOLO SLOT SEED COMPLETE");
    console.log("==========================================");
    console.log(`Parking Area : ${parkingArea.name}`);
    console.log(`Created      : ${created}`);
    console.log(`Already Exist: ${existing}`);
    console.log(`Total Slots  : ${totalSlots}`);
    console.log(`Available    : ${availableSlots}`);
    console.log("==========================================");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:");
    console.error(error);

    await mongoose.connection.close();

    process.exit(1);
  }
};

seedYoloSlots();