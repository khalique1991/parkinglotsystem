import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle
} from './vehicles.api.js'

export const useVehicles = () =>
  useQuery({ queryKey: ['vehicles'], queryFn: getVehicles })

export const useVehicle = (id) =>
  useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => getVehicle(id),
    enabled: !!id
  })

export const useCreateVehicle = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createVehicle,
    onSuccess: () => qc.invalidateQueries(['vehicles'])
  })
}

export const useUpdateVehicle = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: updateVehicle,
    onSuccess: () => qc.invalidateQueries(['vehicles'])
  })
}

export const useDeleteVehicle = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => qc.invalidateQueries(['vehicles'])
  })
}
