import { useState } from "react"

export interface questionario{
    nomeCliente: string
    modeloAparelho: string
    defeito: string
    status: string
}

interface questionarioProps{
    onAddService: (servico: questionario) => void
}

export function NewServiceForm({onAddService}: questionarioProps){

    const[nomeCliente, setNomeCliente] = useState("")
    const[modeloAparelho, setModeloAparelho] = useState("")
    const[defeito, setDefeito] = useState("")
    const[status, setStatus] = useState("Aberto")

    function salvar(){

        if (nomeCliente.trim() === "" || modeloAparelho.trim() === "" || defeito.trim() === "") {
        alert("Preencha todos os campos");
        return
    }

        const novaOS: questionario = {nomeCliente, modeloAparelho, defeito, status}

        onAddService(novaOS)

        setNomeCliente("")
        setModeloAparelho("")
        setDefeito("")
        setStatus("Aberto")
    }

    return(
        <div className="bg-indigo-100 p-4 mx-auto w-100 rounded-lg shadow-md flex flex-col">
            <form>
                <strong>Nome do cliente:</strong>
                <input 
                value={nomeCliente}
                onChange={(evento)=> setNomeCliente(evento.target.value)}
                type="text"
                className="border-2 border-black-100 rounded-lg">
                </input>

                <br />
                <br />

                <strong>Modelo do aparelho:</strong>
                <input
                value={modeloAparelho}
                onChange={(evento)=> setModeloAparelho(evento.target.value)}
                type="text"
                className="border-2 border-black-100 rounded-lg">
                </input>

                <br />
                <br />

                <strong>Defeito apresentado:</strong>
                <input
                value={defeito}
                onChange={(evento)=> setDefeito(evento.target.value)}
                type="text"
                className="border-2 border-black-100 rounded-lg">
                </input>

                <br />
                <br />

                <strong>Status da Ordem de Serviço:</strong>
                <select
                    value={status}
                    onChange={(evento) => setStatus(evento.target.value)}
                    className="border-2 border-black-100 rounded-lg w-35 mb-6 px-2 py-1"
                >
                    <option value="Aberto">Aberto</option>
                    <option value="Finalizado">Finalizado</option>
                </select>

                <br />
                <br />
            <div className="flex justify-center">
                <strong><button
                type="button"
                onClick={salvar}
                className="w-20 mx-auto bg-cyan-400 text-black border-none rounded cursor-pointer">
                    Salvar
                </button></strong>
            </div>
        </form>
    </div>
    )
}

export default NewServiceForm
