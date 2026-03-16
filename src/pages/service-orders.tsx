import { useState, useEffect } from 'react';
import { getAllServiceOrders, createServiceOrder, deleteServiceOrder } from '../services/serviceOrderService';
import { getAllClients } from '../services/clientService';
import type { serviceOrder, Client } from '../types';
import ServiceCard from '../components/ServiceCard';

const ServiceOrders = () => {
  const [serviceOrders, setServiceOrders] = useState<serviceOrder[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [clientId, setClientId] = useState<string>('');
  const [device, setDevice] = useState<string>('');
  const [issue, setIssue] = useState<string>('');
  const [status, setStatus] = useState<'open' | 'in_progress' | 'done'>('open');

  async function fetchData() {
    try {
      setIsLoading(true);
      const [osData, clientsData] = await Promise.all([
        getAllServiceOrders(),
        getAllClients()
      ]);
      
      setServiceOrders(osData);
      setClients(clientsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddServiceOrder(event: React.SyntheticEvent) {
    event.preventDefault();

    if (!clientId) {
      alert("Please select a client.");
      return;
    }

    try {
      const newOrder = await createServiceOrder({
        client_id: Number(clientId),
        device,
        issue,
        status
      });

      setServiceOrders([...serviceOrders, newOrder]);

      setClientId('');
      setDevice('');
      setIssue('');
      setStatus('open');
    } catch (error) {
      console.error("Error creating service order:", error);
    }
  }

  async function handleDeleteServiceOrder(id: number) {
    try {
      await deleteServiceOrder(id);
      setServiceOrders(serviceOrders.filter(order => order.id !== id));
    } catch (error) {
      console.error("Error deleting service order:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <p className="text-xl text-gray-500">Loading service orders...</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Service Orders Management</h2>

      <form onSubmit={handleAddServiceOrder} className="bg-white p-6 rounded-lg shadow-md border mb-8 flex flex-col gap-4">
        <h3 className="text-lg font-semibold border-b pb-2">Open New Service Order</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1 font-semibold">Client</label>
            <select 
              required
              value={clientId} 
              onChange={(e) => setClientId(e.target.value)}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="" disabled>Select a client...</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name} (ID: {client.id})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1 font-semibold">Device</label>
            <input 
              type="text"  
              required 
              value={device} 
              onChange={(e) => setDevice(e.target.value)}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1 font-semibold">Issue Description</label>
            <input 
              type="text"  
              required 
              value={issue} 
              onChange={(e) => setIssue(e.target.value)}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1 font-semibold">Initial Status</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value as 'open' | 'in_progress' | 'done')}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

        </div>
        
        <button 
          type="submit" 
          className="bg-blue-600 text-white font-bold p-2 rounded hover:bg-blue-700 transition-colors mt-2"
        >
          Create Service Order
        </button>
      </form>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Current Service Orders</h3>
        
        {serviceOrders.length === 0 ? (
          <p className="text-center text-gray-600 bg-gray-50 p-4 rounded border">No service orders found.</p>
        ) : (
          serviceOrders.map((order) => (
            <ServiceCard 
              key={order.id} 
              serviceOrder={order} 
              Delete={handleDeleteServiceOrder} 
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ServiceOrders;