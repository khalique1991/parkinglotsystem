import { useState } from "react";
import { createTicket, closeTicket } from "../services/ticketService";

function Dashboard() {
  const [ticket, setTicket] = useState(null);
  const [vehicleNumber, setVehicleNumber] = useState("");

  const handleBook = async () => {
    try {
      const newTicket = await createTicket(vehicleNumber, "CAR");
      setTicket(newTicket);
    } catch (err) {
      console.error("Error creating ticket:", err);
    }
  };

  const handleClose = async () => {
    try {
      const closedTicket = await closeTicket(ticket.id);
      setTicket(closedTicket);
    } catch (err) {
      console.error("Error closing ticket:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Ticket Dashboard</h2>
      <input
        type="text"
        placeholder="Enter Vehicle Number"
        value={vehicleNumber}
        onChange={(e) => setVehicleNumber(e.target.value)}
        className="border p-2 mr-2 rounded"
      />
      <button onClick={handleBook} className="bg-blue-600 text-white px-4 py-2 rounded">
        Book Ticket
      </button>

      {ticket && (
        <div className="mt-4 p-4 border rounded shadow">
          <p>Ticket ID: {ticket.id}</p>
          <p>Status: {ticket.status}</p>
          {ticket.status === "ACTIVE" && (
            <button
              onClick={handleClose}
              className="bg-red-600 text-white px-4 py-2 rounded mt-2"
            >
              Close Ticket
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
