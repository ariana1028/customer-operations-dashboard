import { useEffect, useState } from 'react';
import CustomerTable from './components/CustomerTable';
import CustomerForm from './components/CustomerForm';
import { customersApi } from './api/customers';
import type { Customer, CustomerCreate } from './types/customer';

function App() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

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

  const handleCreateCustomer = async (customer: CustomerCreate) => {
    setCreating(true);
    try {
      await customersApi.create(customer);
      await loadCustomers(); // Reload the list
    } finally {
      setCreating(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '20px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>
          Customer Operations Dashboard
        </h1>
      </header>
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
          <div>
            <CustomerForm onSubmit={handleCreateCustomer} loading={creating} />
          </div>
          <div>
            <CustomerTable customers={customers} loading={loading} error={error} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;