// src/routes/index.tsx
import { Routes, Route, Navigate } from 'react-router-dom';

import { useAuth } from '@/context/AuthContext';
import LoginPage from '@/pages/login';
import DashboardPage from '@/pages/dashboard';
import RegisterPage from '@/pages/register';
import Loading from '@/components/loading';
import NotFoundPage from '@/pages/not-found';

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
      <Route path="/dashboard" element={user ? <DashboardPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
