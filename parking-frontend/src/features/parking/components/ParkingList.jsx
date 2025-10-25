import { useParkingLots, useDeleteParkingLot } from '../hooks/useParking'
import { useNavigate } from 'react-router-dom'

export default function ParkingList() {
  const { data, isLoading } = useParkingLots()
  const delMut = useDeleteParkingLot()
  const nav = useNavigate()

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Parking Lots</h2>
        <button
          onClick={() => nav('/parking/create')}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          + Add Parking Lot
        </button>
      </div>

      <table className="w-full border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-left">Capacity</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((lot) => (
            <tr key={lot.id} className="hover:bg-gray-50">
              <td className="border p-2">{lot.name}</td>
              <td className="border p-2">{lot.capacity}</td>
              <td className="border p-2">{lot.status}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => nav(`/parking/${lot.id}`)}
                  className="text-blue-600 mr-3"
                >
                  Edit
                </button>
                <button
                  onClick={() => delMut.mutate(lot.id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
