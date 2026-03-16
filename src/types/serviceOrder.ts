export interface serviceOrder{
    id: number;
    clientId: number;
    device: string;
    issue: string;
    status: 'open' | 'in_progress' | 'done';
}

export type CreateServiceOrderData = Omit<serviceOrder, 'id' | 'created_at'>;