import {useState, useEffect} from 'react'
import {getAllServiceOrders} from '../services/serviceOrderService'
import type {serviceOrder} from '../types'

const [serviceOrders, setServiceOrders] = useState<serviceOrder[]>([])
const [isLoading, setIsLoading] = useState<boolean>(true)

async function fetchServiceOrder() {
    try {
        setIsLoading(true)

        const data = await getAllServiceOrders()

        setServiceOrders(data);
    }

    catch (error) {
        console.error("Erro ao buscar a ordem de serviço.")
    }

    finally {
        setIsLoading(false)
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
        </div>

        <div className="flex flex-col gap-4">
            serviceOrders.map((order)) => (
                <ServiceCard 
                key={order.id}
                serviceOrder={order}
                />
            )
        </div>
    )
}