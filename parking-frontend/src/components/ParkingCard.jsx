import React from 'react'

export default function ParkingCard({ slot, onReserve, onRelease }) {
  const { id, occupied, vehicle } = slot
  return (
    <div className="p-6 border border-gray-200 rounded-xl shadow bg-white flex flex-col gap-2 hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="font-bold text-lg text-blue-700">Slot {id}</h3>
          <p className={`text-sm ${occupied ? 'text-red-600' : 'text-green-600'} font-medium`}>
            {occupied ? `Occupied by ${vehicle}` : 'Available'}
          </p>
        </div>
        <div>
          {occupied ? (
            <button onClick={() => onRelease(id)} className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition font-semibold">Release</button>
          ) : (
            <button onClick={() => onReserve(id)} className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition font-semibold">Reserve</button>
          )}
        </div>
      </div>
    </div>
  )
}
