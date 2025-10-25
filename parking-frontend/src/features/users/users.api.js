import api from '../../api/client'
export const fetchUsers = (params) => api.get('/user', { params })
export const fetchUser = (id) => api.get(`/user/${id}`)
export const createUser = (payload) => api.post('/user', payload)
export const updateUser = (id, payload) => api.put(`/user/${id}`, payload)
export const deleteUser = (id) => api.delete(`/user/${id}`)
