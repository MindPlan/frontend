import React from 'react';
import './subtitle-animation.scss';

interface SubtitleAnimationProps {
  text: string;
}

const SubtitleAnimation = ({ text }: SubtitleAnimationProps) => {
  return <h3 className='subtitle-animation'>{text}</h3>;
};

export default SubtitleAnimation;
