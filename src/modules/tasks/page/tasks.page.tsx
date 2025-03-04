import { FC } from 'react';
import Sidebar from '~shared/components/sidebar/sidebar.component.tsx';

const TasksPage: FC = () => {
  return (
    <main className="tasks-page">
      <Sidebar />
    </main>
  );
}

export default TasksPage;
