// import ParkingSlot from "../models/parkingSlot.model.js";
// import ParkingArea from "../models/parkingArea.model.js";

// /**
//  * Default camera slot coordinate presets (normalized 0-1000 for CCTV frames)
//  * Used by YOLO detection to map camera frame bounding boxes to specific slots
//  */
// const DEFAULT_CAMERA_SLOT_BOXES = {
//   A1: { x1: 50, y1: 100, x2: 250, y2: 450 },
//   A2: { x1: 270, y1: 100, x2: 470, y2: 450 },
//   A3: { x1: 490, y1: 100, x2: 690, y2: 450 },
//   A4: { x1: 710, y1: 100, x2: 910, y2: 450 },
//   A5: { x1: 50, y1: 550, x2: 250, y2: 900 },
//   A6: { x1: 270, y1: 550, x2: 470, y2: 900 },
//   A7: { x1: 490, y1: 550, x2: 690, y2: 900 },
//   A8: { x1: 710, y1: 550, x2: 910, y2: 900 },

//   B1: { x1: 60, y1: 120, x2: 260, y2: 460 },
//   B2: { x1: 280, y1: 120, x2: 480, y2: 460 },
//   B3: { x1: 500, y1: 120, x2: 700, y2: 460 },
//   B4: { x1: 720, y1: 120, x2: 920, y2: 460 },
//   B5: { x1: 60, y1: 560, x2: 260, y2: 910 },
//   B6: { x1: 280, y1: 560, x2: 480, y2: 910 },
//   B7: { x1: 500, y1: 560, x2: 700, y2: 910 },
//   B8: { x1: 720, y1: 560, x2: 920, y2: 910 },
// };

// /**
//  * Bulk sync parking slot occupancy received from YOLO AI camera
//  * POST /api/yolo/occupancy-sync
//  */
// export const syncSlotOccupancy = async (req, res) => {
//   try {
//     const { parkingAreaId, detections } = req.body;

//     if (!parkingAreaId || !Array.isArray(detections)) {
//       return res.status(400).json({
//         success: false,
//         message: "parkingAreaId and detections array are required.",
//       });
//     }

//     const parkingArea = await ParkingArea.findOne({
//       $or: [{ id: parkingAreaId }, { _id: parkingAreaId.match(/^[0-9a-fA-F]{24}$/) ? parkingAreaId : null }],
//     });

//     if (!parkingArea) {
//       return res.status(404).json({
//         success: false,
//         message: "Parking area not found.",
//       });
//     }

//     const updatePromises = detections.map(async (item) => {
//       const { slotNumber, status, vehicleType } = item;
//       if (!slotNumber || !status) return null;

//       const updateData = { status };
//       if (vehicleType) updateData.vehicleType = vehicleType;

//       return ParkingSlot.findOneAndUpdate(
//         { parkingAreaId: parkingArea.id, slotNumber },
//         updateData,
//         { new: true }
//       );
//     });

//     const results = await Promise.all(updatePromises);
//     const updatedCount = results.filter(Boolean).length;

//     // Recalculate available and total slots
//     const totalSlots = await ParkingSlot.countDocuments({
//       parkingAreaId: parkingArea.id,
//       isActive: true,
//     });

//     const availableSlots = await ParkingSlot.countDocuments({
//       parkingAreaId: parkingArea.id,
//       status: "Available",
//       isActive: true,
//     });

//     // Do not overwrite a valid ParkingArea total with 0
//     if (totalSlots > 0) {
//       parkingArea.totalSlots = totalSlots;
//       parkingArea.availableSlots = availableSlots;
//       await parkingArea.save();
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "No active parking slots found for this parking area. Please create ParkingSlot records first.",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: `Successfully synchronized ${updatedCount} slots from YOLO AI.`,
//       parkingAreaId: parkingArea.id,
//       parkingAreaName: parkingArea.name,
//       totalSlots,
//       availableSlots,
//       timestamp: new Date().toISOString(),
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /**
//  * Get parking slot coordinates and mapping for YOLO camera vision
//  * GET /api/yolo/slots/:parkingAreaId
//  */
// export const getSlotsForCamera = async (req, res) => {
//   try {
//     const { parkingAreaId } = req.params;

//     const parkingArea = await ParkingArea.findOne({
//       $or: [{ id: parkingAreaId }, { _id: parkingAreaId.match(/^[0-9a-fA-F]{24}$/) ? parkingAreaId : null }],
//     });

