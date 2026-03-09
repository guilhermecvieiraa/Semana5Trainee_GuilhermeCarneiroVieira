import type { questionario } from "./NewServiceForm";

interface Props{
    servico: questionario
    index: number
    mudarStatus: (index: number, novoStatus: string) => void
}

function ServiceCard({servico, index, mudarStatus}: Props){

    const corBalao = servico.status === 'Aberto'
    ? 'bg-yellow-100 border-yellow-500'
    : 'bg-gray-200 border-gray-500 text-gray-500'

    return(
        <div className={`p-4 rounded shadow mb-4 ${corBalao}`}>
            <div className="flex justify-between items-start mb-2">
                <p><strong>Cliente:</strong> {servico.nomeCliente}</p>
            </div>
            <p><strong>Aparelho:</strong> {servico.modeloAparelho}</p>
            <p><strong>Defeito:</strong> {servico.defeito}</p>
            
            <div className="flex items-center gap-2 mt-2">
                <strong className="text-sm">Status:</strong>
                <select 
                    value={servico.status}
                    onChange={(evento) => mudarStatus(index, evento.target.value)}
                    className="border border-gray-400 rounded px-2 py-1 text-sm bg-white text-black"
                >
                    <option value="Aberto">Aberto</option>
                    <option value="Finalizado">Finalizado</option>
                </select>
            </div>

        </div>
    )
}

export default ServiceCard
