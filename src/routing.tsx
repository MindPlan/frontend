import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from "./shared/components/protected-route/protected-route.component.tsx";

import { RedirectPage } from '~modules/auth/pages/redirect.page.tsx';
import LandingPage from '~modules/landing/pages/landing.page';
import RegistrationPage from '~modules/auth/pages/registration/registration.page';
import LoginPage from '~modules/auth/pages/login/login.page';
import GooglePage from '~shared/dev/google-token-dev.page.tsx';
import UIDevPage from '~shared/dev/ui-dev.page.tsx';
import NotFoundPage from '~/modules/not-found/not-found.page.tsx';

import Dashboard from '~modules/dashboard/pages/dashboard.page.tsx';
import TasksPage from '~/modules/tasks/page/tasks.page.tsx';
import InboxPage from '~modules/inbox/page/inbox.page.tsx';
import CalendarPage from '~modules/calendar/page/calendar.page.tsx';
import GoalsPage from '~modules/goals/page/goals.page.tsx';
import ProjectsPage from '~modules/projects/page/projects.page.tsx';
import SettingsPage from '~modules/settings/page/settings.page.tsx';

const Routing = () => (
  <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route path='/registration' element={<RegistrationPage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/confirmation' element={<>Confirmation</>} />
    <Route path='/dev/get-google-token' element={<GooglePage />} />
    <Route path='/dev/ui' element={<UIDevPage />} />
    <Route path='/not-found' element={<NotFoundPage />} />
    
    
    <Route element={<ProtectedRoute />} >
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/inbox" element={<InboxPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/goals" element={<GoalsPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Route>
    
    <Route path='*' element={<RedirectPage />} />
  </Routes>
)

export default Routing;
