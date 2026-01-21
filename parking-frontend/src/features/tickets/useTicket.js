// src/features/tickets/useTickets.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "./tickets.api";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const useTickets = () =>
  useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      if (USE_MOCK) {
        const m = await import("./tickets.mock.js");
        return (await m.fetchTicketsMock()).data; // ✅ return .data
      } else {
        return api.fetchTickets();
      }
    },
  });

export const useCreateTicket = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      if (USE_MOCK) {
        const m = await import("./tickets.mock.js");
        return (await m.createTicketMock(payload)).data;
      } else {
        return api.createTicket(payload);
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tickets"] }),
  });
};

export const useUpdateTicket = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }) => {
      if (USE_MOCK) {
        const m = await import("./tickets.mock.js");
        return (await m.updateTicketMock(id, { status })).data;
      } else {
        return api.updateTicketStatus(id, status);
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tickets"] }),
  });
};

export const useDeleteTicket = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (USE_MOCK) {
        const m = await import("./tickets.mock.js");
        return (await m.deleteTicketMock(id)).data;
      } else {
        return api.deleteTicket(id);
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tickets"] }),
  });
};

export const useCancelTicket = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (USE_MOCK) {
        const m = await import("./tickets.mock.js");
        return (await m.cancelTicketMock(id)).data;
      } else {
        return api.cancelTicket(id);
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tickets"] }),
  });
};

export const useCompleteTicket = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (USE_MOCK) {
        const m = await import("./tickets.mock.js");
        return (await m.completeTicketMock(id)).data;
      } else {
        const res = await fetch(`/api/tickets/${id}/complete`, { method: "PUT" });
        return await res.json();
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tickets"] }),
  });
};
