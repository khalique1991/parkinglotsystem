import { useEffect, useState } from "react";
import { getParkingLots } from "../api/api";

export default function ParkingList() {
  const [lots, setLots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getParkingLots();
        setLots(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading parking lots...</p>;

  return (
    <ul className="space-y-1">
      {lots.map((lot) => (
        <li key={lot.id} className="border p-2 rounded">
          {lot.name} - {lot.spotsAvailable} spots
        </li>
      ))}
    </ul>
  );
}
