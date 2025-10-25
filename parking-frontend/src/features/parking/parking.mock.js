let parkings = [
  { id: 1, name: "Lot A", capacity: 50, occupied: 35 },
  { id: 2, name: "Lot B", capacity: 30, occupied: 28 },
];

let nextId = 3;

export const fetchParkingsMock = async () => ({ data: parkings });
export const fetchParkingMock = async (id) => ({ data: parkings.find(p => p.id === id) || null });
export const createParkingMock = async (payload) => {
  const newParking = { id: nextId++, ...payload };
  parkings.push(newParking);
  return { data: newParking };
};
export const updateParkingMock = async (id, payload) => {
  const index = parkings.findIndex(p => p.id === id);
  if (index !== -1) parkings[index] = { ...parkings[index], ...payload };
  return { data: parkings[index] };
};
export const deleteParkingMock = async (id) => {
  parkings = parkings.filter(p => p.id !== id);
  return { data: true };
};
