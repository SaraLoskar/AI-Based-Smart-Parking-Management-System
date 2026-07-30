import api from "../api/axios";

export const getParkingAreas = async () => {
  const response = await api.get("/parking-area");
  return response.data.data;
};