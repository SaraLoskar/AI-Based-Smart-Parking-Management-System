import api from "../api/axios";

/**
 * Fetch nearby parking areas based on user's current GPS coordinates
 * @param {number} latitude User's latitude
 * @param {number} longitude User's longitude
 * @param {number} radius Maximum radius in kilometers (default: 15)
 * @param {string} sortBy "distance" | "price" | "availableSlots"
 */
export const getNearbyParkingAreas = async (latitude, longitude, radius = 15, sortBy = "distance") => {
  const response = await api.get("/navigation/nearby", {
    params: {
      latitude,
      longitude,
      radius,
      sortBy,
    },
  });
  return response.data;
};

/**
 * Get route navigation and Google Maps directions to a parking area
 * @param {string} parkingAreaId ID of the parking facility
 * @param {number} latitude User's latitude
 * @param {number} longitude User's longitude
 */
export const getDirectionsToParkingArea = async (parkingAreaId, latitude, longitude) => {
  const response = await api.get(`/navigation/directions/${parkingAreaId}`, {
    params: {
      latitude,
      longitude,
    },
  });
  return response.data;
};

/**
 * Get map pin information and Google Maps embed URL
 * @param {string} parkingAreaId ID of the parking facility
 */
export const getParkingAreaPin = async (parkingAreaId) => {
  const response = await api.get(`/navigation/pin/${parkingAreaId}`);
  return response.data;
};
