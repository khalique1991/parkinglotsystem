/*
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
const USE_MOCK = true;

export const usePayments = () => useQuery(['payments'], async () => {
  if (USE_MOCK) {
    const m = await import('./payments.mock.js');
    return (await m.fetchPaymentsMock()).data;
  }
});

export const usePayment = (id) => useQuery(['payment', id], async () => {
  if (!id) return null;
  if (USE_MOCK) {
    const m = await import('./payments.mock.js');
    return (await m.fetchPaymentMock(id)).data;
  }
}, { enabled: !!id });

export const useCreatePayment = () => {
  const qc = useQueryClient();
  return useMutation(async (payload) => {
    if (USE_MOCK) {
      const m = await import('./payments.mock.js');
      return (await m.createPaymentMock(payload)).data;
    }
  }, { onSuccess: () => qc.invalidateQueries(['payments']) });
};

export const useUpdatePayment = () => {
  const qc = useQueryClient();
  return useMutation(async ({ id, payload }) => {
    if (USE_MOCK) {
      const m = await import('./payments.mock.js');
      return (await m.updatePaymentMock(id, payload)).data;
    }
  }, { onSuccess: (_, vars) => {
    qc.invalidateQueries(['payments']);
    qc.invalidateQueries(['payment', vars.id]);
  }});
};

export const useDeletePayment = () => {
  const qc = useQueryClient();
  return useMutation(async (id) => {
    if (USE_MOCK) {
      const m = await import('./payments.mock.js');
      return (await m.deletePaymentMock(id)).data;
    }
  }, { onSuccess: () => qc.invalidateQueries(['payments']) });
};
*/

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
const USE_MOCK = true;

export const usePayments = () =>
  useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      if (USE_MOCK) {
        const m = await import('./payments.mock.js');
        return (await m.fetchPaymentsMock()).data;
      }
    },
  });

export const usePayment = (id) =>
  useQuery({
    queryKey: ['payment', id],
    queryFn: async () => {
      if (!id) return null;
      if (USE_MOCK) {
        const m = await import('./payments.mock.js');
        return (await m.fetchPaymentMock(id)).data;
      }
    },
    enabled: !!id,
  });

export const useCreatePayment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      if (USE_MOCK) {
        const m = await import('./payments.mock.js');
        return (await m.createPaymentMock(payload)).data;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['payments'] }),
  });
};

export const useUpdatePayment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      if (USE_MOCK) {
        const m = await import('./payments.mock.js');
        return (await m.updatePaymentMock(id, payload)).data;
      }
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['payments'] });
      qc.invalidateQueries({ queryKey: ['payment', vars.id] });
    },
  });
};

export const useDeletePayment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (USE_MOCK) {
        const m = await import('./payments.mock.js');
        return (await m.deletePaymentMock(id)).data;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['payments'] }),
  });
};
