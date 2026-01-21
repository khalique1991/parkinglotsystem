import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "./notifications.api";
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const useNotifications = (params) => useQuery({
  queryKey: ["notifications", params],
  queryFn: async () => USE_MOCK
    ? (await import("./notifications.mock.js")).fetchNotificationsMock()
    : api.fetchNotifications(params),
});

export const useDeleteNotification = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => USE_MOCK
      ? (await import("./notifications.mock.js")).deleteNotificationMock(id)
      : api.deleteNotification(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] })
  });
};

export const useAddNotification = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => USE_MOCK
      ? (await import("./notifications.mock.js")).addNotificationMock(payload)
      : api.createNotification(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notifications"] })
  });
};
