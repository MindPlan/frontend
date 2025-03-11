import React from 'react';
import './subtitle-secondary.scss';

interface SubtitleSecondaryProps {
  text: string;
}

const SubtitleSecondary = ({ text }: SubtitleSecondaryProps) => {
  return <h2 className='subtitle-secondary'>{text}</h2>;
};

export default SubtitleSecondary;
