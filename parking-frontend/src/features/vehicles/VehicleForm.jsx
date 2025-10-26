/*
import { useForm } from 'react-hook-form'
import { useCreateVehicle } from './useVehicles'
import { useNavigate } from 'react-router-dom'

export default function VehicleForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const createMut = useCreateVehicle()
  const nav = useNavigate()

  const onSubmit = async (data) => {
    try {
      await createMut.mutateAsync(data)
      alert('Vehicle created successfully!')
      nav('/vehicles')
    } catch {
      alert('Failed to create vehicle.')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-white shadow rounded max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4">Add Vehicle</h2>

      <label className="block mb-3">
        Plate Number
        <input
          {...register('plateNumber', { required: true })}
          className="border p-2 rounded w-full"
        />
        {errors.plateNumber && <span className="text-red-500">Required</span>}
      </label>

      <label className="block mb-3">
        Model
        <input
          {...register('model', { required: true })}
          className="border p-2 rounded w-full"
        />
      </label>

      <label className="block mb-3">
        Owner Name
        <input
          {...register('ownerName', { required: true })}
          className="border p-2 rounded w-full"
        />
      </label>

      <div className="flex gap-2 mt-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
        <button
          type="button"
          onClick={() => nav('/vehicles')}
          className="bg-gray-200 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
 */
// src/features/vehicles/CreateVehicleForm.jsx
import React, { useState } from "react";
import { useCreateVehicle } from "./useVehicle";

export default function CreateVehicleForm() {
  const { mutate: createVehicle, isPending, isSuccess } = useCreateVehicle();
  const [form, setForm] = useState({ plateNumber: "", type: "", owner: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    createVehicle(form);
    setForm({ plateNumber: "", type: "", owner: "" });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Vehicle</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="plateNumber"
          placeholder="Plate Number"
          value={form.plateNumber}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="type"
          placeholder="Vehicle Type"
          value={form.type}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          name="owner"
          placeholder="Owner"
          value={form.owner}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isPending ? "Adding..." : "Add Vehicle"}
        </button>
      </form>
      {isSuccess && <p className="text-green-600 mt-3">✅ Vehicle added!</p>}
    </div>
  );
}
