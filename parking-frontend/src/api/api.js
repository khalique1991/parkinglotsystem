/*
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (credentials) => {
  return await axios.post(`${API_BASE_URL}/login`, credentials);
};

export const getParkingLots = async () => {
  return await axios.get(`${API_BASE_URL}/parking-lots`);
};

export const bookParkingSpot = async (spotId, userId) => {
  return await axios.post(`${API_BASE_URL}/book`, { spotId, userId });
};
*/
// src/api/api.js

export const loginUser = async ({ email, password }) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (email === "test@example.com" && password === "password") {
    return {
      data: {
        id: 1,
        name: "Test User",
        email: "test@example.com",
      },
    };
  } else {
    throw new Error("Invalid credentials");
  }
};

export const getParkingLots = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    data: [
      { id: 1, name: "Lot A", spotsAvailable: 5 },
      { id: 2, name: "Lot B", spotsAvailable: 3 },
    ],
  };
};

export const bookParkingSpot = async (spotId, userId) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(`Booked spot ${spotId} for user ${userId}`);
  return { data: { success: true } };
};
