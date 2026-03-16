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

      const finalOrders = Array.isArray(osData) ? osData : (osData as any).data;
      const finalClients = Array.isArray(clientsData) ? clientsData : (clientsData as any).data;

      setServiceOrders(Array.isArray(finalOrders) ? finalOrders : []);
      setClients(Array.isArray(finalClients) ? finalClients : []);
      
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setIsLoading(false);
    }
  }

async function handleAddServiceOrder(event: React.SyntheticEvent) {
  event.preventDefault();

  if (!clientId) {
    alert("Por favor, selecione um cliente.");
    return;
  }

try {

    console.log("PACOTE SENDO ENVIADO:", {
      clientId: Number(clientId),
      device,
      description: issue,
      status
      });

    const response = await createServiceOrder({
      clientId: Number(clientId),
      device,
      issue: issue,
      status
    });

    const createdOrder = (response as any).data || response;

    if (createdOrder && createdOrder.id) {
      setServiceOrders([...serviceOrders, createdOrder]);

      setClientId('');
      setDevice('');
      setIssue('');
      setStatus('open');
      
      alert("Ordem de serviço criada com sucesso!");
    }

  } catch (error) {
    console.error("Error ao criar ordem de serviço:", error);
    alert("Erro ao criar a ordem. Verifique o console.");
  }
}

  async function handleDeleteServiceOrder(id: number) {
    try {
      await deleteServiceOrder(id);
      setServiceOrders(serviceOrders.filter(order => order.id !== id));
    } catch (error) {
      console.error("Erro ao deletar ordem de serviço:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <p className="text-xl text-gray-500">Carregando ordem de serviço.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Gestão das ordens de serviço</h2>

      <form onSubmit={handleAddServiceOrder} className="bg-white p-6 rounded-lg shadow-md border mb-8 flex flex-col gap-4">
        <h3 className="text-lg font-semibold border-b pb-2">Abrir nova ordem de serviço</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1 font-semibold">Cliente</label>
            <select 
              required
              value={clientId} 
              onChange={(e) => setClientId(e.target.value)}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="" disabled>Selecione um cliente</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.name} (ID: {client.id})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1 font-semibold">Aparelhos</label>
            <input 
              type="text"  
              required 
              value={device} 
              onChange={(e) => setDevice(e.target.value)}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1 font-semibold">Descrição do defeito:</label>
            <input 
              type="text"  
              required 
              value={issue} 
              onChange={(e) => setIssue(e.target.value)}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1 font-semibold">Status inicial</label>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value as 'open' | 'in_progress' | 'done')}
              className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="open">Aberto</option>
              <option value="in_progress">Em progresso</option>
              <option value="done">Finalizado</option>
            </select>
          </div>

        </div>
        
        <button 
          type="submit" 
          className="bg-blue-600 text-white font-bold p-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Criar ordem de serviço
        </button>
      </form>

      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-semibold">Ordens de Serviço atuais</h3>
        
        {serviceOrders.length === 0 ? (
          <p className="text-center text-gray-600 bg-gray-50 p-4 rounded border">Nenhuma ordem de serviço encontrada.</p>
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