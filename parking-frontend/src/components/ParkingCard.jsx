import React from 'react'

export default function ParkingCard({ slot, onReserve, onRelease }) {
  const { id, occupied, vehicle } = slot
  return (
    <div className="p-4 border rounded shadow-sm bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">Slot {id}</h3>
          <p className="text-sm text-gray-500">{occupied ? `Occupied by ${vehicle}` : 'Available'}</p>
        </div>
        <div>
          {occupied ? (
            <button onClick={() => onRelease(id)} className="px-3 py-1 bg-red-500 text-white rounded">Release</button>
          ) : (
            <button onClick={() => onReserve(id)} className="px-3 py-1 bg-green-500 text-white rounded">Reserve</button>
          )}
        </div>
      </div>
    </div>
  )
}
