import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const usePayments = (params = {}) => {
  return useQuery(['payments', params], async () => {
    if (USE_MOCK) {
      const mod = await import('./payments.mock.js')
      return (await mod.fetchPaymentsMock(params)).data
    } else {
      const mod = await import('./payments.api.js')
      return (await mod.fetchPayments(params)).data
    }
  }, { staleTime: 1000 * 30 })
}

export const useCreatePayment = () => {
  const qc = useQueryClient()
  return useMutation(async (payload) => {
    if (USE_MOCK) {
      const mod = await import('./payments.mock.js')
      return (await mod.createPaymentMock(payload)).data
    } else {
      const mod = await import('./payments.api.js')
      return (await mod.createPayment(payload)).data
    }
  }, { onSuccess: () => qc.invalidateQueries(['payments']) })
}

export const useRefundPayment = () => {
  const qc = useQueryClient()
  return useMutation(async ({ id, payload }) => {
    if (USE_MOCK) {
      const mod = await import('./payments.mock.js')
      return (await mod.refundPaymentMock(id, payload)).data
    } else {
      const mod = await import('./payments.api.js')
      return (await mod.refundPayment(id, payload)).data
    }
  }, { onSuccess: () => qc.invalidateQueries(['payments', 'payment']) })
}
