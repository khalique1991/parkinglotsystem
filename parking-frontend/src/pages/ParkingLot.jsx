import React, { useEffect, useState } from 'react'
import ParkingCard from '../components/ParkingCard'
import { getSlots, reserveSlot, releaseSlot } from '../services/parkingService'

export default function ParkingLot() {
  const [slots, setSlots] = useState([])

  useEffect(() => {
    fetchSlots()
  }, [])

  async function fetchSlots() {
    try {
      const data = await getSlots()
      setSlots(data)
    } catch (err) {
      console.error(err)
      alert('Failed to load slots')
    }
  }

  async function handleReserve(id) {
    try {
      await reserveSlot(id)
      fetchSlots()
    } catch (err) {
      alert('Failed to reserve: ' + err.message)
    }
  }

  async function handleRelease(id) {
    try {
      await releaseSlot(id)
      fetchSlots()
    } catch (err) {
      alert('Failed to release: ' + err.message)
    }
  }

  return (
    <div className="max-w-5xl mx-auto mt-12 p-8 bg-white border border-gray-200 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-6">Parking Lot</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {slots.map(s => (
          <ParkingCard key={s.id} slot={s} onReserve={handleReserve} onRelease={handleRelease} />
        ))}
      </div>
    </div>
  )
}
