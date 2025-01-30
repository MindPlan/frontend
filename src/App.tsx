import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PublicRoutes } from './modules/auth/components/public-routes.component';
import { PrivateRoutes } from './modules/auth/components/private-routes.components';
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
