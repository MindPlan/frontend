import { FC } from 'react';
import Sidebar from '~shared/components/sidebar/sidebar.component.tsx';
import './inbox.page.scss';

const InboxPage: FC = () => {
  return (
    <main className="inbox-page">
      <Sidebar />
    </main>
  );
}

export default InboxPage;
