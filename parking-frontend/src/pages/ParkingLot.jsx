import { useEffect, useState } from "react";
import { getAvailableSpots } from "../services/parkingService";

function ParkingLot() {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function fetchSpots() {
      try {
        const data = await getAvailableSpots(1); // Lot ID = 1
        setSpots(data);
      } catch (err) {
        console.error("Error fetching spots:", err);
      }
    }
    fetchSpots();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Parking Spots</h2>
      <ul className="grid grid-cols-3 gap-4">
        {spots.map((spot) => (
          <li
            key={spot.id}
            className="border p-4 rounded-lg shadow hover:bg-gray-100"
          >
            <p>Spot: {spot.spotNumber}</p>
            <p>Type: {spot.type}</p>
            <p>Status: {spot.occupied ? "Occupied" : "Available"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ParkingLot;
