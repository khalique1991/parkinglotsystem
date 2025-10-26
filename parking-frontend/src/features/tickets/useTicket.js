// src/features/tickets/useTickets.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const useTickets = () =>
  useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      if (USE_MOCK) {
        const m = await import("./tickets.mock.js");
        return (await m.fetchTicketsMock()).data; // ✅ return .data
      } else {
        const res = await fetch("/api/tickets");
        return await res.json();
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
        const res = await fetch("/api/tickets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        return await res.json();
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tickets"] }),
  });
};

export const useUpdateTicket = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      if (USE_MOCK) {
        const m = await import("./tickets.mock.js");
        return (await m.updateTicketMock(id, payload)).data;
      } else {
        const res = await fetch(`/api/tickets/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        return await res.json();
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
        await fetch(`/api/tickets/${id}`, { method: "DELETE" });
        return true;
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
        const res = await fetch(`/api/tickets/${id}/cancel`, { method: "PUT" });
        return await res.json();
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
