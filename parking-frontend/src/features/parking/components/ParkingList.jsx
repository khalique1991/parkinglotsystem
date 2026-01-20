import { useParkingLots, useDeleteParkingLot } from '../hooks/useParking'
import { useNavigate } from 'react-router-dom'

export default function ParkingList() {
  const { data, isLoading } = useParkingLots()
  const delMut = useDeleteParkingLot()
  const nav = useNavigate()

  if (isLoading)
    return (
      <div className="text-center py-10 text-lg text-gray-500">Loading...</div>
    )

  return (
    <div className="p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-blue-700">Parking Lots</h2>
        <button
          onClick={() => nav('/parking/create')}
          className="bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-blue-800 transition"
        >
          + Add Parking Lot
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="border p-3 text-left font-semibold text-gray-700">
                Name
              </th>
              <th className="border p-3 text-left font-semibold text-gray-700">
                Capacity
              </th>
              <th className="border p-3 text-left font-semibold text-gray-700">
                Status
              </th>
              <th className="border p-3 text-center font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((lot) => (
              <tr key={lot.id} className="hover:bg-blue-50 transition">
                <td className="border p-3">{lot.name}</td>
                <td className="border p-3">{lot.capacity}</td>
                <td className="border p-3">{lot.status}</td>
                <td className="border p-3 text-center flex gap-2 justify-center">
                  <button
                    onClick={() => nav(`/parking/${lot.id}`)}
                    className="px-4 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 font-medium transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => delMut.mutate(lot.id)}
                    className="px-4 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 font-medium transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
