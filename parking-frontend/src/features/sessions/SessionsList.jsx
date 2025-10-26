/*
// src/features/sessions/SessionsList.jsx
import { useEffect, useState } from 'react';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export default function SessionsList() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (USE_MOCK) {
        const m = await import('./sessions.mock.js');
        const data = await m.fetchSessionsMock();
        if (mounted) setSessions(data.data);
      } else {
        const m = await import('./sessions.api.js');
        const data = await m.fetchSessions();
        if (mounted) setSessions(data.data);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sessions</h2>
      <ul>
        {sessions.map(s => (
          <li key={s.id}>{s.user} — {s.loginAt}</li>
        ))}
      </ul>
    </div>
  );
}
 *//*



import React, { useState } from 'react';
import { useSessions, useCreateSession, useUpdateSession, useDeleteSession } from './useSession';
import { useVehicles } from '../vehicles/useVehicle';

export default function SessionsList() {
  const { data: sessions, isLoading } = useSessions();
  const { data: vehicles } = useVehicles();

  const createSession = useCreateSession();
  const updateSession = useUpdateSession();
  const deleteSession = useDeleteSession();

  const [vehicleId, setVehicleId] = useState('');

  if (isLoading) return <div>Loading Sessions...</div>;

  const handleStartSession = () => {
    if (!vehicleId) return;
    createSession.mutate({ vehicleId: parseInt(vehicleId), startTime: new Date().toISOString(), endTime: null, status: 'ACTIVE' });
    setVehicleId('');
  };

  const handleEndSession = (id) => {
    updateSession.mutate({ id, payload: { endTime: new Date().toISOString(), status: 'COMPLETED' } });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Parking Sessions</h1>

      <div className="mb-4 space-x-2">
        <select value={vehicleId} onChange={e => setVehicleId(e.target.value)}>
          <option value="">Select Vehicle</option>
          {vehicles?.map(v => <option key={v.id} value={v.id}>{v.plate} ({v.owner})</option>)}
        </select>
        <button onClick={handleStartSession} className="bg-blue-500 text-white px-2 py-1 rounded">Start Session</button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th>Vehicle</th><th>Status</th><th>Start Time</th><th>End Time</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(s => {
            const vehicle = vehicles?.find(v => v.id === s.vehicleId);
            return (
              <tr key={s.id} className="border-b">
                <td>{vehicle?.plate} ({vehicle?.owner})</td>
                <td>{s.status}</td>
                <td>{s.startTime}</td>
                <td>{s.endTime || '-'}</td>
                <td className="space-x-2">
                  {s.status === 'ACTIVE' && (
                    <button onClick={() => handleEndSession(s.id)} className="bg-green-500 text-white px-2 py-1 rounded">End</button>
                  )}
                  <button onClick={() => deleteSession.mutate(s.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
 */
import React, { useState } from 'react';
import { useSessions, useCreateSession, useUpdateSession, useDeleteSession } from './useSession';
import { useVehicles } from "../vehicles/useVehicle";

export default function SessionsList() {
  const { data: sessions, isLoading } = useSessions();
  const { data: vehicles } = useVehicles();
  const createSession = useCreateSession();
  const updateSession = useUpdateSession();
  const deleteSession = useDeleteSession();

  const [vehicleId, setVehicleId] = useState('');

  if (isLoading) return <div>Loading Sessions...</div>;

  const handleStartSession = () => {
    if (!vehicleId) return;
    createSession.mutate({ vehicleId: parseInt(vehicleId), startTime: new Date().toISOString(), status: 'ACTIVE', endTime: null });
    setVehicleId('');
  };

  const handleEndSession = (id) => updateSession.mutate({ id, payload: { endTime: new Date().toISOString(), status: 'COMPLETED' } });
  const handleDelete = (id) => deleteSession.mutate(id);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Sessions Admin</h1>

      <div className="mb-4 space-x-2">
        <select value={vehicleId} onChange={e => setVehicleId(e.target.value)}>
          <option value="">Select Vehicle</option>
          {vehicles?.map(v => <option key={v.id} value={v.id}>{v.plate} ({v.owner})</option>)}
        </select>
        <button onClick={handleStartSession} className="bg-blue-500 text-white px-2 py-1 rounded">Start Session</button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th>Vehicle</th><th>Status</th><th>Start</th><th>End</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions?.map(s => {
            const vehicle = vehicles?.find(v => v.id === s.vehicleId);
            return (
              <tr key={s.id} className="border-b">
                <td>{vehicle?.plate} ({vehicle?.owner})</td>
                <td>{s.status}</td>
                <td>{s.startTime}</td>
                <td>{s.endTime || '-'}</td>
                <td className="space-x-2">
                  {s.status === 'ACTIVE' && <button onClick={() => handleEndSession(s.id)} className="bg-green-500 text-white px-2 py-1 rounded">End</button>}
                  <button onClick={() => handleDelete(s.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
