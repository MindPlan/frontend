import { FC } from 'react';
import { useLocation } from 'react-router';
import classNames from "classnames";
import './sidebar.component.scss';
import { useSidebarRoutingKeys } from '~shared/hooks/sidebar-routing-keys.hook.ts';

const Sidebar: FC = () => {
  const location = useLocation();
  const path = '/' + location.pathname.split('/')[1];
  const { pathsAsArray, capitalize, getIcon } = useSidebarRoutingKeys();
  
  return (
    <main className="dashboard">
      <aside className="dashboard__sidebar sidebar">
        <div className="sidebar__logo-block">
          <img alt="MindPlan logo"/>
          
          <p>MindPlan</p>
        </div>
        
        <nav className="sidebar__navigation navigation">
          {pathsAsArray.map(pathForLink => {
            const iconWithType = getIcon(pathForLink)
            const Icon = iconWithType[0];
            
            return (
              <a
                key={pathForLink}
                href={pathForLink}
                className={
                  classNames(
                    'navigation__link',
                    pathForLink === path && 'navigation__link--active',
                    iconWithType[1] === 'fill' && 'navigation__link--change-fill',
                    iconWithType[1] === 'stroke' && 'navigation__link--change-stroke'
                  )
                }
              >
                {Icon && <Icon/>} {capitalize(pathForLink)}
              </a>
            )
          })}
        </nav>
      </aside>
    </main>
  )
}

export default Sidebar;
