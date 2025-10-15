import ParkingList from "../components/ParkingList";
import BookingForm from "../components/BookingForm";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/" />;

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <ParkingList />
      <BookingForm userId={user?.id} />
    </div>
  );
}
