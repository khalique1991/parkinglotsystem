let payments = [
  { id: 1, sessionId: 1, amount: 100, status: 'PAID' },
  { id: 2, sessionId: 2, amount: 50, status: 'PAID' },
];

export const fetchPaymentsMock = async () => ({ data: [...payments] });

export const fetchPaymentMock = async (id) => {
  const payment = payments.find(p => p.id === id);
  return { data: payment || null };
};

export const createPaymentMock = async (payload) => {
  const newPayment = { id: Date.now(), ...payload };
  payments.push(newPayment);
  return { data: newPayment };
};

export const updatePaymentMock = async (id, payload) => {
  payments = payments.map(p => (p.id === id ? { ...p, ...payload } : p));
  return { data: payments.find(p => p.id === id) };
};

export const deletePaymentMock = async (id) => {
  payments = payments.filter(p => p.id !== id);
  return { data: true };
};
