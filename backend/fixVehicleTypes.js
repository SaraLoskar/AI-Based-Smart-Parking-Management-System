
const mongoose = require("mongoose");
require("dotenv").config();

const ParkingSlot = require("./src/models/ParkingSlot");

async function fixVehicleTypes() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const parkingAreas = [
      { id: "parking001", name: "BKC Multi-Level Parking" },
      { id: "parking002", name: "Phoenix Marketcity Parking" },
    ];

    for (const area of parkingAreas) {
      const slots = await ParkingSlot.find({
        parkingAreaId: area.id,
        isActive: true,
      }).sort({ slotNumber: 1 });

      if (slots.length === 0) {
        console.log(`No active slots found for ${area.name}`);
        continue;
      }

      let updated = 0;

      for (let i = 0; i < slots.length; i++) {
        // Example distribution: 70% Cars, 15% Bikes, 15% EVs
        let vehicleType;

        if (i % 20 < 14) {
          vehicleType = "Car";
        } else if (i % 20 < 17) {
          vehicleType = "Bike";
        } else {
          vehicleType = "EV";
        }

        if (slots[i].vehicleType !== vehicleType) {
          slots[i].vehicleType = vehicleType;
          await slots[i].save();
          updated++;
        }
      }

      const counts = await ParkingSlot.aggregate([
        {
          $match: {
            parkingAreaId: area.id,
            isActive: true,
          },
        },
        {
          $group: {
            _id: "$vehicleType",
            count: { $sum: 1 },
          },
        },
      ]);

      console.log(`\n${area.name}`);
      console.log("Total active slots:", slots.length);
      console.log("Updated slots:", updated);
      console.log("Vehicle type counts:", counts);
    }
  } catch (error) {
    console.error("Failed to update vehicle types:", error);
  } finally {
    await mongoose.disconnect();
  }
}

fixVehicleTypes();