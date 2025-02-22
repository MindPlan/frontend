import React, { useEffect } from 'react';
import { initRegistrationAnimation } from '~modules/auth/animations/registration/registration-animation';
import styles from './registration.module.scss';

const RegistrationPage = () => {
  useEffect(() => {
    const cleanup = initRegistrationAnimation();
    return () => cleanup && cleanup();
  }, []);

  return (
    <div className={styles.container}>
      RegistrationPage
      <div id='registration-animation-container'></div>
    </div>
  );
};

export default RegistrationPage;
