import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const useUsers = (params = {}) => useQuery(['users', params], async () => {
  if (USE_MOCK) {
    const mod = await import('./users.mock.js'); return (await mod.fetchUsersMock(params)).data
  } else {
    const mod = await import('./users.api.js'); return (await mod.fetchUsers(params)).data
  }
}, { staleTime: 60_000 })

export const useCreateUser = () => {
  const qc = useQueryClient()
  return useMutation(async (payload) => {
    if (USE_MOCK) { const m = await import('./users.mock.js'); return (await m.createUserMock(payload)).data }
    const m = await import('./users.api.js'); return (await m.createUser(payload)).data
  }, { onSuccess: () => qc.invalidateQueries(['users']) })
}

export const useDeleteUser = () => {
  const qc = useQueryClient()
  return useMutation(async (id) => {
    if (USE_MOCK) { const m = await import('./users.mock.js'); return (await m.deleteUserMock(id)).data }
    const m = await import('./users.api.js'); return (await m.deleteUser(id)).data
  }, { onSuccess: () => qc.invalidateQueries(['users']) })
}
