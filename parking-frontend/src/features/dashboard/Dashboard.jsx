import React from 'react';
import { useUsers } from '../users/useUser';
import { useVehicles } from '../vehicles/useVehicle';
import { useSessions } from '../sessions/useSession';
import { usePayments } from '../payments/usePayment';

export default function Dashboard() {
  const { data: users, isLoading: loadingUsers } = useUsers();
  const { data: vehicles, isLoading: loadingVehicles } = useVehicles();
  const { data: sessions, isLoading: loadingSessions } = useSessions();
  const { data: payments, isLoading: loadingPayments } = usePayments();

  if (loadingUsers || loadingVehicles || loadingSessions || loadingPayments) {
    return <div className="p-4">Loading Dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-gray-500 uppercase text-sm">Users</h3>
          <p className="text-2xl font-bold">{users?.length ?? 0}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-gray-500 uppercase text-sm">Vehicles</h3>
          <p className="text-2xl font-bold">{vehicles?.length ?? 0}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-gray-500 uppercase text-sm">Parking Sessions</h3>
          <p className="text-2xl font-bold">{sessions?.length ?? 0}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-gray-500 uppercase text-sm">Payments</h3>
          <p className="text-2xl font-bold">{payments?.length ?? 0}</p>
        </div>
      </div>
    </div>
  );
}
