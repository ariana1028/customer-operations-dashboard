import type { Customer } from '../types/customer';

interface CustomerTableProps {
    customers: Customer[];
    loading: boolean;
    error: string | null;
    }

    export default function CustomerTable({ customers, loading, error }: CustomerTableProps) {
    if (loading) {
        return <div style={{ padding: '20px' }}>Loading customers...</div>;
    }

    if (error) {
        return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;
    }

    if (customers.length === 0) {
        return <div style={{ padding: '20px' }}>No customers yet. Create one to get started!</div>;
    }

    const getStatusColor = (status: string) => {
        switch (status) {
        case 'active':
            return '#22c55e';
        case 'paused':
            return '#eab308';
        case 'delinquent':
            return '#ef4444';
        default:
            return '#6b7280';
        }
    };

    return (
        <div style={{ padding: '20px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e5e7eb' }}>
            <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>ID</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'right' }}>Total Spend</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Created At</th>
            </tr>
            </thead>
            <tbody>
            {customers.map((customer) => (
                <tr key={customer.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>{customer.id}</td>
                <td style={{ padding: '12px' }}>{customer.name}</td>
                <td style={{ padding: '12px' }}>{customer.email}</td>
                <td style={{ padding: '12px' }}>
                    <span
                    style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: `${getStatusColor(customer.status)}20`,
                        color: getStatusColor(customer.status),
                    }}
                    >
                    {customer.status}
                    </span>
                </td>
                <td style={{ padding: '12px', textAlign: 'right' }}>
                    ${customer.total_spend.toFixed(2)}
                </td>
                <td style={{ padding: '12px' }}>
                    {new Date(customer.created_at).toLocaleDateString()}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}