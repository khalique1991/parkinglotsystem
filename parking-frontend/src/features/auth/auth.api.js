import api from '../../api/client'
export const login = (payload) => api.post('/auth/login', payload)
export const me = () => api.get('/auth/me')
