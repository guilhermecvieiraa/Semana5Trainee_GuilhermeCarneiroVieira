import { useState } from "react"
import Header from "./components/Header"
import NewServiceForm from "./components/NewServiceForm"
import type { questionario } from "./components/NewServiceForm"
import ServiceCard from "./components/ServiceCard"

function App() {

    const [servicos, setServicos] = useState<questionario[]>([])

    function adicionarServico(novoServico: questionario){
      setServicos([...servicos, novoServico])
    }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Header />
      <NewServiceForm onAddService={adicionarServico} />
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-center">Serviços Cadastrados</h2>
        
        {servicos.map((servico, index) => (
          <ServiceCard key={index} servico={servico} />
        ))}
      </div>

    </div>
  )
}

export default App

