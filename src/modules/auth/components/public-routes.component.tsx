import React, {useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import { RedirectPage } from '../pages/redirect.page';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

// This page is for python developers to test extract info from Google jwt. This one will be deleted soon.
const GooglePage = () => {
  const [token, setToken] = useState<string | null>(null);
  
  return (
    <>
      <h1>Your token:</h1>
      <p>{token ? token : 'You need to sign in via google to see your token bro'}</p>
      
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={async ({ credential }) => {
            // const result = await authService.sendGoogleJWT(credential, 'registration');
            
            setToken(credential);
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          
          size="large"
        />
      </GoogleOAuthProvider>
      
      {token && <button onClick={() => window.navigator.clipboard.writeText(token)}>Copy token!</button>}
    </>
  )
}

export const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<>Landing</>}/>
    <Route path="/registration" element={<>Registration</>}/>
    <Route path="/login" element={<>Login</>}/>
    <Route path="/confirmation" element={<>Confirmation</>}/>
    <Route path="/dev/get-google-token" element={<GooglePage />} />
    <Route path="*" element={<RedirectPage/>}/>
  </Routes>
)