import { useEffect, useState } from 'react';
const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export default function ReportsDashboard() {
  const [usage, setUsage] = useState([]);
  const [revenue, setRevenue] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (USE_MOCK) {
        const m = await import('./reports.mock.js');
        const u = await m.fetchUsageReportMock();
        const r = await m.fetchRevenueReportMock();
        if (mounted) {
          setUsage(u.data);
          setRevenue(r.data);
        }
      } else {
        const m = await import('./reports.api.js');
        const u = await m.fetchUsageReport();
        const r = await m.fetchRevenueReport();
        if (mounted) {
          setUsage(u.data);
          setRevenue(r.data);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Reports Dashboard</h2>
      <section className="grid md:grid-cols-2 gap-4">
        <div className="p-3 border rounded">
          <h3 className="font-semibold">Usage (last 7 days)</h3>
          <pre className="text-sm">{JSON.stringify(usage, null, 2)}</pre>
        </div>
        <div className="p-3 border rounded">
          <h3 className="font-semibold">Revenue (last 7 days)</h3>
          <pre className="text-sm">{JSON.stringify(revenue, null, 2)}</pre>
        </div>
      </section>
    </div>
  );
}
