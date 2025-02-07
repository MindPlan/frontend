import React from 'react';
import './button.component.scss';
import classNames from 'classnames';

interface Props {
  belongsTo?: string;
  text: string;
  callback: () => void;
}

export const Button: React.FC<Props> = ({
  belongsTo,
  text,
  callback,
}) => {
  const classes = classNames(
    `${belongsTo}__button`,
    'button',
  );
  
  return (
    <button
      className={classes}
      onClick={callback}
    >
      {text}
    </button>
  );
}
