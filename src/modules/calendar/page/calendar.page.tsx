import { FC } from 'react';
import Sidebar from '~shared/components/sidebar/sidebar.component.tsx';
import './calendar.page.scss';

const CalendarPage: FC = () => {
  return (
    <main className="calendar-page">
      <Sidebar />
    </main>
  );
}

export default CalendarPage;
