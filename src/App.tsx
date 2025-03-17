import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Routing from "./routing.tsx";

const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <Router>
        <Routing />
      </Router>
    </GoogleOAuthProvider>
  )
}

export default App
