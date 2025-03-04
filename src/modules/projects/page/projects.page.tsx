import { FC } from 'react';
import Sidebar from '~shared/components/sidebar/sidebar.component.tsx';
import './projects.page.scss';

const ProjectsPage: FC = () => {
  return (
    <main className="projects-page">
      <Sidebar />
    </main>
  );
}

export default ProjectsPage;
