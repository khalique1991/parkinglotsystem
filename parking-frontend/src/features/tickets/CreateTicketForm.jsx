import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateTicketForm() {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/tickets', { vehicleNumber }) // Backend endpoint
      .then(() => navigate('/tickets'))
      .catch(err => console.error(err));
  };

  return (
    <div className="p-4 max-w-md">
      <h1 className="text-xl font-bold mb-4">Create Ticket</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Vehicle Number</label>
          <input
            type="text"
            value={vehicleNumber}
            onChange={e => setVehicleNumber(e.target.value)}
            className="border px-2 py-1 w-full"
            required
          />
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Create Ticket
        </button>
      </form>
    </div>
  );
}
