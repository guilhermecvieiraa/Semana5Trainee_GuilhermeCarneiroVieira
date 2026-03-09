import type { questionario } from "./NewServiceForm";

interface Props{
    servico: questionario
}

function ServiceCard({servico}: Props){
    return(
        <div className="border p-4 rounded shadow bg-white mb-4">
            <p><strong>Cliente:</strong>{servico.nomeCliente}</p>
            <p><strong>Aparelho:</strong> {servico.modeloAparelho}</p>
            <p><strong>Defeito:</strong> {servico.defeito}</p>
        </div>
    )
}

export default ServiceCard
