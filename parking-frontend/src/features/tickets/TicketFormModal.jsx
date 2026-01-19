import React, { useState, useEffect } from "react";
import { Loader2, X } from "lucide-react";
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
  const isLoading = updateTicket.isPending || createTicket.isPending;

  // Populate when editing
  useEffect(() => {
    if (ticket) {
      setFormData({
        customerId: ticket.customerId ?? "",
        vehicleId: ticket.vehicleId ?? "",
        issue: ticket.issue ?? "",
        status: ticket.status ?? "OPEN",
      });
    } else {
      setFormData({
        customerId: "",
        vehicleId: "",
        issue: "",
        status: "OPEN",
      });
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
        await updateTicket.mutateAsync({ id: ticket.id, payload: formData });
      } else {
        await createTicket.mutateAsync(formData);
      }
      onClose();
    } catch (err) {
      console.error("❌ Ticket form error:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
          {ticket ? "Edit Ticket" : "Create New Ticket"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Customer ID */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Customer ID
            </label>
            <input
              type="number"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Vehicle ID */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Vehicle ID
            </label>
            <input
              type="number"
              name="vehicleId"
              value={formData.vehicleId}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Issue */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Issue
            </label>
            <textarea
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Describe the issue..."
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white resize-none"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:text-white"
            >
              <option value="OPEN">OPEN</option>
              <option value="RESOLVED">RESOLVED</option>
              <option value="CANCELLED">CANCELLED</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-70 transition"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} /> Saving...
                </>
              ) : ticket ? (
                "Update"
              ) : (
                "Create"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
