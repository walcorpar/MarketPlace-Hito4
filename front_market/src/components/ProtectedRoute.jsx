import { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function ProtectedRoute() {
  const { token, authLoading } = useContext(UserContext);
  const location = useLocation();

  if (authLoading) {
    return <div className="page-status" role="status">Verificando tu sesión...</div>;
  }

  return token ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
}
