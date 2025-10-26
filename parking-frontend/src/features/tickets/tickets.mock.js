// src/features/tickets/tickets.mock.js
export let tickets = [
  { id: 1, customerId: 1, vehicleId: 101, issue: "Lost ticket", status: "OPEN" },
  { id: 2, customerId: 2, vehicleId: 102, issue: "Payment discrepancy", status: "RESOLVED" },
];
let nextId = 3;

export const createTicketMock = async (payload) => {
  const newTicket = { id: nextId++, ...payload };
  tickets.push(newTicket);
  return { data: newTicket };
};

export const updateTicketMock = async (id, payload) => {
  const index = tickets.findIndex((t) => t.id === id);
  if (index !== -1) tickets[index] = { ...tickets[index], ...payload };
  return { data: tickets[index] };
};

export const deleteTicketMock = async (id) => {
  tickets = tickets.filter((t) => t.id !== id);
  return { data: true };
};

export const cancelTicketMock = async (id) => {
  const ticket = tickets.find((t) => t.id === id);
  if (ticket) ticket.status = "CANCELLED";
  return { data: ticket };
};

export const completeTicketMock = async (id) => {
  const ticket = tickets.find((t) => t.id === id);
  if (ticket) ticket.status = "COMPLETED";
  return { data: ticket };
};
