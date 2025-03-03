import Home from '~assets/icons/home.svg';
import Task from '~assets/icons/task.svg';
import Inbox from '~assets/icons/inbox.svg';
import Calendar from '~assets/icons/calendar.svg';
import Goals from '~assets/icons/calendar.svg'; // Now the icon is the same as Calendar!!!
import Projects from '~assets/icons/project.svg';

/**
 * There are routing keys only for the sidebar panel!
 *
 * @example
 * const sidebarKeys = useSidebarRoutingKeys();
 * */
export const useSidebarRoutingKeys = () => {
  const pathsAsObject = {
    DASHBOARD: '/dashboard',
    TASKS: '/tasks',
    INBOX: '/inbox',
    CALENDAR: '/calendar',
    GOALS: '/goals',
    PROJECTS: '/projects'
  }
  
  const iconsForPaths = {
    dashboard: [Home, 'fill'],
    tasks: [Task, 'fill'],
    inbox: [Inbox, 'stroke'],
    calendar: [Calendar, 'stroke'],
    goals: [Goals, 'stroke'],
    projects: [Projects, 'stroke'],
  }
  
  const pathsAsArray = Object.keys(pathsAsObject).map(objKey => pathsAsObject[objKey]);
  
  const capitalize = (path: string): string => {
    // example: path = '/dashboard'
    // path.charAt(1) = 'd' (and we use toUpperCase for him). charAt(0) returns '/'
    // path.slice(2) = 'ashboard'
    // So we have 'D' + 'ashboard'
    return path.charAt(1).toUpperCase() + path.slice(2);
  }
  
  const getIcon = (path: string): string[] => {
    // icon = [svg, 'fill' or 'stroke'];
    const icon: string[] = iconsForPaths[path.slice(1)];
    
    if (!icon) {
      const err = `
      Component: Sidebar
      File: src/shared/hooks/sidebar-routing-keys.hook.ts
      
      Message: There is not any icons for the ${path} route! Check iconsForPath variable to provide it!
      `
      
      console.error(err);
      throw new Error(err)
    }
    
    return icon;
  }
  
  return {
    pathsAsObject,
    pathsAsArray,
    capitalize,
    getIcon
  }
}
