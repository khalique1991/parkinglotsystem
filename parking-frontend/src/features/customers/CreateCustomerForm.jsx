import React, { useState } from "react";
import { useCreateCustomer } from "./useCustomer";

export default function CreateCustomerForm({ onCreated }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  const createCustomer = useCreateCustomer();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCustomer.mutateAsync(formData);
      setFormData({ firstName: "", lastName: "", email: "", phoneNumber: "" });
      onCreated?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">➕ Add New Customer</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />

        <button
          type="submit"
          disabled={createCustomer.isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition"
        >
          {createCustomer.isPending ? "Saving..." : "Add Customer"}
        </button>

        {createCustomer.isError && (
          <p className="text-red-500 text-sm mt-1">Error adding customer</p>
        )}
        {createCustomer.isSuccess && (
          <p className="text-green-600 text-sm mt-1">Customer added successfully!</p>
        )}
      </form>
    </div>
  );
}
