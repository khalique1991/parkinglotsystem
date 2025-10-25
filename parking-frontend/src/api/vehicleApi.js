import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_URL

export const getVehicles = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/vehicles`)
  return data
}

export const getVehicle = async (id) => {
  const { data } = await axios.get(`${API_BASE_URL}/vehicles/${id}`)
  return data
}

export const createVehicle = async (vehicle) => {
  const { data } = await axios.post(`${API_BASE_URL}/vehicles`, vehicle)
  return data
}

export const updateVehicle = async (id, vehicle) => {
  const { data } = await axios.put(`${API_BASE_URL}/vehicles/${id}`, vehicle)
  return data
}
