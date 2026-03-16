import {useState, useEffect} from 'react'
import {getAllServiceOrders} from '../services/serviceOrderService'
import type {serviceOrder} from '../types'
import ServiceCard from '../components/ServiceCard'

const Dashboard = () => {

const [serviceOrders, setServiceOrders] = useState<serviceOrder[]>([])
const [isLoading, setIsLoading] = useState<boolean>(true)

async function fetchServiceOrder() {
    try {
        setIsLoading(true);

        const response = await getAllServiceOrders();

        const actualList = Array.isArray(response) ? response : (response as any).data;

        setServiceOrders(Array.isArray(actualList) ? actualList : []);
        
    } catch (error) {
        console.error("Erro ao buscar a ordem de serviço:", error);
        setServiceOrders([]);
    } finally {
        setIsLoading(false);
    }
}

    useEffect(() => {
        fetchServiceOrder()
    }, [])

    if(isLoading) {
        return(
            <div className="flex justify-center mt-10">
                <p className="text-xl text-gray-500">Carregando ordem de serviços</p>
            </div>
        )
    }

    return(
        <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Dashboard - Ordens de Serviços
            </h2>

        <div className="flex flex-col gap-4">
            {Array.isArray(serviceOrders) && serviceOrders.length > 0 ? (
    serviceOrders.map((order) => (
    <ServiceCard key={order.id} serviceOrder={order} />
    ))
    ) : (
        <p className="text-center text-gray-500">Nenhuma ordem encontrada.</p>
    )}
      </div>
    </div>
  );
};

export default Dashboard 