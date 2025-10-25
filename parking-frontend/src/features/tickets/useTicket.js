import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const USE_MOCK = true;

export const useTickets = () => useQuery({ queryKey: ["tickets"], queryFn: async () => USE_MOCK ? (await import("./tickets.mock.js")).fetchTicketsMock() : null });
export const useDeleteTicket = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: async (id) => USE_MOCK ? (await import("./tickets.mock.js")).deleteTicketMock(id) : null, onSuccess: () => qc.invalidateQueries({ queryKey: ["tickets"] }) });
};
export const useCancelTicket = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: async (id) => USE_MOCK ? (await import("./tickets.mock.js")).cancelTicketMock(id) : null, onSuccess: () => qc.invalidateQueries({ queryKey: ["tickets"] }) });
};
export const useCompleteTicket = () => {
  const qc = useQueryClient();
  return useMutation({ mutationFn: async (id) => USE_MOCK ? (await import("./tickets.mock.js")).completeTicketMock(id) : null, onSuccess: () => qc.invalidateQueries({ queryKey: ["tickets"] }) });
};
