// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const App: React.FC = () => {
  return (
    <>
      <GoogleOAuthProvider clientId="167874588301-27d7kgkfd056ju4jh7oidop7mnqv3cks.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(JSON.stringify(credentialResponse, null, 2));
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
