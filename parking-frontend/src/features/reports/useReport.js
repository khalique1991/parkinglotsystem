import { useQuery } from "@tanstack/react-query";
const USE_MOCK = true;

export const useReports = () => useQuery({
  queryKey: ["reports"],
  queryFn: async () => USE_MOCK ? (await import("./reports.mock.js")).fetchReportsMock() : null,
});