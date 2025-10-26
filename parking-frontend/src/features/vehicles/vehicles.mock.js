/*
let vehicles = [
  { id: 1, plate: "ABC-123", owner: "Alice Johnson", type: "Car", status: "Active" },
  { id: 2, plate: "XYZ-987", owner: "Bob Smith", type: "Motorbike", status: "Inactive" },
];

export const fetchVehiclesMock = async () => ({ data: vehicles });
export const addVehicleMock = async (payload) => {
  const newVehicle = { id: vehicles.length + 1, ...payload };
  vehicles.push(newVehicle);
  return { data: newVehicle };
};
export const deleteVehicleMock = async (id) => {
  vehicles = vehicles.filter(v => v.id !== id);
  return { data: true };
};
export const updateVehicleMock = async (id, payload) => {
  const index = vehicles.findIndex(v => v.id === id);
  if (index !== -1) vehicles[index] = { ...vehicles[index], ...payload };
  return { data: vehicles[index] };
};
*/
// src/features/vehicles/vehicles.mock.js
// src/features/vehicles/vehicles.mock.js
// src/features/vehicles/vehicles.mock.js

let vehicles = [
  { id: 1, customerId: 1, plateNumber: "ABC-123", model: "Toyota Corolla", color: "Blue" },
  { id: 2, customerId: 1, plateNumber: "XYZ-987", model: "Honda Civic", color: "Red" },
];

export const fetchVehiclesByCustomerMock = async (customerId) => {
  return vehicles.filter((v) => v.customerId === customerId);
};

export const fetchVehicleMock = async (id) => vehicles.find((v) => v.id === id);

export const createVehicleMock = async (payload) => {
  const newVehicle = { id: Date.now(), ...payload };
  vehicles.push(newVehicle);
  return newVehicle;
};

export const updateVehicleMock = async (id, payload) => {
  vehicles = vehicles.map((v) => (v.id === id ? { ...v, ...payload } : v));
  return vehicles.find((v) => v.id === id);
};

export const deleteVehicleMock = async (id) => {
  vehicles = vehicles.filter((v) => v.id !== id);
  return true;
};
