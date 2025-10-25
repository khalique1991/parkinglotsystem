import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const useTickets = (params = {}) => {
  return useQuery(['tickets', params], async () => {
    if (USE_MOCK) {
      const mod = await import('../tickets.mock.js')
      return (await mod.fetchTicketsMock(params)).data
    } else {
      const mod = await import('../tickets.api.js')
      return (await mod.fetchTickets(params)).data
    }
  }, { staleTime: 1000 * 20 })
}

export const useCreateTicket = () => {
  const qc = useQueryClient()
  return useMutation(async (payload) => {
    if (USE_MOCK) {
      const mod = await import('../tickets.mock.js')
      return (await mod.createTicketMock(payload)).data
    } else {
      const mod = await import('../tickets.api.js')
      return (await mod.createTicket(payload)).data
    }
  }, { onSuccess: () => qc.invalidateQueries(['tickets']) })
}

export const useTicketAction = () => {
  const qc = useQueryClient()
  return useMutation(async ({ id, action }) => {
    if (USE_MOCK) {
      const mod = await import('../tickets.mock.js')
      if (action === 'complete') return (await mod.completeTicketMock(id)).data
      if (action === 'cancel') return (await mod.cancelTicketMock(id)).data
      return (await mod.updateTicketMock(id, action)).data
    } else {
      const mod = await import('../tickets.api.js')
      if (action === 'complete') return (await mod.completeTicket(id)).data
      if (action === 'cancel') return (await mod.cancelTicket(id)).data
      return (await mod.updateTicket(id, action)).data
    }
  }, { onSuccess: () => { qc.invalidateQueries(['tickets']); qc.invalidateQueries(['ticket']) } })
}
