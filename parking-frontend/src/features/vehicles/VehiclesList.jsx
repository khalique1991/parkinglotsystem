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
 *//*

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
 */
// src/features/vehicles/VehiclesList.jsx
import React, { useState, useMemo } from "react";
import { useVehicles, useDeleteVehicle } from "./useVehicle";
import VehicleFormModal from "./VehicleFormModal";

export default function VehiclesList({ customerId }) {
  const { data: vehicles = [], isLoading } = useVehicles(customerId);
  const deleteVehicle = useDeleteVehicle();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "plateNumber", direction: "asc" });
  const perPage = 5;

  // Sorting
  const sorted = useMemo(() => {
    const sortedArr = [...vehicles].sort((a, b) => {
      const aVal = a[sortConfig.key]?.toLowerCase() || "";
      const bVal = b[sortConfig.key]?.toLowerCase() || "";
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sortedArr;
  }, [vehicles, sortConfig]);

  // Search
  const filtered = useMemo(() => {
    return sorted.filter(
      (v) =>
        v.plateNumber.toLowerCase().includes(search.toLowerCase()) ||
        v.model.toLowerCase().includes(search.toLowerCase()) ||
        (v.color && v.color.toLowerCase().includes(search.toLowerCase()))
    );
  }, [sorted, search]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      return { key, direction: "asc" };
    });
  };

  if (isLoading) return <p className="text-center mt-10">Loading vehicles...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">Vehicles</h2>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search plate, model, color..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg p-2 w-full md:w-64 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            onClick={() => setSelected({})}
            className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            + Add Vehicle
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            {["plateNumber", "model", "color"].map((key) => (
              <th
                key={key}
                onClick={() => handleSort(key)}
                className="p-3 text-left cursor-pointer hover:bg-gray-200 select-none"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
                {sortConfig.key === key && (
                  <span className="ml-1 text-gray-500">{sortConfig.direction === "asc" ? "↑" : "↓"}</span>
                )}
              </th>
            ))}
            <th className="p-3 text-left">Actions</th>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500 italic">
                  No vehicles found
                </td>
              </tr>
            ) : (
              paginated.map((v) => (
                <tr key={v.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{v.plateNumber}</td>
                  <td className="p-3">{v.model}</td>
                  <td className="p-3">{v.color}</td>
                  <td className="p-3 space-x-2">
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => setSelected(v)}>Edit</button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => deleteVehicle.mutate({ id: v.id, customerId })}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            ← Prev
          </button>
          <span className="text-gray-700 text-sm">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      )}

      {selected && (
        <VehicleFormModal
          vehicle={selected}
          customerId={customerId}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
