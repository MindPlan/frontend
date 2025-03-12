import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { RedirectPage } from '../modules/auth/pages/redirect.page.tsx';
import LandingPage from '~modules/landing/pages/landing.page';
import RegistrationPage from '~modules/auth/pages/registration/registration.page';
import LoginPage from '~modules/auth/pages/login/login.page';
import GooglePage from '~shared/dev/google-token-dev.page.tsx';
import UIDevPage from '~shared/dev/ui-dev.page.tsx';
import NotFoundPage from '~/modules/not-found/not-found.page.tsx';

export const PublicRoutes = () => (
  <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route path='/registration' element={<RegistrationPage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/confirmation' element={<>Confirmation</>} />
    <Route path='/dev/get-google-token' element={<GooglePage />} />
    <Route path='/dev/ui' element={<UIDevPage />} />
    <Route path='/not-found' element={<NotFoundPage />} /> 

    <Route path='*' element={<RedirectPage />} />
  </Routes>
);