//     if (!parkingArea) {
//       return res.status(404).json({
//         success: false,
//         message: "Parking area not found.",
//       });
//     }

//     const slots = await ParkingSlot.find({
//       parkingAreaId: parkingArea.id,
//       isActive: true,
//     }).lean();

//     // Attach coordinate bounding boxes
//     const slotsWithCoordinates = slots.map((slot) => ({
//       ...slot,
//       boundingBox: DEFAULT_CAMERA_SLOT_BOXES[slot.slotNumber] || {
//         x1: 100,
//         y1: 100,
//         x2: 300,
//         y2: 400,
//       },
//     }));

//     return res.status(200).json({
//       success: true,
//       parkingArea: {
//         id: parkingArea.id,
//         name: parkingArea.name,
//         totalSlots: parkingArea.totalSlots,
//         availableSlots: parkingArea.availableSlots,
//       },
//       count: slotsWithCoordinates.length,
//       slots: slotsWithCoordinates,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// /**
//  * Simulate live YOLO detection for demo / testing
//  * POST /api/yolo/simulate-detection
//  */
// export const simulateDetection = async (req, res) => {
//   try {
//     const { parkingAreaId = "parking001", occupiedSlotNumbers } = req.body;

//     const parkingArea = await ParkingArea.findOne({
//       $or: [{ id: parkingAreaId }, { _id: parkingAreaId.match(/^[0-9a-fA-F]{24}$/) ? parkingAreaId : null }],
//     });

//     if (!parkingArea) {
//       return res.status(404).json({
//         success: false,
//         message: "Parking area not found.",
//       });
//     }

//     const slots = await ParkingSlot.find({
//       parkingAreaId: parkingArea.id,
//       isActive: true,
//     });

//     let occupiedList = occupiedSlotNumbers;
//     if (!occupiedList || !Array.isArray(occupiedList)) {
//       // Randomly pick 2-4 slots to be occupied
//       const shuffled = [...slots].sort(() => 0.5 - Math.random());
//       occupiedList = shuffled.slice(0, Math.floor(Math.random() * 3) + 2).map((s) => s.slotNumber);
//     }

//     const detections = slots.map((slot) => {
//       const isOccupied = occupiedList.includes(slot.slotNumber);
//       return {
//         slotNumber: slot.slotNumber,
//         status: isOccupied ? "Occupied" : "Available",
//         confidence: isOccupied ? (0.92 + Math.random() * 0.07).toFixed(2) : 0.0,
//         vehicleType: slot.vehicleType || "Car",
//       };
//     });

//     // Update in MongoDB
//     for (const d of detections) {
//       await ParkingSlot.findOneAndUpdate(
//         { parkingAreaId: parkingArea.id, slotNumber: d.slotNumber },
//         { status: d.status }
//       );
//     }

//     const availableCount = detections.filter(
//       (d) => d.status === "Available"
//     ).length;

//     if (slots.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message:
//           "No active parking slots found for this parking area. Please create ParkingSlot records first.",
//       });
//     }

//     parkingArea.availableSlots = availableCount;
//     parkingArea.totalSlots = slots.length;

//     await parkingArea.save();

//     return res.status(200).json({
//       success: true,
//       message: "YOLO detection simulation completed successfully.",
//       parkingAreaId: parkingArea.id,
//       parkingAreaName: parkingArea.name,
//       totalSlots: slots.length,
//       availableSlots: availableCount,
//       occupiedSlots: occupiedList,
//       detections,
//       timestamp: new Date().toISOString(),
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };



import ParkingSlot from "../models/parkingSlot.model.js";
import ParkingArea from "../models/parkingArea.model.js";

/**
 * Find a parking area using its custom ID or MongoDB ObjectId.
 */
const findParkingArea = async (parkingAreaId) => {
  if (!parkingAreaId) return null;

  const conditions = [{ id: parkingAreaId }];

  if (/^[0-9a-fA-F]{24}$/.test(parkingAreaId)) {
    conditions.push({ _id: parkingAreaId });
  }

  return ParkingArea.findOne({ $or: conditions });
};

/**
 * Default camera coordinate presets.
 * Slots without a preset receive a generated fallback position.
 */
