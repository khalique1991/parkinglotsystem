import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export const getVehicles = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/vehicles`)
  return data
}

export const getVehicle = async (id) => {
  const { data } = await axios.get(`${API_BASE_URL}/vehicles/${id}`)
  return data
}

export const createVehicle = async (payload) => {
  const { data } = await axios.post(`${API_BASE_URL}/vehicles`, payload)
  return data
}

export const updateVehicle = async ({ id, payload }) => {
  const { data } = await axios.put(`${API_BASE_URL}/vehicles/${id}`, payload)
  return data
}

export const deleteVehicle = async (id) => {
  const { data } = await axios.delete(`${API_BASE_URL}/vehicles/${id}`)
  return data
}
