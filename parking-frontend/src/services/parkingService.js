import api from "./api";

export const getAvailableSpots = async (lotId) => {
  const response = await api.get(`/parking/lots/${lotId}/available-spots`);
  return response.data;
};

export const createParkingLot = async (lot) => {
  const response = await api.post("/parking/parkinglots", lot);
  return response.data;
};
