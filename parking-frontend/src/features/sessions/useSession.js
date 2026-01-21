import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from './sessions.api';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const useSessions = () =>
  useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      if (USE_MOCK) {
        const m = await import('./sessions.mock.js');
        return (await m.fetchSessionsMock()).data;
      } else {
        return api.fetchSessions();
      }
    },
  });

export const useSession = (id) =>
  useQuery({
    queryKey: ['session', id],
    queryFn: async () => {
      if (!id) return null;
      if (USE_MOCK) {
        const m = await import('./sessions.mock.js');
        return (await m.fetchSessionMock(id)).data;
      } else {
        return api.fetchSession(id);
      }
    },
    enabled: !!id,
  });

export const useCreateSession = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      if (USE_MOCK) {
        const m = await import('./sessions.mock.js');
        return (await m.createSessionMock(payload)).data;
      } else {
        return api.createSession(payload);
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sessions'] }),
  });
};

export const useUpdateSession = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      if (USE_MOCK) {
        const m = await import('./sessions.mock.js');
        return (await m.updateSessionMock(id, payload)).data;
      } else {
        return api.updateSession(id, payload);
      }
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['sessions'] });
      qc.invalidateQueries({ queryKey: ['session', vars.id] });
    },
  });
};

export const useDeleteSession = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (USE_MOCK) {
        const m = await import('./sessions.mock.js');
        return (await m.deleteSessionMock(id)).data;
      } else {
        return api.deleteSession(id);
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sessions'] }),
  });
};
