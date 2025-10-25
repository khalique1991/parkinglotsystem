/*
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
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <section>
        <h2 className="font-semibold">Users ({users.length})</h2>
        <ul className="list-disc ml-6">
          {users.map(u => <li key={u.id}>{u.name} ({u.role})</li>)}
        </ul>
      </section>

      <section>
        <h2 className="font-semibold">Vehicles ({vehicles.length})</h2>
        <ul className="list-disc ml-6">
          {vehicles.map(v => <li key={v.id}>{v.plate} - {v.type} ({v.owner})</li>)}
        </ul>
      </section>

      <section>
        <h2 className="font-semibold">Parking Sessions ({sessions.length})</h2>
        <ul className="list-disc ml-6">
          {sessions.map(s => (
            <li key={s.id}>
              Vehicle ID: {s.vehicleId}, Status: {s.status}, Start: {s.startTime}, End: {s.endTime || '-'}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-semibold">Payments ({payments.length})</h2>
        <ul className="list-disc ml-6">
          {payments.map(p => (
            <li key={p.id}>
              Session ID: {p.sessionId}, Amount: {p.amount}, Status: {p.status}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
 */
import React from "react";

export default function Dashboard() {
  const usersCount = 12;
  const vehiclesCount = 45;
  const parkingCount = 5;
  const ticketsCount = 8;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-gray-500 uppercase text-sm">Users</h3>
          <p className="text-2xl font-bold">{usersCount}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-gray-500 uppercase text-sm">Vehicles</h3>
          <p className="text-2xl font-bold">{vehiclesCount}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-gray-500 uppercase text-sm">Parking Lots</h3>
          <p className="text-2xl font-bold">{parkingCount}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-gray-500 uppercase text-sm">Tickets</h3>
          <p className="text-2xl font-bold">{ticketsCount}</p>
        </div>
      </div>
    </div>
  );
}
