/*
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTicketsMock, cancelTicketMock, completeTicketMock } from './ticketsMock';

export default function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const res = await fetchTicketsMock();
    setTickets(res.data);
  };

  const handleComplete = async (id) => {
    await completeTicketMock(id);
    fetchTickets();
  };

  const handleCancel = async (id) => {
    await cancelTicketMock(id);
    fetchTickets();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Tickets</h1>
        <Link to="/tickets/create" className="bg-blue-600 text-white px-4 py-2 rounded">Create Ticket</Link>
      </div>

      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Vehicle</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Start</th>
            <th className="border px-2 py-1">End</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t.id}>
              <td className="border px-2 py-1">{t.id}</td>
              <td className="border px-2 py-1">{t.vehicle}</td>
              <td className="border px-2 py-1">{t.status}</td>
              <td className="border px-2 py-1">{new Date(t.startAt).toLocaleString()}</td>
              <td className="border px-2 py-1">{t.endAt ? new Date(t.endAt).toLocaleString() : '-'}</td>
              <td className="border px-2 py-1 space-x-2">
                <button onClick={() => handleComplete(t.id)} className="text-green-600">Complete</button>
                <button onClick={() => handleCancel(t.id)} className="text-red-600">Cancel</button>
                <Link to={`/tickets/${t.id}`} className="text-blue-600">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 */
import React from "react";
import { useTickets, useDeleteTicket, useCancelTicket, useCompleteTicket } from "./useTicket.js";

export default function TicketsList() {
  const { data, isLoading } = useTickets();
  const deleteTicket = useDeleteTicket();
  const cancelTicket = useCancelTicket();
  const completeTicket = useCompleteTicket();

  if (isLoading) return <p>Loading tickets...</p>;

  const tickets = data?.data || [];

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Tickets</h1>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg mb-1">Ticket #{ticket.id} - {ticket.status}</h2>
            <p>Session ID: {ticket.sessionId}</p>
            <p>Issue: {ticket.issue}</p>
          </div>
          <div className="flex space-x-2">
            {ticket.status === "OPEN" && (
              <>
                <button onClick={() => cancelTicket.mutate(ticket.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Cancel</button>
                <button onClick={() => completeTicket.mutate(ticket.id)} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Complete</button>
              </>
            )}
            <button onClick={() => deleteTicket.mutate(ticket.id)} className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
