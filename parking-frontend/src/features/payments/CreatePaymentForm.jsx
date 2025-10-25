import { useForm } from 'react-hook-form'
import { useCreatePayment } from './usePayments'
import { useNavigate } from 'react-router-dom'

export default function CreatePaymentForm({ defaultTicketId }) {
  const { register, handleSubmit } = useForm({ defaultValues: { ticketId: defaultTicketId || '', userId: '', amount: '', currency: 'INR', method: 'CARD' } })
  const createMut = useCreatePayment()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      await createMut.mutateAsync({ ticketId: Number(data.ticketId), userId: Number(data.userId), amount: Number(data.amount), currency: data.currency, method: data.method })
      alert('Payment created')
      navigate('/payments')
    } catch (e) {
      alert('Create failed')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white rounded shadow max-w-md">
      <h2 className="text-lg font-semibold mb-4">Create Payment</h2>

      <label className="block mb-2">Ticket ID
        <input {...register('ticketId', { required: true })} className="border p-2 rounded w-full" />
      </label>

      <label className="block mb-2">User ID
        <input {...register('userId', { required: true })} className="border p-2 rounded w-full" />
      </label>

      <label className="block mb-2">Amount
        <input type="number" step="0.01" {...register('amount', { required: true })} className="border p-2 rounded w-full" />
      </label>

      <label className="block mb-2">Currency
        <input {...register('currency')} className="border p-2 rounded w-full" />
      </label>

      <label className="block mb-4">Method
        <select {...register('method')} className="border p-2 rounded w-full">
          <option value="CARD">Card</option>
          <option value="UPI">UPI</option>
          <option value="CASH">Cash</option>
        </select>
      </label>

      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Charge</button>
        <button type="button" onClick={() => navigate('/payments')} className="bg-gray-200 px-3 py-1 rounded">Cancel</button>
      </div>
    </form>
  )
}
