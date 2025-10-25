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
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow rounded max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4">Add Parking Lot</h2>

      <label className="block mb-3">
        Name
        <input
          {...register('name', { required: true })}
          className="border p-2 rounded w-full"
        />
        {errors.name && <span className="text-red-500">Name is required</span>}
      </label>

      <label className="block mb-3">
        Capacity
        <input
          type="number"
          {...register('capacity', { required: true })}
          className="border p-2 rounded w-full"
        />
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
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
        <button
          type="button"
          onClick={() => nav('/parking')}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
