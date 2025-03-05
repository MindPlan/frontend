import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { PublicRoutes } from './routes/public.route.tsx';
import { PrivateRoutes } from './routes/private.route.tsx';
import useAuthStore from './store/auth.store';
import {GoogleOAuthProvider} from "@react-oauth/google";

const App: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <Router>
        {isAuthenticated ? <PrivateRoutes /> : <PublicRoutes />}
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App
