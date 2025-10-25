/*
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const useUser = (id) => useQuery(['user', id], async () => {
  if (!id) return null
  if (USE_MOCK) { const m = await import('./users.mock.js'); return (await m.fetchUserMock(id)).data }
  const m = await import('./users.api.js'); return (await m.fetchUser(id)).data
}, { enabled: !!id })

export const useUpdateUser = () => {
  const qc = useQueryClient()
  return useMutation(async ({ id, payload }) => {
    if (USE_MOCK) { const m = await import('./users.mock.js'); return (await m.updateUserMock(id, payload)).data }
    const m = await import('./users.api.js'); return (await m.updateUser(id, payload)).data
  }, { onSuccess: (_, vars) => { qc.invalidateQueries(['users']); qc.invalidateQueries(['user', vars.id]) } })
}
*/

/*
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
const USE_MOCK = true; // mock data toggle

export const useUsers = () => useQuery(['users'], async () => {
  if (USE_MOCK) {
    const m = await import('./users.mock.js');
    return (await m.fetchUsersMock()).data;
  }
});

export const useUser = (id) => useQuery(['user', id], async () => {
  if (!id) return null;
  if (USE_MOCK) {
    const m = await import('./users.mock.js');
    return (await m.fetchUserMock(id)).data;
  }
}, { enabled: !!id });

export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation(async ({ id, payload }) => {
    if (USE_MOCK) {
      const m = await import('./users.mock.js');
      return (await m.updateUserMock(id, payload)).data;
    }
  }, {
    onSuccess: (_, vars) => {
      qc.invalidateQueries(['users']);
      qc.invalidateQueries(['user', vars.id]);
    }
  });
};

export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation(async (payload) => {
    if (USE_MOCK) {
      const m = await import('./users.mock.js');
      return (await m.createUserMock(payload)).data;
    }
  }, {
    onSuccess: () => qc.invalidateQueries(['users'])
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation(async (id) => {
    if (USE_MOCK) {
      const m = await import('./users.mock.js');
      return (await m.deleteUserMock(id)).data;
    }
  }, {
    onSuccess: () => qc.invalidateQueries(['users'])
  });
};
*/

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
const USE_MOCK = true;

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      if (USE_MOCK) {
        const m = await import('./users.mock.js');
        return (await m.fetchUsersMock()).data;
      }
    },
  });
};

export const useUser = (id) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      if (!id) return null;
      if (USE_MOCK) {
        const m = await import('./users.mock.js');
        return (await m.fetchUserMock(id)).data;
      }
    },
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      if (USE_MOCK) {
        const m = await import('./users.mock.js');
        return (await m.createUserMock(payload)).data;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
};

export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      if (USE_MOCK) {
        const m = await import('./users.mock.js');
        return (await m.updateUserMock(id, payload)).data;
      }
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['users'] });
      qc.invalidateQueries({ queryKey: ['user', vars.id] });
    },
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (USE_MOCK) {
        const m = await import('./users.mock.js');
        return (await m.deleteUserMock(id)).data;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
};

