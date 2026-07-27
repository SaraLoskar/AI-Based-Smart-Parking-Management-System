import api from "../api/axios";

export const getParkingAreas = async () => {
  const response = await api.get("/parking-area");
  return response.data;
};

export const getActiveParkingAreas = async () => {
  const response = await api.get("/parking-area/active");
  return response.data;
};