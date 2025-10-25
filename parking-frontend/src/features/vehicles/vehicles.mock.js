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
