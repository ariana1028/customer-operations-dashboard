import { useState, useEffect } from 'react';
import type { CustomerCreate } from '../types/customer';

interface CustomerFormProps {
    onSubmit: (customer: CustomerCreate) => Promise<void>;
    loading: boolean;
    initialData?: CustomerCreate;
    onCancel?: () => void; 
}

export default function CustomerForm({ onSubmit, loading, initialData, onCancel }: CustomerFormProps) {
    const emptyForm: CustomerCreate = { name: '', email: '', status: 'active', total_spend: 0 };

    const [formData, setFormData] = useState<CustomerCreate>(initialData ?? emptyForm);
    const [error, setError] = useState<string | null>(null);

    // Sync form when switching between create/edit
    useEffect(() => {
        setFormData(initialData ?? emptyForm);
        setError(null);
    }, [initialData]);

    const isEditing = !!initialData;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await onSubmit(formData);
            if (!isEditing) setFormData(emptyForm); // only reset on create
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to save customer');
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h2 style={{ marginTop: 0, fontSize: '18px', fontWeight: '600' }}>
            {isEditing ? 'Edit Customer' : 'Add New Customer'}
        </h2>
        
        <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
                Name *
            </label>
            <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                }}
            />
            </div>

            <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
                Email *
            </label>
            <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                }}
            />
            </div>

            <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
                Status *
            </label>
            <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'paused' | 'delinquent' })}
                required
                style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                }}
            >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="delinquent">Delinquent</option>
            </select>
            </div>

            <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>
                Total Spend *
            </label>
            <input
                type="number"
                step="0.01"
                min="0"
                value={formData.total_spend}
                onChange={(e) => setFormData({ ...formData, total_spend: parseFloat(e.target.value) || 0 })}
                required
                style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                }}
            />
            </div>

            {error && (
            <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '4px', fontSize: '14px' }}>
                {error}
            </div>
            )}

            <button
            type="submit"
            disabled={loading}
            style={{
                width: '100%',
                padding: '10px',
                backgroundColor: loading ? '#9ca3af' : isEditing ? '#10b981' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: loading ? 'not-allowed' : 'pointer',
            }}
            >
            {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Customer'}
            </button>

            {onCancel && (
            <button
                type="button"
                onClick={onCancel}
                style={{
                marginTop: '8px', width: '100%', padding: '10px',
                backgroundColor: 'white', color: '#6b7280',
                border: '1px solid #d1d5db', borderRadius: '4px',
                fontSize: '14px', fontWeight: '500', cursor: 'pointer',
                }}
            >
                Cancel
            </button>
            )}
        </form>
        </div>
    );
}