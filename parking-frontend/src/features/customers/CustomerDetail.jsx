import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export default function CustomerDetail() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        let r;
        if (USE_MOCK) {
          const m = await import('./customers.mock.js');
          r = await m.fetchCustomerDetailMock(id);
        } else {
          const m = await import('./customers.api.js');
          r = await m.fetchCustomerDetail(id);
        }
        if (mounted) setCustomer(r.data);
      } catch (err) {
        console.error('Failed to fetch customer detail', err);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  if (!customer) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{customer.name}</h2>
      <p><strong>Email:</strong> {customer.email}</p>
      <p><strong>Phone:</strong> {customer.phone}</p>
      <p><strong>Address:</strong> {customer.address}</p>
    </div>
  );
}
