export interface Customer {
    id: number;
    name: string;
    email: string;
    status: 'active' | 'paused' | 'delinquent';
    total_spend: number;
    created_at: string;
}

export interface CustomerCreate {
    name: string;
    email: string;
    status: 'active' | 'paused' | 'delinquent';
    total_spend: number;
}