import React, { useEffect } from 'react';
import { initLoginAnimation } from '~/modules/auth/animations/login/login-animation';
import styles from './login.module.scss';

const LoginPage = () => {
  useEffect(() => {
    const cleanup = initLoginAnimation();
    return cleanup;
  }, []);

  return (
    <div className={styles.container}>
      LoginPage
      <div id='login-animation-container'></div>
    </div>
  );
};

export default LoginPage;
