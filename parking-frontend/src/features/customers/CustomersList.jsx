/*
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
 */

import React, { useState, useMemo } from "react";
import { useCustomers, useDeleteCustomer } from "./useCustomer";
import CreateCustomerForm from "./CreateCustomerForm";
import CustomerDetailModal from "./CustomerDetailModal";

export default function CustomerList() {
  const { data: customers = [], isLoading } = useCustomers();
  const { mutate: deleteCustomer } = useDeleteCustomer();

  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "firstName", direction: "asc" });

  const perPage = 5;

  // ✅ Sorting logic
  const sortedCustomers = useMemo(() => {
    const sorted = [...customers].sort((a, b) => {
      if (!sortConfig.key) return 0;
      const aValue = (a[sortConfig.key] || "").toString().toLowerCase();
      const bValue = (b[sortConfig.key] || "").toString().toLowerCase();
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [customers, sortConfig]);

  // ✅ Search filter
  const filtered = useMemo(() => {
    return sortedCustomers.filter(
      (c) =>
        (`${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phoneNumber.toLowerCase().includes(search.toLowerCase()))
    );
  }, [sortedCustomers, search]);

  // ✅ Pagination
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  // ✅ Handle sort click
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  // ✅ Export CSV
  const exportCSV = () => {
    const csvHeader = ["First Name,Last Name,Email,Phone"];
    const csvRows = filtered.map(
      (c) => `${c.firstName},${c.lastName},${c.email},${c.phoneNumber}`
    );
    const blob = new Blob([csvHeader.concat(csvRows).join("\n")], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `customers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  if (isLoading)
    return <p className="text-center mt-10">Loading customers...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Customer Management
        </h1>

        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="🔍 Search name, email, phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg p-2 w-full md:w-64 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <button
            onClick={exportCSV}
            className="px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
          >
            ⬇ Export CSV
          </button>
        </div>
      </div>

      {/* Add Customer Form */}
      <div className="mb-4">
        <CreateCustomerForm onCreated={() => setPage(1)} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              {["firstName", "lastName", "email", "phoneNumber"].map((key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="p-3 text-left cursor-pointer hover:bg-gray-200 select-none"
                >
                  {key === "firstName" ? "First Name" :
                   key === "lastName" ? "Last Name" :
                   key === "phoneNumber" ? "Phone" : "Email"}
                  {sortConfig.key === key && (
                    <span className="ml-1 text-gray-500">
                      {sortConfig.direction === "asc" ? "↑" : "↓"}
                    </span>
                  )}
                </th>
              ))}
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((c) => (
                <tr
                  key={c.customerId}
                  className="border-t hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="p-3">{c.firstName}</td>
                  <td className="p-3">{c.lastName}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.phoneNumber}</td>
                  <td className="p-3 space-x-3">
                    <button
                      onClick={() => setSelected(c)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View / Edit
                    </button>
                    <button
                      onClick={() => deleteCustomer(c.customerId)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500 italic">
                  No customers found
                </td>
              </tr>
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
          <span className="text-gray-700 text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded border bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <CustomerDetailModal
          customer={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
