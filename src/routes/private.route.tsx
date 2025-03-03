import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RedirectPage } from '../modules/auth/pages/redirect.page.tsx';

export const PrivateRoutes = () => (
  <Routes>
    <Route path="*" element={<RedirectPage/>}/>
  </Routes>
)
