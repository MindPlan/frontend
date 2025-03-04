import { FC } from 'react';
import Sidebar from '~shared/components/sidebar/sidebar.component.tsx';
import './goals.page.scss';

const GoalsPage: FC = () => {
  return (
    <main className="goals-page">
      <Sidebar />
    </main>
  );
}

export default GoalsPage;
