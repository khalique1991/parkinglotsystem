import { useForm } from 'react-hook-form'
import { useCreateParkingLot } from '../hooks/useParking'
import { useNavigate } from 'react-router-dom'

export default function ParkingForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const createMut = useCreateParkingLot()
  const nav = useNavigate()

  const onSubmit = async (data) => {
    try {
      await createMut.mutateAsync(data)
      alert('Parking lot created successfully!')
      nav('/parking')
    } catch {
      alert('Failed to create parking lot.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-10 bg-white shadow-lg rounded-2xl border border-gray-200 max-w-xl mx-auto mt-12 flex flex-col gap-4">
      <h2 className="text-2xl font-extrabold text-blue-700 mb-4">Add Parking Lot</h2>

      <label className="block mb-3">
        <span className="block text-gray-700 font-medium mb-1">Name</span>
        <input
          {...register('name', { required: true })}
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
      </label>

      <label className="block mb-3">
        <span className="block text-gray-700 font-medium mb-1">Capacity</span>
        <input
          type="number"
          {...register('capacity', { required: true })}
          className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        {errors.capacity && <span className="text-red-500 text-sm">Capacity is required</span>}
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
        <button className="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-blue-800 transition">Save</button>
        <button
          type="button"
          onClick={() => nav('/parking')}
          className="bg-gray-200 px-6 py-2 rounded-lg font-semibold shadow hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
