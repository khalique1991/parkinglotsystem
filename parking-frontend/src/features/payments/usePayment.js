import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from './payments.api';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const usePayments = (params) =>
  useQuery({
    queryKey: ['payments', params],
    queryFn: async () => {
      if (USE_MOCK) {
        const m = await import('./payments.mock.js');
        return (await m.fetchPaymentsMock()).data;
      } else {
        return api.fetchPayments(params);
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
      } else {
        return api.fetchPayment(id);
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
      } else {
        return api.createPayment(payload);
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

export const useRefundPayment = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      if (USE_MOCK) {
        const m = await import('./payments.mock.js');
        return (await m.refundPaymentMock(id, payload)).data;
      } else {
        return api.refundPayment(id, payload);
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['payments'] }),
  });
};
