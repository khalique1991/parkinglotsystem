/*
import React, { useState } from 'react';
import { useVehicles, useCreateVehicle, useDeleteVehicle } from './useVehicle';

export default function VehiclesList() {
  const { data: vehicles, isLoading } = useVehicles();
  const createVehicle = useCreateVehicle();
  const deleteVehicle = useDeleteVehicle();

  const [plate, setPlate] = useState('');
  const [type, setType] = useState('Car');
  const [owner, setOwner] = useState('');

  if (isLoading) return <div>Loading Vehicles...</div>;

  const handleCreate = () => {
    if (!plate || !owner) return;
    createVehicle.mutate({ plate, type, owner });
    setPlate(''); setOwner('');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Vehicles</h1>

      <div className="mb-4 space-x-2">
        <input placeholder="Plate" value={plate} onChange={e => setPlate(e.target.value)} />
        <input placeholder="Owner" value={owner} onChange={e => setOwner(e.target.value)} />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="Car">Car</option>
          <option value="Motorcycle">Motorcycle</option>
        </select>
        <button onClick={handleCreate} className="bg-blue-500 text-white px-2 py-1 rounded">Add Vehicle</button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th>Plate</th><th>Type</th><th>Owner</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(v => (
            <tr key={v.id} className="border-b">
              <td>{v.plate}</td>
              <td>{v.type}</td>
              <td>{v.owner}</td>
              <td>
                <button onClick={() => deleteVehicle.mutate(v.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 */
import React, { useState } from 'react';
import { useVehicles, useCreateVehicle, useDeleteVehicle } from './useVehicle';

export default function VehiclesList() {
  const { data: vehicles, isLoading } = useVehicles();
  const createVehicle = useCreateVehicle();
  const deleteVehicle = useDeleteVehicle();

  const [plate, setPlate] = useState('');
  const [type, setType] = useState('Car');
  const [owner, setOwner] = useState('');

  if (isLoading) return <div>Loading Vehicles...</div>;

  const handleCreate = () => {
    if (!plate || !owner) return;
    createVehicle.mutate({ plate, type, owner });
    setPlate(''); setOwner('');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Vehicles Admin</h1>

      <div className="mb-4 space-x-2">
        <input placeholder="Plate" value={plate} onChange={e => setPlate(e.target.value)} />
        <input placeholder="Owner" value={owner} onChange={e => setOwner(e.target.value)} />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="Car">Car</option>
          <option value="Motorcycle">Motorcycle</option>
        </select>
        <button onClick={handleCreate} className="bg-blue-500 text-white px-2 py-1 rounded">Add Vehicle</button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th>Plate</th><th>Type</th><th>Owner</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles?.map(v => (
            <tr key={v.id} className="border-b">
              <td>{v.plate}</td>
              <td>{v.type}</td>
              <td>{v.owner}</td>
              <td>
                <button onClick={() => deleteVehicle.mutate(v.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
