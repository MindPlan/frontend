import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { RedirectPage } from '~modules/auth/pages/redirect.page.tsx';
import Dashboard from '~modules/dashboard/pages/dashboard.page.tsx';
import TasksPage from '~/modules/tasks/page/tasks.page.tsx';
import InboxPage from '~modules/inbox/page/inbox.page.tsx';
import CalendarPage from '~modules/calendar/page/calendar.page.tsx';
import GoalsPage from '~modules/goals/page/goals.page.tsx';
import ProjectsPage from '~modules/projects/page/projects.page.tsx';
import SettingsPage from '~modules/settings/page/settings.page.tsx';

export const PrivateRoutes = () => (
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/tasks" element={<TasksPage />} />
    <Route path="/inbox" element={<InboxPage />} />
    <Route path="/calendar" element={<CalendarPage />} />
    <Route path="/goals" element={<GoalsPage />} />
    <Route path="/projects" element={<ProjectsPage />} />
    {/*<Route path="/settings" element={<SettingsPage />} />*/}
    
    <Route path="*" element={<RedirectPage/>}/>
  </Routes>
)
