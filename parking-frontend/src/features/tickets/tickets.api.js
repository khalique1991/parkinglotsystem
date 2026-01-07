// src/features/tickets/tickets.api.js

const API_BASE = import.meta.env.VITE_API_URL + "/reservations";

const handleResponse = async (res) => {
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
};

// 🟢 Fetch all tickets (GET /api/reservations)
export async function fetchTickets() {
  const res = await fetch(API_BASE);
  const data = await handleResponse(res);

  // Map backend -> frontend
  return data.map((r) => ({
    id: r.id,
    customerId: r.customerId,
    parkingSessionId: r.parkingSessionId,
    status: r.status,
    startTime: r.startTime,
    createdAt: r.createdAt,
  }));
}

// 🟢 Create ticket (POST /api/reservations)
export async function createTicket(payload) {
  const body = {
    parkingSessionId: payload.parkingSessionId,
    customerId: payload.customerId,
    startTime: payload.startTime || new Date().toISOString(),
  };

  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return handleResponse(res);
}

// 🟢 Update status (PUT /api/reservations/{id}/status?status=CANCELLED)
export async function updateTicketStatus(id, status) {
  const res = await fetch(`${API_BASE}/${id}/status?status=${status}`, {
    method: "PUT",
  });
  return handleResponse(res);
}

// 🟡 Cancel ticket
export async function cancelTicket(id) {
  return updateTicketStatus(id, "CANCELLED");
}

// 🟢 Complete ticket
export async function completeTicket(id) {
  return updateTicketStatus(id, "COMPLETED");
}

// 🔴 Delete ticket (Optional — backend doesn’t expose delete yet)
export async function deleteTicket(id) {
  console.warn("Delete ticket API not available in backend yet");
  return Promise.resolve();
}
