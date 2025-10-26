/*
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
const USE_MOCK = true;

export const useCustomers = () => useQuery({
  queryKey: ["customers"],
  queryFn: async () => USE_MOCK ? (await import("./customers.mock.js")).fetchCustomersMock() : null,
});

export const useDeleteCustomer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => USE_MOCK ? (await import("./customers.mock.js")).deleteCustomerMock(id) : null,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["customers"] }),
  });
};

export const useUpdateCustomer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => USE_MOCK ? (await import("./customers.mock.js")).updateCustomerMock(id, payload) : null,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["customers"] }),
  });
};
*/
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";

// ✅ Set to true to use mock data, false to use backend API
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
// Fetch all customers
export const useCustomers = () =>
  useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      if (USE_MOCK) {
        const m = await import("./customers.mock.js");
        return m.fetchCustomersMock();
      } else {
        return api.get("/customers");
      }
    },
    staleTime: 1000 * 60,
  });

// Fetch single customer
export const useCustomer = (id) =>
  useQuery({
    queryKey: ["customer", id],
    queryFn: async () => {
      if (!id) return null;
      if (USE_MOCK) {
        const m = await import("./customers.mock.js");
        return m.fetchCustomerMock(id);
      } else {
        return api.get(`/customers/${id}`);
      }
    },
    enabled: !!id,
  });

// Create customer
export const useCreateCustomer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      if (USE_MOCK) {
        const m = await import("./customers.mock.js");
        return m.createCustomerMock(payload);
      } else {
        return api.post("/customers/create", payload);
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["customers"] }),
  });
};

// Update customer
export const useUpdateCustomer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, payload }) => {
      if (USE_MOCK) {
        const m = await import("./customers.mock.js");
        return m.updateCustomerMock(id, payload);
      } else {
        return api.put(`/customers/${id}`, payload);
      }
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["customers"] });
      qc.invalidateQueries({ queryKey: ["customer", vars.id] });
    },
  });
};

// Delete customer
export const useDeleteCustomer = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (USE_MOCK) {
        const m = await import("./customers.mock.js");
        return m.deleteCustomerMock(id);
      } else {
        return api.delete(`/customers/${id}`);
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["customers"] }),
  });
};
