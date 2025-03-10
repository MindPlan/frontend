import { FC } from 'react';
import './sidebar.component.scss';
import { useSidebarRoutingKeys } from '~shared/hooks/sidebar-routing-keys.hook.ts';

import srcToLogoPNG from '~assets/png/logo-for-sidebar.png';
import IconsComponent from "./icons-component/icons-component.component.tsx";

const Sidebar: FC = () => {
  const { pathsAsArray, bottomPathsAsArray } = useSidebarRoutingKeys();
  
  return (
    <aside className="dashboard__sidebar sidebar">
      <div className="sidebar__logo-block">
        <img src={srcToLogoPNG} alt="MindPlan Logo"/>
        
        <p>MindPlan</p>
      </div>
      
      <IconsComponent paths={pathsAsArray} />
      
      <IconsComponent paths={bottomPathsAsArray} isBottom={true} />
    </aside>
  )
}

export default Sidebar;
