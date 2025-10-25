// real API wrapper - uses global axios instance (src/api/index.js)
import api from '../../api/index'

export const fetchPayments = (params) => api.get('/payment', { params })
export const fetchPayment = (id) => api.get(`/payment/${id}`)
export const createPayment = (payload) => api.post('/payment/charge', payload)
export const refundPayment = (id, payload) => api.post(`/payment/${id}/refund`, payload)
