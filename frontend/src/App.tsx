import { useEffect, useState } from 'react';
import CustomerTable from './components/CustomerTable';
import { customersApi } from './api/customers';
import type { Customer } from './types/customer';

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await customersApi.getAll();
      setCustomers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
          Customer Operations Dashboard
        </h1>
      </header>
      <main>
        <CustomerTable customers={customers} loading={loading} error={error} />
      </main>
    </div>
  );
}

export default App;