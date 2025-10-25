export async function fetchCustomers() {
  const res = await fetch('/api/customers');
  const data = await res.json();
  return { data };
}

export async function fetchCustomerDetail(id) {
  const res = await fetch(`/api/customers/${id}`);
  const data = await res.json();
  return { data };
}
