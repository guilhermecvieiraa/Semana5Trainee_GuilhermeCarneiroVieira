import { useState } from "react"

export interface questionario{
    nomeCliente: string
    modeloAparelho: string
    defeito: string
}

interface questionarioProps{
    onAddService: (servico: questionario) => void
}

export function NewServiceForm({onAddService}: questionarioProps){

    const[nomeCliente, setNomeCliente] = useState("")
    const[modeloAparelho, setModeloAparelho] = useState("")
    const[defeito, setDefeito] = useState("")

    function salvar(){
        const novaOS: questionario = {nomeCliente, modeloAparelho, defeito}

        onAddService(novaOS)

        setNomeCliente("")
        setModeloAparelho("")
        setDefeito("")
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

                <strong><button
                type="button"
                onClick={salvar}
                className="w-20 mx-auto bg-cyan-400 text-black border-none rounded cursor-pointer">
                    Salvar
                </button></strong>
            </form>
        </div>
    )
}

export default NewServiceForm
