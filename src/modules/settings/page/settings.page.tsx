import { FC } from 'react';
import Sidebar from '~shared/components/sidebar/sidebar.component.tsx';
import './settings.page.scss';

const SettingsPage: FC = () => {
  return (
    <main className="settings-page">
      <Sidebar />
    </main>
  );
}

export default SettingsPage;
