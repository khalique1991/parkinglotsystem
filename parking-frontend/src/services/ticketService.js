import api from "./api";

export const createTicket = async (vehicleNumber, vehicleType) => {
  const response = await api.post("http://localhost:8082/api/tickets", {
    vehicleNumber,
    vehicleType,
  });
  return response.data;
};

export const closeTicket = async (ticketId) => {
  const response = await api.post(
    `http://localhost:8082/api/tickets/${ticketId}/close`
  );
  return response.data;
};
