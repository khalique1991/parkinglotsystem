/*
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
*/
// src/features/customers/customers.api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/customers";

export const fetchCustomers = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const fetchCustomerById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createCustomer = async (payload) => {
  const res = await axios.post(`${API_URL}/create`, payload);
  return res.data;
};

export const deleteCustomer = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return true;
};
export const updateCustomer = async (id, payload) => {
  const res = await axios.put(`${API_URL}/${id}`, payload);
  return res.data;
};