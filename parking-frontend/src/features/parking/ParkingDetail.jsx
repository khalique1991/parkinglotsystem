import { useParams, useNavigate } from 'react-router-dom'
import { useParkingLot, useUpdateParkingLot } from '../hooks/useParking'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

export default function ParkingDetail() {
  const { id } = useParams()
  const { data: lot, isLoading } = useParkingLot(id)
  const updateMut = useUpdateParkingLot()
  const { register, handleSubmit, reset } = useForm()
  const nav = useNavigate()

  useEffect(() => {
    if (lot) reset(lot)
  }, [lot, reset])

  if (isLoading) return <div>Loading...</div>
  if (!lot) return <div>Parking lot not found</div>

  const onSubmit = async (payload) => {
    try {
      await updateMut.mutateAsync({ id, payload })
      alert('Parking lot updated successfully!')
      nav('/parking')
    } catch {
      alert('Failed to update parking lot.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow rounded max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4">Edit Parking Lot</h2>

      <label className="block mb-3">
        Name
        <input {...register('name')} className="border p-2 rounded w-full" />
      </label>

      <label className="block mb-3">
        Capacity
        <input type="number" {...register('capacity')} className="border p-2 rounded w-full" />
      </label>

      <label className="block mb-3">
        Status
        <select {...register('status')} className="border p-2 rounded w-full">
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="FULL">FULL</option>
          <option value="CLOSED">CLOSED</option>
        </select>
      </label>

      <div className="flex gap-2 mt-4">
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>
        <button
          type="button"
          onClick={() => nav('/parking')}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    </form>
  )
}
