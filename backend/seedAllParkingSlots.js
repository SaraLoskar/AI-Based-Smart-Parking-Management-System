
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./src/config/db.js";
import ParkingArea from "./src/models/parkingArea.model.js";
import ParkingSlot from "./src/models/parkingSlot.model.js";

const areas = [
  {
    id: "parking001",
    name: "BKC Multi-Level Parking",
    address: "Bandra Kurla Complex, Mumbai",
    latitude: 19.0661,
    longitude: 72.8698,
    totalSlots: 500,
    availableSlots: 500,
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
    availableSlots: 350,
    pricePerHour: 80,
    openingTime: "08:00",
    closingTime: "23:30",
    isActive: true,
  },
];

function getVehicleType(index) {
  const position = index % 20;

  if (position < 14) return "Car";
  if (position < 17) return "Bike";
  return "EV";
}

async function prepareArea(area, count, prefix) {
  // Create the parking area only if it doesn't already exist.
  await ParkingArea.findOneAndUpdate(
    { id: area.id },
    { $setOnInsert: area },
    { upsert: true, new: true }
  );

  const operations = [];

  for (let i = 1; i <= count; i++) {
    const slotNumber = `${prefix}${i}`;
    const floor = Math.ceil(i / Math.ceil(count / 4));

    operations.push({
      updateOne: {
        filter: {
          parkingAreaId: area.id,
          slotNumber,
        },
        update: {
          $set: {
            vehicleType: getVehicleType(i - 1),
            floor,
            isActive: true,
          },
          $setOnInsert: {
            status: "Available",
          },
        },
        upsert: true,
      },
    });
  }

  // Update/create slots in batches rather than one request per slot.
  for (let i = 0; i < operations.length; i += 100) {
    await ParkingSlot.bulkWrite(operations.slice(i, i + 100));
  }

  const activeSlots = await ParkingSlot.find({
    parkingAreaId: area.id,
    isActive: true,
  });

  const availableSlots = activeSlots.filter(
    (slot) => slot.status === "Available"
  ).length;

  await ParkingArea.updateOne(
    { id: area.id },
    {
      $set: {
        totalSlots: activeSlots.length,
        availableSlots,
      },
    }
  );

  console.log(
    `${area.name}: ${activeSlots.length} active slots, ${availableSlots} available`
  );
}

async function seedAllParkingSlots() {
  try {
    await connectDB();

    // BKC: retain the existing 500 slot records and their statuses.
    await prepareArea(areas[0], 500, "A");

    // Phoenix: create/complete its own 350 slots.
    await prepareArea(areas[1], 350, "P");

    console.log("Both parking areas are prepared successfully.");
  } catch (error) {
    console.error("Failed to prepare parking slots:", error);
    process.exitCode = 1;
  } finally {
    process.exit();
  }
}

seedAllParkingSlots();