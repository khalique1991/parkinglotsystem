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

/*
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
*/




// src/utils/api.js
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8080/api";

const api = {
  get: async (url) => {
    const res = await fetch(`${API_BASE}${url}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("API GET error");
    return res.json();
  },
  post: async (url, data) => {
    const res = await fetch(`${API_BASE}${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("API POST error");
    return res.json();
  },
  put: async (url, data) => {
    const res = await fetch(`${API_BASE}${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("API PUT error");
    return res.json();
  },
  delete: async (url) => {
    const res = await fetch(`${API_BASE}${url}`, { method: "DELETE" });
    if (!res.ok) throw new Error("API DELETE error");
    return res.json();
  },
};

export default api;
