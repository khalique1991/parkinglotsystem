/*
let customers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "1234567890", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", phone: "9876543210", status: "Inactive" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", phone: "5555555555", status: "Active" },
];

export const fetchCustomersMock = async () => ({ data: customers });
export const addCustomerMock = async (payload) => {
  const newCustomer = { id: customers.length + 1, ...payload };
  customers.push(newCustomer);
  return { data: newCustomer };
};
export const deleteCustomerMock = async (id) => {
  customers = customers.filter(c => c.id !== id);
  return { data: true };
};
export const updateCustomerMock = async (id, payload) => {
  const index = customers.findIndex(c => c.id === id);
  if (index !== -1) customers[index] = { ...customers[index], ...payload };
  return { data: customers[index] };
};
*/
// src/features/customers/customers.mock.js
let customers = [
  { id: 1, name: "John Doe", email: "john@x.com", phone: "9999999999" },
  { id: 2, name: "Alice Smith", email: "alice@x.com", phone: "8888888888" },
];

export const fetchCustomersMock = async () => {
  await new Promise((r) => setTimeout(r, 200));
  return [...customers];
};

export const createCustomerMock = async (payload) => {
  await new Promise((r) => setTimeout(r, 200));
  const newCust = { id: Date.now(), ...payload };
  customers.push(newCust);
  return newCust;
};

export const deleteCustomerMock = async (id) => {
  await new Promise((r) => setTimeout(r, 200));
  customers = customers.filter((c) => c.id !== id);
  return true;
};
export const updateCustomerMock = async (id, payload) => {
  await new Promise((r) => setTimeout(r, 200));
  customers = customers.map((c) => (c.id === id ? { ...c, ...payload } : c));
  return customers.find((c) => c.id === id);
};