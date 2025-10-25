// src/features/parking/parking.api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getParkingLots = async () => {
  const res = await axios.get(`${API_BASE_URL}/parking-lots`);
  return res.data; // must return the data array
};

export const getParkingLot = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/parking-lots/${id}`);
  return res.data;
};

export const updateParkingLot = async ({ id, payload }) => {
  const res = await axios.put(`${API_BASE_URL}/parking-lots/${id}`, payload);
  return res.data;
};
