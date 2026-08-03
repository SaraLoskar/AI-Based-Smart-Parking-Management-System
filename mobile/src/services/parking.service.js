import api from "../api/axios";

export const getParkingAreas = async () => {
  const response = await api.get("/parking-area");

  console.log("Parking API Response:");
  console.log(response.data);

  return response.data.data;
};