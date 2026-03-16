import { useState, useEffect } from 'react';
import { getAllClients, createClient, deleteClient } from '../services/clientService';
import type { Client } from '../types';

const Clients = () => {

  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

async function fetchClients() {
    try {
      setIsLoading(true);
      const response = await getAllClients();
      
      const actualList = Array.isArray(response) ? response : (response as any).data;

      if (Array.isArray(actualList)) {
        setClients(actualList);
      } else {
        setClients([]);
      }
    } catch (error) {
      console.error("Erro ao procurar cliente:", error);
      setClients([]);
    } finally {
      setIsLoading(false);
    }
  }
 async function handleAddClient(event: React.SyntheticEvent) {
    event.preventDefault()
    
    try {
      const response = await createClient({ name, email, phone });
  
      const clientData = (response as any).data || response;
      
      setClients([...clients, clientData]);
      
      setName('');
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
    }
  }

  async function handleDeleteClient(id: number) {

    try {
      await deleteClient(id);

      setClients(clients.filter(client => client.id !== id));
    } catch (error) {
    console.error("Erro ao deletar:", error)
    }
  }

  useEffect(() => {
    fetchClients();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <p className="text-xl text-gray-500">Carregando clientes</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Gestão de clientes</h2>

      <form onSubmit={handleAddClient} className="bg-white p-6 rounded-lg shadow-md border mb-8 flex flex-col gap-4">
        <h3 className="text-lg font-semibold border-b pb-2">Adcionar novo cliente</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            type="text" 
            placeholder="Name" 
            required 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="email" 
            placeholder="Email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input 
            type="text" 
            placeholder="Phone" 
            required 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button 
          type="submit" 
          className="bg-blue-600 text-white font-bold p-2 rounded hover:bg-blue-700 cursor-pointer"
        >
          Save Client
        </button>
      </form>

<div className="flex flex-col gap-4">
  <h3 className="text-lg font-semibold">Clientes registrados</h3>
  
  {Array.isArray(clients) && clients.length > 0 ? (
    
    clients.map((client) => (
      <div key={client.id} className="bg-white p-4 rounded-lg border shadow-sm flex justify-between items-center">
        <div>
          <p className="font-bold text-lg">{client.name}</p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Email:</span> {client.email} | <span className="font-semibold">Phone:</span> {client.phone}
          </p>
        </div>
        <button 
          onClick={() => handleDeleteClient(client.id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600  cursor-pointer"
        >
          Delete
        </button>
      </div>
    ))

  ) : (
    <p className="text-center text-gray-600 bg-gray-50 p-4 rounded border">
      No clients found.
    </p>
  )}
</div>
    </div>
  );
};

export default Clients