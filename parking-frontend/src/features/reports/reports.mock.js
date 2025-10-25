/*
const wait = ms => new Promise(r => setTimeout(r, ms));

export const fetchUsageReportMock = async () => {
  await wait(300);
  const today = Date.now();
  const data = Array.from({ length: 7 }).map((_, i) => ({
    date: new Date(today - i * 86400000).toISOString().slice(0, 10),
    value: Math.floor(Math.random() * 100),
  }));
  return { data };
};

export const fetchRevenueReportMock = async () => {
  await wait(300);
  const today = Date.now();
  const data = Array.from({ length: 7 }).map((_, i) => ({
    date: new Date(today - i * 86400000).toISOString().slice(0, 10),
    revenue: parseFloat((Math.random() * 5000).toFixed(2)),
  }));
  return { data };
};
*/
export const fetchReportsMock = async () => {
  return {
    usersCount: 12,
    vehiclesCount: 45,
    parkingCount: 5,
    ticketsCount: 8,
    ticketsByStatus: [
      { status: "OPEN", count: 3 },
      { status: "COMPLETED", count: 4 },
      { status: "CANCELLED", count: 1 },
    ],
    revenueByMonth: [
      { month: "Jan", revenue: 1200 },
      { month: "Feb", revenue: 1500 },
      { month: "Mar", revenue: 900 },
    ],
  };
};
