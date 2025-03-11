import { FC } from 'react';
import classNames from 'classnames';
import { useLocation } from 'react-router';
import './icons-component.component.scss';

import { useSidebarRoutingKeys } from '~shared/hooks/sidebar-routing-keys.hook.ts';
import {Link} from "react-router-dom";

interface Props {
  paths: string[];
  isBottom?: boolean;
}

const IconsComponent: FC<Props> = ({ paths, isBottom = false }) => {
  const location = useLocation();
  const path = '/' + location.pathname.split('/')[1];
  const { capitalize, getIcon } = useSidebarRoutingKeys();
  
  return (
    <nav className={classNames('sidebar__navigation', 'navigation', isBottom ? 'navigation--bottom' : 'navigation--middle')}>
      {paths.map(pathForLink => {
        const iconWithType = getIcon(pathForLink)
        const Icon = iconWithType[0];
        
        return (
          <Link
            key={pathForLink}
            to={pathForLink}
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
          </Link>
        )
      })}
    </nav>
  )
}

export default IconsComponent;
