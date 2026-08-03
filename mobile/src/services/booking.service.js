import api from "./api";

export const createBooking = async (bookingData) => {
  try {
    const response = await api.post("/booking", bookingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getBookingsByUser = async (userId) => {
  try {
    const response = await api.get(`/booking/user/${userId}`);
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};