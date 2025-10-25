import { useParams, useNavigate } from 'react-router-dom'
import { useVehicle, useUpdateVehicle } from './useVehicles'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

export default function VehicleDetail() {
  const { id } = useParams()
  const { data: vehicle, isLoading } = useVehicle(id)
  const updateMut = useUpdateVehicle()
  const { register, handleSubmit, reset } = useForm()
  const nav = useNavigate()

  useEffect(() => {
    if (vehicle) reset(vehicle)
  }, [vehicle, reset])

  if (isLoading) return <div>Loading...</div>
  if (!vehicle) return <div>Vehicle not found</div>

  const onSubmit = async (payload) => {
    try {
      await updateMut.mutateAsync({ id, payload })
      alert('Vehicle updated successfully!')
      nav('/vehicles')
    } catch {
      alert('Failed to update vehicle.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow rounded max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4">Edit Vehicle</h2>

      <label className="block mb-3">
        Plate Number
        <input {...register('plateNumber')} className="border p-2 rounded w-full" />
      </label>

      <label className="block mb-3">
        Model
        <input {...register('model')} className="border p-2 rounded w-full" />
      </label>

      <label className="block mb-3">
        Owner Name
        <input {...register('ownerName')} className="border p-2 rounded w-full" />
      </label>

      <div className="flex gap-2 mt-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>
        <button
          type="button"
          onClick={() => nav('/vehicles')}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    </form>
  )
}
