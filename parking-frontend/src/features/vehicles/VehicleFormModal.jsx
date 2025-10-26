// src/features/vehicles/VehicleFormModal.jsx
import React, { useState, useEffect } from "react";
import { useCreateVehicle, useUpdateVehicle } from "./useVehicle";

export default function VehicleFormModal({ vehicle, customerId, onClose }) {
  const isEdit = !!vehicle?.id;
  const [formData, setFormData] = useState({ plateNumber: "", model: "", color: "" });

  const createVehicle = useCreateVehicle();
  const updateVehicle = useUpdateVehicle();

  useEffect(() => {
    if (vehicle) {
      setFormData({
        plateNumber: vehicle.plateNumber || "",
        model: vehicle.model || "",
        color: vehicle.color || "",
      });
    }
  }, [vehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData, customerId };
    try {
      if (isEdit) await updateVehicle.mutateAsync({ id: vehicle.id, payload });
      else await createVehicle.mutateAsync(payload);
      onClose();
    } catch (err) {
      console.error("Vehicle form error:", err);
      alert("Failed to save vehicle.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">{isEdit ? "Edit Vehicle" : "Add Vehicle"}</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {["plateNumber", "model", "color"].map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium mb-1">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>
          ))}
          <div className="flex justify-end gap-3 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
