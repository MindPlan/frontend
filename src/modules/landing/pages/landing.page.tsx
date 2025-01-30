import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './landing-page.module.scss';
import Logo from '~assets/svg/logo.svg';
import '../animations/landing-animation.js';
import './landing-animation.scss';
import ProgressBar from '../components/progress.bar';

interface LandingPageInfo {
  title: string;
  description: string;
  btnText: string;
}

const landingPageInfos: LandingPageInfo[] = [
  {
    title: 'Welcome to MindPlan',
    description:
      'Organize your time, achieve your goals, and stay productive while maintaining balance.',
    btnText: 'Continue',
  },
  {
    title: 'Track Your Progress Effortlessly',
    description:
      'Customize your tasks, prioritize with ease, and create a system. MindPlan adapts to your unique workflow to help you thrive.',
    btnText: 'Continue',
  },
  {
    title: 'Your Productivity, Your Way',
    description:
      'Visualize your journey, monitor milestones, and celebrate every achievement. With MindPlan, staying on top of your goals has never been easier.',
    btnText: "Let's get started",
  },
];

const LandingPage: React.FC = () => {

  const savedIndex = localStorage.getItem('landingPageIndex');
  const savedProgress = localStorage.getItem('landingPageProgress');

  const [index, setIndex] = useState<number>(
    savedIndex ? parseInt(savedIndex, 10) : 0
  );
  const [progress, setProgress] = useState<number>(
    savedProgress ? parseInt(savedProgress, 10) : 0
  );

  useEffect(() => {
    const targetProgress = ((index + 1) / landingPageInfos.length) * 100;
    let currentProgress = progress;

    const interval = setInterval(() => {
      if (currentProgress < targetProgress) {
        currentProgress += 1;
        setProgress(currentProgress);
      } else {
        clearInterval(interval);
      }
    }, 10);

    // Оновлюємо прогрес у localStorage
    localStorage.setItem('landingPageProgress', progress.toString());
    localStorage.setItem('landingPageIndex', index.toString());

    return () => clearInterval(interval);
  }, [index, progress]);

  const handleClick = () => {
    if (index < landingPageInfos.length - 1) {
      setIndex(index + 1);
      setProgress(progress + 1);
    }
  };

    const handleLogoClick = () => {
      setIndex(0);
      setProgress(0);
      localStorage.removeItem('landingPageIndex');
      localStorage.removeItem('landingPageProgress');
    };

  const currentInfo = landingPageInfos[index];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo} onClick={handleLogoClick}>
          <Logo />
        </div>
        <div>Button</div>
      </header>

      <section className={styles.textContainer}>
        <motion.div
          key={index}
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: '0%', opacity: 1 }}
          exit={{ x: '-100%', opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <h1 className={styles.title}>{currentInfo.title}</h1>
          <p className={styles.description}>{currentInfo.description}</p>
        </motion.div>

        <ProgressBar percentage={progress} />

        <div className={styles.btnContainer}>
          <button className={styles.continueBtnContainer} onClick={handleClick}>
            {currentInfo.btnText}
          </button>
        </div>
      </section>

      <div
        id='landingAnimationContainer'
        className={styles.animationContainer}
      ></div>
    </div>
  );
};

export default LandingPage;
