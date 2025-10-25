import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const USE_MOCK = true;

export const useNotifications = () => useQuery({
  queryKey: ["notifications"],
  queryFn: async () => USE_MOCK ? (await import("./notifications.mock.js")).fetchNotificationsMock() : null,
});

export const useDeleteNotification = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => USE_MOCK ? (await import("./notifications.mock.js")).deleteNotificationMock(id) : null,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] })
  });
};

export const useAddNotification = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => USE_MOCK ? (await import("./notifications.mock.js")).addNotificationMock(payload) : null,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] })
  });
};
