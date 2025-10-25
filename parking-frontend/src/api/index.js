import axios from 'axios'


const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'


const api = axios.create({ baseURL: API_BASE })


api.interceptors.request.use((config) => {
const token = localStorage.getItem('token')
if (token) config.headers.Authorization = `Bearer ${token}`
return config
})


api.interceptors.response.use(
(res) => res,
(err) => {
if (err.response?.status === 401) {
localStorage.removeItem('token')
localStorage.removeItem('user')
window.location.href = '/'
}
return Promise.reject(err)
}
)


export default api


// Export helper to switch between mock and real api