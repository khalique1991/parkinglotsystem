import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../../components/ProtectedRoute';
import PaymentsList from './PaymentsList';
import PaymentDetail from './PaymentDetail';
import CreatePaymentForm from './CreatePaymentForm';

export default function Payments() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute roles={['ADMIN','OPERATOR']}>
            <PaymentsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="create"
        element={
          <ProtectedRoute roles={['ADMIN','OPERATOR']}>
            <CreatePaymentForm />
          </ProtectedRoute>
        }
      />
      <Route
        path=":id"
        element={
          <ProtectedRoute roles={['ADMIN','OPERATOR']}>
            <PaymentDetail />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
