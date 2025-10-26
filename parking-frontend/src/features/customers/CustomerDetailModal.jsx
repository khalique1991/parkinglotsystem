import React, { useState, useEffect } from "react";
import { useUpdateCustomer } from "./useCustomer";

export default function CustomerDetailModal({ customer, onClose }) {
  const [formData, setFormData] = useState({ ...customer });
  const updateCustomer = useUpdateCustomer();

  useEffect(() => setFormData({ ...customer }), [customer]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCustomer.mutateAsync({ id: customer.customerId, payload: formData });
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-lg"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold mb-4 text-gray-700">✏ Edit Customer</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            type="submit"
            disabled={updateCustomer.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
          >
            {updateCustomer.isPending ? "Updating..." : "Update Customer"}
          </button>

          {updateCustomer.isError && (
            <p className="text-red-500 text-sm mt-1">Error updating customer</p>
          )}
          {updateCustomer.isSuccess && (
            <p className="text-green-600 text-sm mt-1">Customer updated successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
}
