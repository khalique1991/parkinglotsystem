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
