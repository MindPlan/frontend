import { FC } from 'react';
import Sidebar from '~shared/components/sidebar/sidebar.component.tsx';
import './tasks.page.scss';

const TasksPage: FC = () => {
  return (
    <main className="tasks-page">
      <Sidebar />
    </main>
  );
}

export default TasksPage;
