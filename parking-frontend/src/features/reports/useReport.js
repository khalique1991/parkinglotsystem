import { useQuery } from "@tanstack/react-query";
import * as api from "./reports.api";
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const useUsageReport = (params) => useQuery({
  queryKey: ["usageReport", params],
  queryFn: async () => USE_MOCK
    ? (await import("./reports.mock.js")).fetchUsageReportMock(params)
    : api.fetchUsageReport(params),
});

export const useRevenueReport = (params) => useQuery({
  queryKey: ["revenueReport", params],
  queryFn: async () => USE_MOCK
    ? (await import("./reports.mock.js")).fetchRevenueReportMock(params)
    : api.fetchRevenueReport(params),
});