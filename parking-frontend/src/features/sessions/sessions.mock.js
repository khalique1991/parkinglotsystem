let sessions = [
  { id: 1, vehicleId: 1, startTime: '2025-10-26T10:00', endTime: null, status: 'ACTIVE' },
  { id: 2, vehicleId: 2, startTime: '2025-10-25T14:00', endTime: '2025-10-25T16:00', status: 'COMPLETED' },
];

export const fetchSessionsMock = async () => ({ data: [...sessions] });

export const fetchSessionMock = async (id) => {
  const session = sessions.find(s => s.id === id);
  return { data: session || null };
};

export const createSessionMock = async (payload) => {
  const newSession = { id: Date.now(), ...payload };
  sessions.push(newSession);
  return { data: newSession };
};

export const updateSessionMock = async (id, payload) => {
  sessions = sessions.map(s => (s.id === id ? { ...s, ...payload } : s));
  return { data: sessions.find(s => s.id === id) };
};

export const deleteSessionMock = async (id) => {
  sessions = sessions.filter(s => s.id !== id);
  return { data: true };
};
