// real API wrapper (uses axios instance src/api/index.js)
import api from '../../api/index'

export const fetchTickets = (params) => api.get('/ticket', { params })
export const fetchTicket = (id) => api.get(`/ticket/${id}`)
export const createTicket = (payload) => api.post('/ticket/book', payload)
export const updateTicket = (id, payload) => api.put(`/ticket/${id}`, payload)
export const completeTicket = (id) => api.post(`/ticket/${id}/complete`)
export const cancelTicket = (id) => api.post(`/ticket/${id}/cancel`)
