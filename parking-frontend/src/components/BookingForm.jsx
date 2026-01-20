import { useState } from "react";
import { bookParkingSpot } from "../api/api";

export default function BookingForm({ userId }) {
  const [spotId, setSpotId] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleBook = async () => {
    if (!spotId) return;
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await bookParkingSpot(spotId, userId);
      setSuccess(true);
      setSpotId("");
    } catch (err) {
      setError("Booking failed! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow p-6 flex flex-col gap-4 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        Book a Parking Spot
      </h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Spot ID"
          value={spotId}
          onChange={(e) => setSpotId(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={handleBook}
          disabled={loading || !spotId}
          className="bg-blue-700 text-white px-4 py-2 rounded font-semibold shadow hover:bg-blue-800 transition disabled:opacity-50"
        >
          {loading ? "Booking..." : "Book Spot"}
        </button>
      </div>
      {success && (
        <div className="text-green-600 font-medium">Booked successfully!</div>
      )}
      {error && <div className="text-red-600 font-medium">{error}</div>}
    </div>
  );
}
