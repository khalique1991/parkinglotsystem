import React from "react";
import { useParkings } from "./useParking.js";

export default function ParkingList() {
  const { data, isLoading, isError } = useParkings();

  if (isLoading) return <p>Loading parking lots...</p>;
  if (isError) return <p className="text-red-500">Failed to load parking lots.</p>;

  const parkings = data?.data || [];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Parking Lots</h1>
      {parkings.map((lot) => (
        <div key={lot.id} className="bg-white shadow p-4 rounded mb-2">
          <h2 className="font-semibold">{lot.name}</h2>
          <p>Capacity: {lot.capacity}</p>
          <p>Occupied: {lot.occupied}</p>
        </div>
      ))}
    </div>
  );
}
