import api from '../../api/client'
export const fetchNotifications = (params) => api.get('/notification', { params })
export const createNotification = (payload) => api.post('/notification', payload)
