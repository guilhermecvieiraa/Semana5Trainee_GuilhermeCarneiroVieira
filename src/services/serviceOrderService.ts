import { api } from './api'
import type { serviceOrder, CreateServiceOrderData } from '../types'

export async function getAllServiceOrders(): Promise<serviceOrder[]> {
  const response = await api.get<serviceOrder[]>('/serviceOrder');
  return response.data;
}

export async function createServiceOrder(data: CreateServiceOrderData): Promise<serviceOrder> {
  const response = await api.post<serviceOrder>('/serviceOrder', data);
  return response.data;
}

export async function deleteServiceOrder(id: number): Promise<void> {
  await api.delete(`/serviceOrder/${id}`);
}