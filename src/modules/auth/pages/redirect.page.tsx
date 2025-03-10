import React from 'react';
import { Navigate } from 'react-router-dom';

export const RedirectPage = () => <Navigate to="/not-found" replace />;
