/*
import React from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../features/dashboard/index.jsx";
import Parking from "../features/parking/index.jsx";
import Vehicles from "../features/vehicles/index.jsx";
import Users from "../features/users/index.jsx";
import Customers from "../features/customers/index.jsx";
import Payments from "../features/payments/index.jsx";
import Reports from "../features/reports/index.jsx";
import Notifications from "../features/notifications/index.jsx";
import { TicketList, CreateTicketForm, TicketDetail } from "../features/tickets";
import Sessions from "../features/sessions/index.jsx";
import Auth from "../features/auth/index.jsx";

export const appRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/parking", element: <Parking /> },
  { path: "/vehicles", element: <Vehicles /> },
  { path: "/users", element: <Users /> },
  { path: "/customers", element: <Customers /> },
  { path: "/payments", element: <Payments /> },
  { path: "/reports", element: <Reports /> },
  { path: "/notifications", element: <Notifications /> },
  { path: "/sessions", element: <Sessions /> },
  { path: "/auth", element: <Auth /> },

  // Ticket routes
  {
    path: '/tickets',
    element: (
      <ProtectedRoute roles={['ADMIN', 'OPERATOR']}>
        <TicketList />
      </ProtectedRoute>
    ),
  },
  {
    path: '/tickets/:id',
    element: (
      <ProtectedRoute roles={['ADMIN', 'OPERATOR']}>
        <TicketDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: '/tickets/create',
    element: (
      <ProtectedRoute roles={['OPERATOR']}>
        <CreateTicketForm />
      </ProtectedRoute>
    ),
  },
];
 */

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../features/dashboard/Dashboard.jsx';
import UsersList from '../features/users/UsersList.jsx';
import VehiclesList from '../features/vehicles/VehiclesList.jsx';
import SessionsList from '../features/sessions/SessionsList.jsx';
import PaymentsList from '../features/payments/PaymentsList.jsx';

export const appRoutes = [
  { path: '/', element: <Navigate to="/dashboard" /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/users', element: <UsersList /> },
  { path: '/vehicles', element: <VehiclesList /> },
  { path: '/sessions', element: <SessionsList /> },
  { path: '/payments', element: <PaymentsList /> },
];
