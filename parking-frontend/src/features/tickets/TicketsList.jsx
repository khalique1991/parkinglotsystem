// src/features/tickets/TicketsList.jsx
import React, { useState, useMemo } from "react";
import {
  useTickets,
  useDeleteTicket,
  useCancelTicket,
  useCompleteTicket,
} from "./useTickets";
import TicketFormModal from "./TicketFormModal";

export default function TicketsList() {
  const { data: ticketsRaw = [], isLoading } = useTickets();
  const { mutate: deleteTicket } = useDeleteTicket();
  const { mutate: cancelTicket } = useCancelTicket();
  const { mutate: completeTicket } = useCompleteTicket();

  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });

  const perPage = 5;

  // ✅ Ensure tickets is always an array
  const tickets = Array.isArray(ticketsRaw) ? ticketsRaw : [];

  // ✅ Sorting
  const sorted = useMemo(() => {
    return [...tickets].sort((a, b) => {
      const aVal = (a[sortConfig.key] ?? "").toString().toLowerCase();
      const bVal = (b[sortConfig.key] ?? "").toString().toLowerCase();
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [tickets, sortConfig]);

  // ✅ Search filter
  const filtered = useMemo(() => {
    return sorted.filter(
      (t) =>
        (t.customerId?.toString() || "").includes(search.toLowerCase()) ||
        (t.vehicleId?.toString() || "").includes(search.toLowerCase()) ||
        (t.status?.toLowerCase() || "").includes(search.toLowerCase()) ||
        (t.issue?.toLowerCase() || "").includes(search.toLowerCase())
    );
  }, [sorted, search]);

  // ✅ Pagination
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  // ✅ Handle sorting
  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  if (isLoading) return <p className="text-center mt-10">Loading tickets...</p>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-800">Ticket Management</h1>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="🔍 Search customer, vehicle, issue, status..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border rounded-lg p-2 w-full md:w-64 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              {["id", "customerId", "vehicleId", "issue", "status"].map((key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="p-3 text-left cursor-pointer hover:bg-gray-200 select-none"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
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
              paginated.map((t) => (
                <tr
                  key={t.id}
                  className="border-t hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="p-3">{t.id}</td>
                  <td className="p-3">{t.customerId ?? "-"}</td>
                  <td className="p-3">{t.vehicleId ?? "-"}</td>
                  <td className="p-3">{t.issue ?? "-"}</td>
                  <td className="p-3">{t.status ?? "-"}</td>
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => setSelected(t)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View / Edit
                    </button>
                    <button
                      onClick={() => cancelTicket(t.id)}
                      className="text-yellow-600 hover:text-yellow-800 font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => completeTicket(t.id)}
                      className="text-green-600 hover:text-green-800 font-medium"
                    >
                      Complete
                    </button>
                    <button
                      onClick={() => deleteTicket(t.id)}
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500 italic">
                  No tickets found
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

      {/* Modal */}
      {selected && (
        <TicketFormModal ticket={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
