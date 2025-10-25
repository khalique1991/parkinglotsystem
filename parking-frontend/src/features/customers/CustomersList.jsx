import React from "react";
import { useCustomers, useDeleteCustomer } from "./useCustomer.js";

const statusColors = {
  Active: "bg-green-100 text-green-800",
  Inactive: "bg-red-100 text-red-800",
};

export default function CustomersList() {
  const { data, isLoading } = useCustomers();
  const deleteCustomer = useDeleteCustomer();

  if (isLoading) return <p>Loading customers...</p>;

  const customers = data?.data || [];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Customers</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="px-4 py-2">{customer.id}</td>
                <td className="px-4 py-2">{customer.name}</td>
                <td className="px-4 py-2">{customer.email}</td>
                <td className="px-4 py-2">{customer.phone}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-sm ${statusColors[customer.status]}`}>
                    {customer.status}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">Edit</button>
                  <button
                    onClick={() => deleteCustomer.mutate(customer.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
