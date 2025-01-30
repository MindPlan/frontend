import React, { useEffect } from 'react';
import { initLoginAnimation } from '~modules/auth/animations/login/login-animation.js';
import styles from './login.module.scss';

const LoginPage = () => {
  useEffect(() => {
    const cleanup = initLoginAnimation();
    return () => cleanup && cleanup();
  }, []);

  return (
    <div className={styles.container}>
      LoginPage
      <div id='loginAnimationContainer'></div>
    </div>
  );
};

export default LoginPage;
