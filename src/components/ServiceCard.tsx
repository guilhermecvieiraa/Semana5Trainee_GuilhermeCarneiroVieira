import type { ServiceOrder } from '../types'

interface Props{
    serviceOrder: serviceOrder;
    Delete?: (id:number) => void;
}

const ServiceCard({serviceOrder, Delete}: Props) => {
    let statusColor = '';

    if (serviceOrder.status) === 'open' {
        statusColor = 'bg-yellow-100 border-yellow-500'
    }

    else if(serviceOrder.status === 'in_progress'){
        statusColor = 'bg-blue-100 border-blue-500 text-blue-800'
    }

    else{
        statusColor = 'bg-gray-200 border-gray-500 text-gray-500'
    }


    return(
        <div className={`p-4 rounded shadow mb-4 ${statusColor}`}>
            <div className="flex justify-between items-start mb-2">
                <p><strong>Client ID:</strong> {serviceOrder.client_id}</p>

                {Delete && (
                    <button
                    onClick={() => Delete(serviceOrder.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                        Delete
                    </button>
                )}

            </div>

            <p><strong>Device:</strong> {serviceOrder.device}</p>
            <p><strong>Issue:</strong> {serviceOrder.issue}</p>
            
            <div className="flex items-center gap-2 mt-2">
                <strong className="text-sm">Status:</strong>

                <span className="uppercase font-semibold">{serviceOrder.status}</span>

            </div>

        </div>
    )
}

export default ServiceCard
