import api from './index'


export const login = (payload) => api.post('/auth/login', payload)
export const me = () => api.get('/user/me')