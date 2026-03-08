import { useState } from "react"

interface questionario {
    nomeCliente: string
    modeloAparelho: string
    defeito: string
    statusDefeito: boolean
    statusManutencao: string
}

function NewServiceForm(){

    return(
        <div className="bg-indigo-100 p-4 mx-auto w-100 rounded-lg shadow-md flex flex-col">
            <form>
                <strong>Nome do cliente:</strong>
                <input className="border-2 border-black-100 rounded-lg"  type="text"></input>

                <br />
                <br />

                <strong>Modelo do aparelho:</strong>
                <input type="text" className="border-2 border-black-100 rounded-lg"></input>

                <br />
                <br />

                 <strong>Defeito apresentado:</strong>
                <input type="text" className="border-2 border-black-100 rounded-lg"></input>

                <br />
                <br />

                <strong><button className="w-20 mx-auto bg-cyan-400 text-black border-none rounded cursor-pointer">Salvar</button></strong>
            </form>
        </div>
    )
}

export default NewServiceForm
