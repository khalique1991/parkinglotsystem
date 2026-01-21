import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as api from "./parking.api";
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const useParkings = () =>
  useQuery({
    queryKey: ["parkings"],
    queryFn: async () =>
      USE_MOCK
        ? (await import("./parking.mock.js")).fetchParkingsMock()
        : api.getParkingLots(),
  });

export const useParking = (id) =>
  useQuery({
    queryKey: ["parking", id],
    queryFn: async () =>
      USE_MOCK
        ? (await import("./parking.mock.js")).fetchParkingMock(id)
        : api.getParkingLot(id),
    enabled: !!id,
  });

export const useCreateParking = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) =>
      USE_MOCK ? (await import("./parking.mock.js")).createParkingMock(payload) : api.createParkingLot(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["parkings"] }),
  });
};

export const useUpdateParking = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) =>
      USE_MOCK ? (await import("./parking.mock.js")).updateParkingMock(id, payload) : api.updateParkingLot({ id, payload }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["parkings"] });
      qc.invalidateQueries({ queryKey: ["parking", vars.id] });
    },
  });
};

export const useDeleteParking = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) =>
      USE_MOCK ? (await import("./parking.mock.js")).deleteParkingMock(id) : api.deleteParkingLot(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["parkings"] }),
  });
};
