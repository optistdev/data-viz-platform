import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';

import AppRoutes from '@/routes/AppRoutes';
import Sidebar from '@/pages/layout/SideBar';
import Header from '@/pages/layout/Header';
import { useAuth } from '@/context/AuthContext';
import useAppSelector from '@/hooks/global/useAppSelector';
import Loading from '@/components/loading';

function App() {
  const { user } = useAuth();
  const { isMenuOpen, isLoading } = useAppSelector((state) => state.loading);

  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      {isLoading && <Loading />}
      <div className="flex">
        {user ? <Sidebar /> : <></>}
        <div className="w-full">
          <main
            className={`h-[calc(100vh-87px)] ${isMenuOpen ? 'md:ml-50' : 'md:ml-20'} 
              ${isMenuOpen ? 'md:w-[calc(100vw-216px)]' : 'md:w-[calc(100vw-96px)]'}  
                w-full transition-all duration-300`}
          >
            {user ? <Header /> : <></>}
            <AppRoutes />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
