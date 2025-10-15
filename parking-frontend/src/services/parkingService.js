import api from './api'

export async function getSlots() {
  const res = await api.get('/parking/slots')
  return res.data
}

export async function reserveSlot(id) {
  const res = await api.post(`/parking/slots/${id}/reserve`)
  return res.data
}

export async function releaseSlot(id) {
  const res = await api.post(`/parking/slots/${id}/release`)
  return res.data
}