const DEFAULT_CAMERA_SLOT_BOXES = {
  A1: { x1: 50, y1: 100, x2: 250, y2: 450 },
  A2: { x1: 270, y1: 100, x2: 470, y2: 450 },
  A3: { x1: 490, y1: 100, x2: 690, y2: 450 },
  A4: { x1: 710, y1: 100, x2: 910, y2: 450 },
  A5: { x1: 50, y1: 550, x2: 250, y2: 900 },
  A6: { x1: 270, y1: 550, x2: 470, y2: 900 },
  A7: { x1: 490, y1: 550, x2: 690, y2: 900 },
  A8: { x1: 710, y1: 550, x2: 910, y2: 900 },

  B1: { x1: 60, y1: 120, x2: 260, y2: 460 },
  B2: { x1: 280, y1: 120, x2: 480, y2: 460 },
  B3: { x1: 500, y1: 120, x2: 700, y2: 460 },
  B4: { x1: 720, y1: 120, x2: 920, y2: 460 },
  B5: { x1: 60, y1: 560, x2: 260, y2: 910 },
  B6: { x1: 280, y1: 560, x2: 480, y2: 910 },
  B7: { x1: 500, y1: 560, x2: 700, y2: 910 },
  B8: { x1: 720, y1: 560, x2: 920, y2: 910 },
};

/**
 * Generate a fallback coordinate box for slots not in the preset list.
 * These are demo coordinates, not calibrated real camera positions.
 */
const getFallbackBoundingBox = (index, total) => {
  const columns = 4;
  const rows = Math.max(1, Math.ceil(total / columns));
  const column = index % columns;
  const row = Math.floor(index / columns);

  const cellWidth = 900 / columns;
  const cellHeight = 800 / rows;

  return {
    x1: Math.round(50 + column * cellWidth),
    y1: Math.round(100 + row * cellHeight),
    x2: Math.round(50 + (column + 1) * cellWidth - 20),
    y2: Math.round(100 + (row + 1) * cellHeight - 20),
  };
};

/**
 * POST /api/yolo/occupancy-sync
 * Synchronize occupancy detections for ONE selected parking area.
 */
