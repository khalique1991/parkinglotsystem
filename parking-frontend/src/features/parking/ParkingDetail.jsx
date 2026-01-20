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

  if (isLoading) return <div className="text-center py-10 text-lg text-gray-500">Loading...</div>
  if (!lot) return <div className="text-center py-10 text-lg text-red-600">Parking lot not found</div>

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
    <form onSubmit={handleSubmit(onSubmit)} className="p-10 bg-white shadow-lg rounded-2xl border border-gray-200 max-w-xl mx-auto mt-12 flex flex-col gap-4">
      <h2 className="text-2xl font-extrabold text-blue-700 mb-4">Edit Parking Lot</h2>

      <label className="block mb-3">
        <span className="block text-gray-700 font-medium mb-1">Name</span>
        <input {...register('name')} className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600" />
      </label>

      <label className="block mb-3">
        <span className="block text-gray-700 font-medium mb-1">Capacity</span>
        <input type="number" {...register('capacity')} className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600" />
      </label>

      <label className="block mb-3">
        <span className="block text-gray-700 font-medium mb-1">Status</span>
        <select {...register('status')} className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600">
          <option value="AVAILABLE">AVAILABLE</option>
          <option value="FULL">FULL</option>
          <option value="CLOSED">CLOSED</option>
        </select>
      </label>

      <div className="flex gap-4 mt-6">
        <button className="bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-green-800 transition">Save</button>
        <button
          type="button"
          onClick={() => nav('/parking')}
          className="bg-gray-200 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition"
        >
          Back
        </button>
      </div>
    </form>
  )
}
