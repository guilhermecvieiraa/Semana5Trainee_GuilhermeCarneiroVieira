import {Routes, Route} from 'react-router'
import MainLayout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Clients from './pages/clients'
import ServiceOrders from './pages/service-orders'

const App = () => {
  return(
    <Routes>
      <Route path="/" element={<MainLayout />}>
        
        <Route index element={<Dashboard />} />
        
        <Route path="clients" element={<Clients />} />
        
        <Route path="service-orders" element={<ServiceOrders />} />
        
      </Route>
    </Routes>
  )
}

export default App

