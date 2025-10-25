/*
import { useState } from 'react'
import { usePayments, useRefundPayment } from './usePayments'
import { Link } from 'react-router-dom'

export default function PaymentsList() {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const { data: payments = [], isLoading } = usePayments({ status, q })
  const refundMut = useRefundPayment()

  if (isLoading) return <div>Loading payments...</div>

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Payments</h2>
        <Link to="/payments/create" className="bg-blue-600 text-white px-3 py-1 rounded">Charge</Link>
      </div>

      <div className="mb-4 flex gap-2">
        <input placeholder="Search ticket/user id" value={q} onChange={(e) => setQ(e.target.value)} className="border p-2 rounded" />
        <select className="border p-2 rounded" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="">All</option>
          <option value="PAID">Paid</option>
          <option value="REFUNDED">Refunded</option>
        </select>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="text-sm text-gray-600">
            <th className="py-2">ID</th>
            <th>Ticket</th>
            <th>User</th>
            <th>Amount</th>
            <th>Method</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 && <tr><td colSpan="7">No payments</td></tr>}
          {payments.map(p => (
            <tr key={p.id} className="border-t">
              <td className="py-2">{p.id}</td>
              <td>{p.ticketId}</td>
              <td>{p.userId}</td>
              <td>{p.amount} {p.currency}</td>
              <td>{p.method}</td>
              <td>{p.status}</td>
              <td className="py-2 text-right space-x-2">
                <Link to={`/payments/${p.id}`} className="text-blue-600">View</Link>
                {p.status === 'PAID' && (
                  <button
                    onClick={() => {
                      if (!confirm('Refund this payment?')) return
                      refundMut.mutate({ id: p.id, payload: { amount: p.amount, reason: 'Refund via admin' } })
                    }}
                    className="text-red-600"
                  >
                    Refund
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
 */
/*
import React, { useState } from 'react';
import { usePayments, useCreatePayment, useUpdatePayment, useDeletePayment } from './usePayment';
import { useSessions } from "../sessions/useSession";

export default function PaymentsList() {
  const { data: payments, isLoading } = usePayments();
  const { data: sessions } = useSessions();

  const createPayment = useCreatePayment();
  const updatePayment = useUpdatePayment();
  const deletePayment = useDeletePayment();

  const [sessionId, setSessionId] = useState('');
  const [amount, setAmount] = useState('');

  if (isLoading) return <div>Loading Payments...</div>;

  const handleCreatePayment = () => {
    if (!sessionId || !amount) return;
    createPayment.mutate({ sessionId: parseInt(sessionId), amount: parseFloat(amount), status: 'PAID' });
    setSessionId(''); setAmount('');
  };

  const handleMarkPaid = (id) => {
    updatePayment.mutate({ id, payload: { status: 'PAID' } });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Payments</h1>

      <div className="mb-4 space-x-2">
        <select value={sessionId} onChange={e => setSessionId(e.target.value)}>
          <option value="">Select Session</option>
          {sessions?.map(s => (
            <option key={s.id} value={s.id}>Session {s.id} - Vehicle {s.vehicleId}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button onClick={handleCreatePayment} className="bg-blue-500 text-white px-2 py-1 rounded">Add Payment</button>
      </div>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th>Session</th><th>Amount</th><th>Status</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id} className="border-b">
              <td>{p.sessionId}</td>
              <td>{p.amount}</td>
              <td>{p.status}</td>
              <td className="space-x-2">
                {p.status !== 'PAID' && (
                  <button onClick={() => handleMarkPaid(p.id)} className="bg-green-500 text-white px-2 py-1 rounded">Mark Paid</button>
                )}
                <button onClick={() => deletePayment.mutate(p.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 */

 import React, { useState } from 'react';
 import { usePayments, useCreatePayment, useUpdatePayment, useDeletePayment } from './usePayment';
 import { useSessions } from '../sessions/useSession';

 export default function PaymentsList() {
   const { data: payments, isLoading } = usePayments();
   const { data: sessions } = useSessions();
   const createPayment = useCreatePayment();
   const updatePayment = useUpdatePayment();
   const deletePayment = useDeletePayment();

   const [sessionId, setSessionId] = useState('');
   const [amount, setAmount] = useState('');

   if (isLoading) return <div>Loading Payments...</div>;

   const handleCreate = () => {
     if (!sessionId || !amount) return;
     createPayment.mutate({ sessionId: parseInt(sessionId), amount: parseFloat(amount), status: 'PAID' });
     setSessionId(''); setAmount('');
   };

   const handleMarkPaid = (id) => updatePayment.mutate({ id, payload: { status: 'PAID' } });
   const handleDelete = (id) => deletePayment.mutate(id);

   return (
     <div className="p-4">
       <h1 className="text-xl font-bold mb-4">Payments Admin</h1>

       <div className="mb-4 space-x-2">
         <select value={sessionId} onChange={e => setSessionId(e.target.value)}>
           <option value="">Select Session</option>
           {sessions?.map(s => <option key={s.id} value={s.id}>Session {s.id}</option>)}
         </select>
         <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
         <button onClick={handleCreate} className="bg-blue-500 text-white px-2 py-1 rounded">Add Payment</button>
       </div>

       <table className="w-full border-collapse">
         <thead>
           <tr className="border-b">
             <th>Session</th><th>Amount</th><th>Status</th><th>Actions</th>
           </tr>
         </thead>
         <tbody>
           {payments?.map(p => (
             <tr key={p.id} className="border-b">
               <td>{p.sessionId}</td>
               <td>{p.amount}</td>
               <td>{p.status}</td>
               <td className="space-x-2">
                 {p.status !== 'PAID' && <button onClick={() => handleMarkPaid(p.id)} className="bg-green-500 text-white px-2 py-1 rounded">Mark Paid</button>}
                 <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>
   );
 }
