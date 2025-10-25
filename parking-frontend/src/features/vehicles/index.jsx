import ProtectedRoute from "../../components/ProtectedRoute";
import VehiclesList from "./VehiclesList";
import VehicleForm from "./VehicleForm";
import VehicleDetail from "./VehicleDetail";

export const vehicleRoutes = [
  {
    path: "/vehicles",
    element: (
      <ProtectedRoute roles={["ADMIN", "OPERATOR"]}>
        <VehiclesList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/vehicles/create",
    element: (
      <ProtectedRoute roles={["ADMIN"]}>
        <VehicleForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/vehicles/:id",
    element: (
      <ProtectedRoute roles={["ADMIN", "OPERATOR"]}>
        <VehicleDetail />
      </ProtectedRoute>
    ),
  },
];

// 👇 ADD THIS DEFAULT EXPORT
export default function Vehicles() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Vehicles Page</h1>
      <p>Welcome to the Vehicles management page.</p>
    </div>
  );
}
