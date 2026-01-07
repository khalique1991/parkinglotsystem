import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:5000/api/tickets"; // adjust your backend port

// ✅ Fetch all tickets
export const useTickets = () => {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL);
      return data;
    },
  });
};

// ✅ Create new ticket
export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { data } = await axios.post(API_URL, payload);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(["tickets"]),
  });
};

// ✅ Update ticket status
export const useUpdateTicketStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      const { data } = await axios.put(`${API_URL}/${id}`, payload);
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries(["tickets"]),
  });
};

// ✅ Delete ticket
export const useDeleteTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => await axios.delete(`${API_URL}/${id}`),
    onSuccess: () => queryClient.invalidateQueries(["tickets"]),
  });
};

// ✅ Cancel ticket
export const useCancelTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => await axios.patch(`${API_URL}/${id}/cancel`),
    onSuccess: () => queryClient.invalidateQueries(["tickets"]),
  });
};

// ✅ Complete ticket
export const useCompleteTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => await axios.patch(`${API_URL}/${id}/complete`),
    onSuccess: () => queryClient.invalidateQueries(["tickets"]),
  });
};
