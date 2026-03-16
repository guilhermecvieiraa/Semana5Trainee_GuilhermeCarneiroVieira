import { Outlet, Link } from 'react-router';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-6 mb-8">
        <h1 className="text-3xl text-blue-600 font-bold text-center mb-4">iRepair</h1>
        
        <nav className="flex justify-center gap-6 text-lg font-medium text-gray-600">
          <Link to="/" className="hover:text-blue-500">Dashboard</Link>
          <Link to="/clients" className="hover:text-blue-500">Clientes</Link>
          <Link to="/service-orders" className="hover:text-blue-500">Ordens de serviço</Link>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4 pb-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout