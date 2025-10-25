import { useParams, useNavigate } from 'react-router-dom'
import { usePayment } from './usePayment'
import { useRefundPayment } from './usePayments'

export default function PaymentDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: payment, isLoading } = usePayment(id)
  const refundMut = useRefundPayment()

  if (isLoading) return <div>Loading...</div>
  if (!payment) return <div>Payment not found</div>

  const handleRefund = async () => {
    if (!confirm('Issue refund?')) return
    await refundMut.mutateAsync({ id: payment.id, payload: { amount: payment.amount, reason: 'Manual refund' } })
    alert('Refund issued')
    navigate('/payments')
  }

  return (
    <div className="p-4 bg-white rounded shadow max-w-lg">
      <h2 className="text-xl font-semibold mb-4">Payment #{payment.id}</h2>
      <div className="space-y-2">
        <div><strong>Ticket:</strong> {payment.ticketId}</div>
        <div><strong>User:</strong> {payment.userId}</div>
        <div><strong>Amount:</strong> {payment.amount} {payment.currency}</div>
        <div><strong>Method:</strong> {payment.method}</div>
        <div><strong>Status:</strong> {payment.status}</div>
        <div><strong>Created:</strong> {new Date(payment.createdAt).toLocaleString()}</div>
        {payment?.refund && <div><strong>Refund:</strong> {JSON.stringify(payment.refund)}</div>}
      </div>

      <div className="mt-4 flex gap-2">
        {payment.status === 'PAID' && <button onClick={handleRefund} className="bg-red-600 text-white px-3 py-1 rounded">Refund</button>}
        <button onClick={() => navigate('/payments')} className="bg-gray-200 px-3 py-1 rounded">Back</button>
      </div>
    </div>
  )
}
