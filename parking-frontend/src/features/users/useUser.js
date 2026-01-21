import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      if (USE_MOCK) {
        const m = await import('./users.mock.js');
        return (await m.fetchUsersMock()).data;
      } else {
        const m = await import('./users.api.js');
        return (await m.fetchUsers()).data;
      }
    },
  });

export const useUser = (id) =>
  useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      if (!id) return null;
      if (USE_MOCK) {
        const m = await import('./users.mock.js');
        return (await m.fetchUserMock(id)).data;
      } else {
        const m = await import('./users.api.js');
        return (await m.fetchUser(id)).data;
      }
    },
    enabled: !!id,
  });

export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      if (USE_MOCK) {
        const m = await import('./users.mock.js');
        return (await m.updateUserMock(id, payload)).data;
      } else {
        const m = await import('./users.api.js');
        return (await m.updateUser(id, payload)).data;
      }
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['users'] });
      qc.invalidateQueries({ queryKey: ['user', vars.id] });
    },
  });
};

export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      if (USE_MOCK) {
        const m = await import('./users.mock.js');
        return (await m.createUserMock(payload)).data;
      } else {
        const m = await import('./users.api.js');
        return (await m.createUser(payload)).data;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (USE_MOCK) {
        const m = await import('./users.mock.js');
        return (await m.deleteUserMock(id)).data;
      } else {
        const m = await import('./users.api.js');
        return (await m.deleteUser(id)).data;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
};

