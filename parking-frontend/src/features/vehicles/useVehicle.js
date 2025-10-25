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
*/
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
