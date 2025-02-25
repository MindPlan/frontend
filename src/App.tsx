import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PublicRoutes } from './routes/public.route.tsx';
import { PrivateRoutes } from './routes/private.route.tsx';
import useAuthStore from './store/auth.store';

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <Router>
      {isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
    </Router>
  )
}

export default App
