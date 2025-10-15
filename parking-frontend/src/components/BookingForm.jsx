import { useState } from "react";
import { bookParkingSpot } from "../api/api";

export default function BookingForm({ userId }) {
  const [spotId, setSpotId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBook = async () => {
    if (!spotId) return;
    setLoading(true);
    try {
      await bookParkingSpot(spotId, userId);
      alert("Booked successfully!");
      setSpotId("");
    } catch (err) {
      alert("Booking failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <input
        type="text"
        placeholder="Spot ID"
        value={spotId}
        onChange={(e) => setSpotId(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleBook}
        disabled={loading || !spotId}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:opacity-50"
      >
        {loading ? "Booking..." : "Book Spot"}
      </button>
    </div>
  );
}
