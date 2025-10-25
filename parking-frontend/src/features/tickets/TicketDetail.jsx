import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function TicketDetail() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    axios.get(`/api/tickets/${id}`) // Backend endpoint
      .then(res => setTicket(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!ticket) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Ticket Details</h1>
      <div className="space-y-2">
        <div><strong>ID:</strong> {ticket.id}</div>
        <div><strong>Vehicle Number:</strong> {ticket.vehicleNumber}</div>
        <div><strong>Entry Time:</strong> {ticket.entryTime}</div>
        <div><strong>Exit Time:</strong> {ticket.exitTime || '-'}</div>
        <div><strong>Status:</strong> {ticket.exitTime ? 'Exited' : 'Active'}</div>
      </div>
      <Link to="/tickets" className="mt-4 inline-block text-blue-600">Back to Tickets</Link>
    </div>
  );
}
