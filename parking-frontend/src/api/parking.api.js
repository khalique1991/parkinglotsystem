import api from './index'


export const getParkingLots = () => api.get('/parking/lots')
export const getParkingLot = (id) => api.get(`/parking/lots/${id}`)
export const bookSpot = (payload) => api.post('/ticket/book', payload)