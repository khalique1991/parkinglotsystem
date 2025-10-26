// src/features/tickets/useTickets.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

// ✅ Mock ticket data
const fetchTicketsMock = async () => {
  const { tickets } = await import("./tickets.mock.js");
  return { data: tickets };
};

const createTicketMock = async (payload) => {
  const { createTicketMock } = await import("./tickets.mock.js");
  return createTicketMock(payload);
};

const updateTicketMock = async (id, payload) => {
  const { updateTicketMock } = await import("./tickets.mock.js");
  return updateTicketMock(id, payload);
};

const deleteTicketMock = async (id) => {
  const { deleteTicketMock } = await import("./tickets.mock.js");
  return deleteTicketMock(id);
};

const cancelTicketMock = async (id) => {
  const { cancelTicketMock } = await import("./tickets.mock.js");
  return cancelTicketMock(id);
};

const completeTicketMock = async (id) => {
  const { completeTicketMock } = await import("./tickets.mock.js");
  return completeTicketMock(id);
};

// ------------------ Hooks ------------------

export const useTickets = () =>
  useQuery({
    queryKey: ["tickets"],
    queryFn: async () =>
      USE_MOCK
        ? (await fetchTicketsMock()).data
        : (await import("./tickets.api.js")).fetchTickets(),
  });

export const useCreateTicket = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) =>
      USE_MOCK
        ? (await createTicketMock(payload)).data
        : (await import("./tickets.api.js")).createTicket(payload),
    onSuccess: () => qc.invalidateQueries(["tickets"]),
  });
};

export const useUpdateTicketStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) =>
      USE_MOCK
        ? (await updateTicketMock(id, payload)).data
        : (await import("./tickets.api.js")).updateTicketStatus(id, payload),
    onSuccess: (_, vars) => qc.invalidateQueries(["tickets"]),
  });
};

export const useDeleteTicket = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) =>
      USE_MOCK
        ? (await deleteTicketMock(id)).data
        : (await import("./tickets.api.js")).deleteTicket(id),
    onSuccess: () => qc.invalidateQueries(["tickets"]),
  });
};

export const useCancelTicket = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) =>
      USE_MOCK
        ? (await cancelTicketMock(id)).data
        : (await import("./tickets.api.js")).cancelTicket(id),
    onSuccess: () => qc.invalidateQueries(["tickets"]),
  });
};

export const useCompleteTicket = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) =>
      USE_MOCK
        ? (await completeTicketMock(id)).data
        : (await import("./tickets.api.js")).completeTicket(id),
    onSuccess: () => qc.invalidateQueries(["tickets"]),
  });
};
