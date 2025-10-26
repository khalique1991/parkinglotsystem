/*
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
const USE_MOCK = true;

export const useVehicles = () => useQuery(['vehicles'], async () => {
  if (USE_MOCK) {
    const m = await import('./vehicles.mock.js');
    return (await m.fetchVehiclesMock()).data;
  }
});

export const useVehicle = (id) => useQuery(['vehicle', id], async () => {
  if (!id) return null;
  if (USE_MOCK) {
    const m = await import('./vehicles.mock.js');
    return (await m.fetchVehicleMock(id)).data;
  }
}, { enabled: !!id });

export const useCreateVehicle = () => {
  const qc = useQueryClient();
  return useMutation(async (payload) => {
    if (USE_MOCK) {
      const m = await import('./vehicles.mock.js');
      return (await m.createVehicleMock(payload)).data;
    }
  }, { onSuccess: () => qc.invalidateQueries(['vehicles']) });
};

export const useUpdateVehicle = () => {
  const qc = useQueryClient();
  return useMutation(async ({ id, payload }) => {
    if (USE_MOCK) {
      const m = await import('./vehicles.mock.js');
      return (await m.updateVehicleMock(id, payload)).data;
    }
  }, { onSuccess: (_, vars) => {
    qc.invalidateQueries(['vehicles']);
    qc.invalidateQueries(['vehicle', vars.id]);
  }});
};

export const useDeleteVehicle = () => {
  const qc = useQueryClient();
  return useMutation(async (id) => {
    if (USE_MOCK) {
      const m = await import('./vehicles.mock.js');
      return (await m.deleteVehicleMock(id)).data;
    }
  }, { onSuccess: () => qc.invalidateQueries(['vehicles']) });
};
*//*

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
const USE_MOCK = true;

export const useVehicles = () =>
  useQuery({
    queryKey: ['vehicles'],
    queryFn: async () => {
      if (USE_MOCK) {
        const m = await import('./vehicles.mock.js');
        return (await m.fetchVehiclesMock()).data;
      }
    },
  });

export const useVehicle = (id) =>
  useQuery({
    queryKey: ['vehicle', id],
    queryFn: async () => {
      if (!id) return null;
      if (USE_MOCK) {
        const m = await import('./vehicles.mock.js');
        return (await m.fetchVehicleMock(id)).data;
      }
    },
    enabled: !!id,
  });

export const useCreateVehicle = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      if (USE_MOCK) {
        const m = await import('./vehicles.mock.js');
        return (await m.createVehicleMock(payload)).data;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vehicles'] }),
  });
};

export const useUpdateVehicle = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      if (USE_MOCK) {
        const m = await import('./vehicles.mock.js');
        return (await m.updateVehicleMock(id, payload)).data;
      }
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['vehicles'] });
      qc.invalidateQueries({ queryKey: ['vehicle', vars.id] });
    },
  });
};

export const useDeleteVehicle = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (USE_MOCK) {
        const m = await import('./vehicles.mock.js');
        return (await m.deleteVehicleMock(id)).data;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['vehicles'] }),
  });
};
*/
// src/features/vehicles/useVehicle.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

// ✅ Fetch all vehicles by customer
export const useVehiclesByCustomer = (customerId) =>
  useQuery({
    queryKey: ["vehicles", customerId],
    queryFn: async () => {
      if (!customerId) return [];
      if (USE_MOCK) {
        const m = await import("./vehicles.mock.js");
        return m.fetchVehiclesByCustomerMock(customerId);
      } else {
        return api.get(`/vehicle/customer/${customerId}`);
      }
    },
    enabled: !!customerId,
    staleTime: 60 * 1000,
  });

// ✅ Alias for easy import
export const useVehicles = useVehiclesByCustomer;

// ✅ Create vehicle
export const useCreateVehicle = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      if (USE_MOCK) {
        const m = await import("./vehicles.mock.js");
        return m.createVehicleMock(payload);
      } else {
        return api.post("/vehicle", payload);
      }
    },
    onSuccess: (_, payload) => qc.invalidateQueries({ queryKey: ["vehicles", payload.customerId] }),
  });
};

// ✅ Update vehicle
export const useUpdateVehicle = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      if (USE_MOCK) {
        const m = await import("./vehicles.mock.js");
        return m.updateVehicleMock(id, payload);
      } else {
        return api.put(`/vehicle/${id}`, payload);
      }
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ["vehicles", vars.payload.customerId] }),
  });
};

// ✅ Delete vehicle
export const useDeleteVehicle = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, customerId }) => {
      if (USE_MOCK) {
        const m = await import("./vehicles.mock.js");
        return m.deleteVehicleMock(id);
      } else {
        return api.delete(`/vehicle/${id}`);
      }
    },
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ["vehicles", vars.customerId] }),
  });
};
