import React from 'react';
import './title-animation.scss';

interface TitleAnimationProps {
  text: string;
}

const TitleAnimation = ({ text }: TitleAnimationProps) => {
  return <h3 className='title-animation'>{text}</h3>;
};

export default TitleAnimation;
