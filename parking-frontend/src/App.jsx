/*
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { appRoutes } from './routes/appRoutes.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {appRoutes.map(route => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
 *//*

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import Sidebar from "./components/Sidebar.jsx";
import { appRoutes } from "./routes/appRoutes.jsx";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-4">
            <Routes>
              {appRoutes.map(route => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
 */
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/layout/Layout.jsx";

// Import all pages
import Dashboard from "./features/dashboard/Dashboard.jsx";
import UsersList from "./features/users/UsersList.jsx";
import VehiclesList from "./features/vehicles/VehiclesList.jsx";
import SessionsList from "./features/sessions/SessionsList.jsx";
import PaymentsList from "./features/payments/PaymentsList.jsx";
import CustomersList from "./features/customers/CustomersList.jsx";
import ReportsList from "./features/reports/ReportsList.jsx";
import NotificationsList from "./features/notifications/NotificationsList.jsx";
import ParkingList from "./features/parking/ParkingList.jsx";
import TicketsList from "./features/tickets/TicketsList.jsx";

// Create React Query client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/vehicles" element={<VehiclesList />} />
            <Route path="/sessions" element={<SessionsList />} />
            <Route path="/payments" element={<PaymentsList />} />
            <Route path="/customers" element={<CustomersList />} />
            <Route path="/reports" element={<ReportsList />} />
            <Route path="/notifications" element={<NotificationsList />} />
            <Route path="/parking" element={<ParkingList />} />
            <Route path="/tickets" element={<TicketsList />} />
            {/* Catch-all redirect to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
