import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import { RedirectPage } from '../pages/redirect.page';
import LandingPage from '~/modules/landing/pages/landing.page';
import RegistrationPage from '~/modules/auth/pages/registration/registration.page';
import LoginPage from '~/modules/auth/pages/login/login.page';

import Input from "~shared/components/input/input.component.tsx";
import Icon1 from '~assets/icons/email.svg'

// This page is for python developers to test extract info from Google jwt. This one will be deleted soon.
const GooglePage = () => {
  const [token, setToken] = useState<string | null>(null);
  const { control } = useForm<{ test: string }>();

  return (
    <div style={{ maxWidth: '500px' }}>
      <h1>Your token:</h1>
      <p>
        {token ? token : 'You need to sign in via google to see your token bro'}
      </p>

      {/*<GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>*/}
      {/*  <GoogleLogin*/}
      {/*    onSuccess={async ({ credential }) => {*/}
      {/*      // const result = await authService.sendGoogleJWT(credential, 'registration');*/}
      
      {/*      setToken(credential);*/}
      {/*    }}*/}
      {/*    onError={() => {*/}
      {/*      console.log('Login Failed');*/}
      {/*    }}*/}
      {/*    size='large'*/}
      {/*  />*/}
      {/*</GoogleOAuthProvider>*/}

      {token && (
        <button onClick={() => window.navigator.clipboard.writeText(token)}>
          Copy token!
        </button>
      )}
      
      <hr />
      <h2>UI KIT!!!!!!!! OH YEAHHHHHH</h2>
      
      <Input
        belongsTo="ui-page"
        name="test"
        control={control}
        placeholder="Type some text here"
        label="Test-text field"
        LeftIcon={Icon1}
        RightIcon={Icon1}
      />
    </div>
  );
};

export const PublicRoutes = () => (
  <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route path='/registration' element={<RegistrationPage />} /> 
    <Route path='/login' element={<LoginPage />} /> 
    <Route path='/confirmation' element={<>Confirmation</>} />
    <Route path='/dev/get-google-token' element={<GooglePage />} />
    <Route path='*' element={<RedirectPage />} />
  </Routes>
);
