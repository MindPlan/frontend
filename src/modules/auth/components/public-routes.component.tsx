import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { RedirectPage } from '../pages/redirect.page';

export const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<>Landing</>}/>
    <Route path="/registration" element={<>Registration</>}/>
    <Route path="/login" element={<>Login</>}/>
    <Route path="/confirmation" element={<>Confirmation</>}/>
    <Route path="*" element={<RedirectPage/>}/>
  </Routes>
)