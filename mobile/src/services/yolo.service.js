import api from "../api/axios";

/**
 * Sync slot occupancy from AI detection
 * @param {string} parkingAreaId
 * @param {Array} detections
 */
export const syncYoloOccupancy = async (parkingAreaId, detections) => {
  const response = await api.post("/yolo/occupancy-sync", {
    parkingAreaId,
    detections,
  });
  return response.data;
};

/**
 * Get slot coordinates mapped for camera detection
 * @param {string} parkingAreaId
 */
export const getYoloSlots = async (parkingAreaId) => {
  const response = await api.get(`/yolo/slots/${parkingAreaId}`);
  return response.data;
};

/**
 * Run a demo YOLO detection cycle simulation
 * @param {string} parkingAreaId
 * @param {Array<string>} occupiedSlots
 */
export const triggerYoloSimulation = async (parkingAreaId = "parking001", occupiedSlots) => {
  const response = await api.post("/yolo/simulate-detection", {
    parkingAreaId,
    occupiedSlotNumbers: occupiedSlots,
  });
  return response.data;
};
