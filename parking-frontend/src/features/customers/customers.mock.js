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
