/*
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
const USE_MOCK = true; // set false to use real API

// Fetch all sessions
export const useSessions = () => useQuery(['sessions'], async () => {
  if (USE_MOCK) {
    const m = await import('./sessions.mock.js');
    return (await m.fetchSessionsMock()).data;
  }
});

// Fetch a single session by ID
export const useSession = (id) => useQuery(['session', id], async () => {
  if (!id) return null;
  if (USE_MOCK) {
    const m = await import('./sessions.mock.js');
    return (await m.fetchSessionMock(id)).data;
  }
}, { enabled: !!id });

// Create a new session
export const useCreateSession = () => {
  const qc = useQueryClient();
  return useMutation(async (payload) => {
    if (USE_MOCK) {
      const m = await import('./sessions.mock.js');
      return (await m.createSessionMock(payload)).data;
    }
  }, { onSuccess: () => qc.invalidateQueries(['sessions']) });
};

// Update a session
export const useUpdateSession = () => {
  const qc = useQueryClient();
  return useMutation(async ({ id, payload }) => {
    if (USE_MOCK) {
      const m = await import('./sessions.mock.js');
      return (await m.updateSessionMock(id, payload)).data;
    }
  }, {
    onSuccess: (_, vars) => {
      qc.invalidateQueries(['sessions']);
      qc.invalidateQueries(['session', vars.id]);
    }
  });
};

// Delete a session
export const useDeleteSession = () => {
  const qc = useQueryClient();
  return useMutation(async (id) => {
    if (USE_MOCK) {
      const m = await import('./sessions.mock.js');
      return (await m.deleteSessionMock(id)).data;
    }
  }, { onSuccess: () => qc.invalidateQueries(['sessions']) });
};
*/
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
const USE_MOCK = true;

export const useSessions = () =>
  useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      if (USE_MOCK) {
        const m = await import('./sessions.mock.js');
        return (await m.fetchSessionsMock()).data;
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
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sessions'] }),
  });
};
