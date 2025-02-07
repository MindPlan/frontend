import React from 'react';
import styles from './progress-bar.module.scss';

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className={styles.progressTrack}>
      <div
        className={styles.progressBar}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