export const syncSlotOccupancy = async (req, res) => {
  try {
    const { parkingAreaId, detections } = req.body;

    if (!parkingAreaId || !Array.isArray(detections)) {
      return res.status(400).json({
        success: false,
        message: "parkingAreaId and detections array are required.",
      });
    }

    const parkingArea = await findParkingArea(parkingAreaId);

    if (!parkingArea) {
      return res.status(404).json({
        success: false,
        message: "Parking area not found.",
      });
    }

    const slots = await ParkingSlot.find({
      parkingAreaId: parkingArea.id,
      isActive: true,
    }).select("slotNumber");

    if (slots.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No active parking slots found for this parking area.",
      });
    }

    const validSlotNumbers = new Set(slots.map((slot) => slot.slotNumber));
    const validStatuses = new Set(["Available", "Occupied", "Reserved"]);
    const validVehicleTypes = new Set(["Car", "Bike", "EV"]);

    const operations = [];

    for (const item of detections) {
      if (!item?.slotNumber || !validStatuses.has(item.status)) continue;
      if (!validSlotNumbers.has(item.slotNumber)) continue;

      const update = { status: item.status };

      if (item.vehicleType && validVehicleTypes.has(item.vehicleType)) {
        update.vehicleType = item.vehicleType;
      }

      operations.push({
        updateOne: {
          filter: {
            parkingAreaId: parkingArea.id,
            slotNumber: item.slotNumber,
            isActive: true,
          },
          update: { $set: update },
        },
      });
    }

    if (operations.length > 0) {
      await ParkingSlot.bulkWrite(operations);
    }

    const [totalSlots, availableSlots] = await Promise.all([
      ParkingSlot.countDocuments({
        parkingAreaId: parkingArea.id,
        isActive: true,
      }),
      ParkingSlot.countDocuments({
        parkingAreaId: parkingArea.id,
        isActive: true,
        status: "Available",
      }),
    ]);

    parkingArea.totalSlots = totalSlots;
    parkingArea.availableSlots = availableSlots;
    await parkingArea.save();

    return res.status(200).json({
      success: true,
      message: `Synchronized ${operations.length} valid slot detections.`,
      parkingAreaId: parkingArea.id,
      parkingAreaName: parkingArea.name,
      updatedCount: operations.length,
      totalSlots,
      availableSlots,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * GET /api/yolo/slots/:parkingAreaId
 * Return active slots for the selected parking area.
 */
export const getSlotsForCamera = async (req, res) => {
  try {
    const parkingArea = await findParkingArea(req.params.parkingAreaId);

    if (!parkingArea) {
      return res.status(404).json({
        success: false,
        message: "Parking area not found.",
      });
    }

    const slots = await ParkingSlot.find({
      parkingAreaId: parkingArea.id,
      isActive: true,
    }).lean();

    const slotsWithCoordinates = slots.map((slot, index) => ({
      ...slot,
      boundingBox:
        DEFAULT_CAMERA_SLOT_BOXES[slot.slotNumber] ||
        getFallbackBoundingBox(index, slots.length),
    }));

    const availableSlots = slots.filter(
      (slot) => slot.status === "Available"
    ).length;

    return res.status(200).json({
      success: true,
      parkingArea: {
        id: parkingArea.id,
        name: parkingArea.name,
        totalSlots: slots.length,
        availableSlots,
      },
      count: slotsWithCoordinates.length,
      slots: slotsWithCoordinates,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * POST /api/yolo/simulate-detection
 * Demo simulation for the selected parking area.
 */
export const simulateDetection = async (req, res) => {
  try {
    const { parkingAreaId = "parking001", occupiedSlotNumbers } = req.body;

    const parkingArea = await findParkingArea(parkingAreaId);

    if (!parkingArea) {
      return res.status(404).json({
        success: false,
        message: "Parking area not found.",
      });
    }

    const slots = await ParkingSlot.find({
      parkingAreaId: parkingArea.id,
      isActive: true,
    });

    if (slots.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No active parking slots found for this parking area.",
      });
    }

    let occupiedList;

    if (Array.isArray(occupiedSlotNumbers)) {
      const validSlotNumbers = new Set(slots.map((slot) => slot.slotNumber));
      occupiedList = [...new Set(occupiedSlotNumbers)].filter((number) =>
        validSlotNumbers.has(number)
      );
    } else {
      // Simulate approximately 25–45% occupancy for the selected area.
      const shuffled = [...slots].sort(() => Math.random() - 0.5);
      const minOccupied = Math.ceil(slots.length * 0.25);
      const maxOccupied = Math.ceil(slots.length * 0.45);
      const count =
        minOccupied +
        Math.floor(Math.random() * (maxOccupied - minOccupied + 1));

      occupiedList = shuffled
        .slice(0, count)
        .map((slot) => slot.slotNumber);
    }

    const occupiedSet = new Set(occupiedList);

    const operations = slots.map((slot) => ({
      updateOne: {
        filter: {
          parkingAreaId: parkingArea.id,
          slotNumber: slot.slotNumber,
          isActive: true,
        },
        update: {
          $set: {
            // Keep reserved slots reserved during the simulation.
            status:
              slot.status === "Reserved"
                ? "Reserved"
                : occupiedSet.has(slot.slotNumber)
                  ? "Occupied"
                  : "Available",
          },
        },
      },
    }));

    await ParkingSlot.bulkWrite(operations);

    const [totalSlots, availableSlots, occupiedSlotsCount] =
      await Promise.all([
        ParkingSlot.countDocuments({
          parkingAreaId: parkingArea.id,
          isActive: true,
        }),
        ParkingSlot.countDocuments({
          parkingAreaId: parkingArea.id,
          isActive: true,
          status: "Available",
        }),
        ParkingSlot.countDocuments({
          parkingAreaId: parkingArea.id,
          isActive: true,
          status: "Occupied",
        }),
      ]);

    parkingArea.totalSlots = totalSlots;
    parkingArea.availableSlots = availableSlots;
    await parkingArea.save();

    return res.status(200).json({
      success: true,
      message: "YOLO occupancy simulation completed successfully.",
      parkingAreaId: parkingArea.id,
      parkingAreaName: parkingArea.name,
      totalSlots,
      availableSlots,
      occupiedSlotsCount,
      occupiedSlots: occupiedList,
      detections: slots.map((slot) => ({
        slotNumber: slot.slotNumber,
        status:
          slot.status === "Reserved"
            ? "Reserved"
            : occupiedSet.has(slot.slotNumber)
              ? "Occupied"
              : "Available",
        vehicleType: slot.vehicleType,
      })),
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};