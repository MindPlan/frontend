import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const App: React.FC = () => {
  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={async ({ credential }) => {
            // const result = await authService.sendGoogleJWT(credential, 'registration');
            
            console.log(credential);
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
