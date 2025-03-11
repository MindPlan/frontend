import React from 'react';
import './title-secondary.scss';

interface TitleSecondaryProps {
  text: string;
}

const TitleSecondary = ({ text }: TitleSecondaryProps) => {
  return <h2 className='title-secondary'>{text}</h2>;
};

export default TitleSecondary;
