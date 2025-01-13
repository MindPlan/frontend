import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { authService } from './modules/auth/services/auth.service';

const App: React.FC = () => {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={async ({ credential }) => {
            const result = await authService.sendGoogleJWT(credential);
            
            console.log(result);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          
          size="large"
        />
      </GoogleOAuthProvider>
    </>
  )
}

export default App
