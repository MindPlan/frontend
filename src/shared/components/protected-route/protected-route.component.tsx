import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '~store/auth.store.ts';

const ProtectedRoute: FC = () => {
  const { isAuthenticated } = useAuthStore();
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/not-found" replace />
}

export default ProtectedRoute;
