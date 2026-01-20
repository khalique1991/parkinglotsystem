import ParkingList from "../components/ParkingList";
import BookingForm from "../components/BookingForm";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/" />;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col gap-8">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-2">Dashboard</h1>
      <ParkingList />
      <BookingForm userId={user?.id} />
    </div>
  );
}
