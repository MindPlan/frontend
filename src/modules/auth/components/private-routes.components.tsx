import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {RedirectPage} from "../pages/redirect.page";

export const PrivateRoutes = () => (
  <Routes>
    <Route path="/dashboard" element={<>Dashboard</>}/>
    <Route path="*" element={<RedirectPage/>}/>
  </Routes>
)
