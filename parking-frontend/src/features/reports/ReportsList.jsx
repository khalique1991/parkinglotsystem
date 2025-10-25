import React from "react";
import { useReports } from "./useReport.js";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#FBBF24", "#10B981", "#EF4444"];

export default function ReportsList() {
  const { data, isLoading } = useReports();
  if (isLoading) return <p>Loading reports...</p>;

  const {
    usersCount,
    vehiclesCount,
    parkingCount,
    ticketsCount,
    ticketsByStatus,
    revenueByMonth,
  } = data;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-4">Reports</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-gray-500 uppercase text-sm">Users</h3>
          <p className="text-2xl font-bold">{usersCount}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-gray-500 uppercase text-sm">Vehicles</h3>
          <p className="text-2xl font-bold">{vehiclesCount}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-gray-500 uppercase text-sm">Parking Lots</h3>
          <p className="text-2xl font-bold">{parkingCount}</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-gray-500 uppercase text-sm">Tickets</h3>
          <p className="text-2xl font-bold">{ticketsCount}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tickets by Status Pie */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Tickets by Status</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={ticketsByStatus} dataKey="count" nameKey="status" outerRadius={80} fill="#8884d8" label>
                {ticketsByStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Month Bar */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Revenue by Month</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={revenueByMonth}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
