import type { Customer, CustomerCreate, CustomerUpdate } from '../types/customer';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const customersApi = {
    async getAll(): Promise<Customer[]> {
        const response = await fetch(`${API_BASE_URL}/customers`);
        if (!response.ok) {
            throw new Error('Failed to fetch customers');
        }
        return response.json();
    },

    async getById(id: number): Promise<Customer> {
        const response = await fetch(`${API_BASE_URL}/customers/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch customer');
        }
        return response.json();
    },

    async create(customer: CustomerCreate): Promise<Customer> {
        const response = await fetch(`${API_BASE_URL}/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer),
        });
        if (!response.ok) {
            throw new Error('Failed to create customer');
        }
        return response.json();
    },

    async update(id: number, data: CustomerUpdate): Promise<Customer> {
        const response = await fetch(`${API_BASE_URL}/customers/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update customer');
        return response.json();
    },
};