import api from "../api/axios";

export const getParkingAreas = async () => {
  const response = await api.get("/parking-area");
  return response.data.data;
};

export const getNearbyParkingAreas = async (latitude, longitude, radius = 15, sortBy = "distance") => {
  try {
    const response = await api.get("/navigation/nearby", {
      params: {
        latitude,
        longitude,
        radius,
        sortBy,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("Nearby Parking API Error:", error?.response?.data || error.message);
    // Fallback to standard parking areas
    const fallback = await getParkingAreas();
    return fallback;
  }
};