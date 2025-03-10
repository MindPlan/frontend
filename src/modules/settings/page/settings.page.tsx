import { FC, useState } from 'react';
import './settings.page.scss';

import Sidebar from '~shared/components/sidebar/sidebar.component.tsx';
import SubPageToggler from "../components/sup-page-toggler/sub-page-toggler.components.tsx";
import { SubPage } from "../types/sub-page.type.ts";
import CalendarIcon from '~assets/icons/calendar.svg';
import classNames from "classnames";

const SettingsPage: FC = () => {
  const [subPage, setSubPage] = useState<SubPage>('my-profile');
  const date = new Date();
  const formattedDate = date.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  
  return (
    <div className="settings-page">
      <Sidebar />
      
      <div className="settings-page__container">
        <header className="settings-page__header">
          <div className="settings-page__mini-calendar mini-calendar">
            <CalendarIcon className="mini-calendar__icon" width="20px" height="20px" />
            
            <span className="mini-calendar__date">
              {formattedDate}
            </span>
          </div>
          
          <img
            className="settings-page__avatar"
            src=""
            alt="avatar"
          />
        </header>
        
        <main
          className={classNames(
            "settings-page__main",
            subPage === "my-profile" ? "main-my-profile" : "main-billing"
          )}
        >
          <div className={classNames(
            subPage === "my-profile" ? "main-my-profile__info" : "main-billing__info"
          )}>
            <h1 className={classNames(
              subPage === "my-profile" ? "main-my-profile__heading" : "main-billing__heading"
            )}>
              {subPage === "my-profile" ? "Settings" : "Billing"}
            </h1>
            
            <p className={classNames(
              subPage === "my-profile" ? "main-my-profile__description" : "main-billing__description"
            )}>
              {subPage === "my-profile"
                ? "Customize your experience by managing preferences, notifications, and account details."
                : "Manage your subscription and billing details effortlessly."
              }
            </p>
          </div>
          
          <SubPageToggler subPage={subPage} setSubPage={setSubPage} />
        </main>
      </div>
    </div>
  );
}

export default SettingsPage;
