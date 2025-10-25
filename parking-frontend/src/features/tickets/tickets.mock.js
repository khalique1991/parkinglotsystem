let tickets = [
  { id: 1, sessionId: 1, issue: "Lost ticket", status: "OPEN" },
  { id: 2, sessionId: 2, issue: "Payment discrepancy", status: "RESOLVED" },
];
let nextId = 3;

export const fetchTicketsMock = async () => ({ data: tickets });
export const fetchTicketMock = async (id) => ({ data: tickets.find(t => t.id === id) || null });
export const createTicketMock = async (payload) => {
  const newTicket = { id: nextId++, ...payload };
  tickets.push(newTicket);
  return { data: newTicket };
};
export const updateTicketMock = async (id, payload) => {
  const index = tickets.findIndex(t => t.id === id);
  if (index !== -1) tickets[index] = { ...tickets[index], ...payload };
  return { data: tickets[index] };
};
export const deleteTicketMock = async (id) => {
  tickets = tickets.filter(t => t.id !== id);
  return { data: true };
};
export const cancelTicketMock = async (id) => {
  const ticket = tickets.find(t => t.id === id);
  if (ticket) ticket.status = "CANCELLED";
  return { data: ticket };
};
export const completeTicketMock = async (id) => {
  const ticket = tickets.find(t => t.id === id);
  if (ticket) ticket.status = "COMPLETED";
  return { data: ticket };
};
