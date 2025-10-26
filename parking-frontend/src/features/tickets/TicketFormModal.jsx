// src/features/tickets/TicketFormModal.jsx
import React, { useState, useEffect } from "react";
import { useUpdateTicketStatus, useCreateTicket } from "./useTickets";

export default function TicketFormModal({ ticket, onClose }) {
  const [formData, setFormData] = useState({
    customerId: "",
    vehicleId: "",
    issue: "",
    status: "OPEN",
  });

  const updateTicket = useUpdateTicketStatus();
  const createTicket = useCreateTicket();

  // Populate form when editing
  useEffect(() => {
    if (ticket) {
      setFormData({
        customerId: ticket.customerId ?? "",
        vehicleId: ticket.vehicleId ?? "",
        issue: ticket.issue ?? "",
        status: ticket.status ?? "OPEN",
      });
    } else {
      setFormData({ customerId: "", vehicleId: "", issue: "", status: "OPEN" });
    }
  }, [ticket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (ticket) {
        // Update existing ticket
        await updateTicket.mutateAsync({ id: ticket.id, payload: formData });
      } else {
        // Create new ticket
        await createTicket.mutateAsync(formData);
      }
      onClose();
    } catch (err) {
      console.error("Ticket form error:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          {ticket ? "Edit Ticket" : "New Ticket"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Customer ID
            </label>
            <input
              type="number"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Vehicle ID
            </label>
            <input
              type="number"
              name="vehicleId"
              value={formData.vehicleId}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Issue
            </label>
            <textarea
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              required
              className="mt-1 block w-full border rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="OPEN">OPEN</option>
              <option value="RESOLVED">RESOLVED</option>
              <option value="CANCELLED">CANCELLED</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              {ticket ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
