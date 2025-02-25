import React, { FC } from 'react';
import './button.component.scss';
import classNames from "classnames";

interface ButtonProps {
  belongsTo: string;
  children: string;
  callback: () => void;
  isSecondary?: boolean;
  isDisabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  belongsTo,
  children,
  callback,
  isSecondary = false,
  isDisabled = false,
}) => {
  const classes = classNames(
    `${belongsTo}__button`,
    'button',
    { 'button--secondary': isSecondary },
  );
  
  return (
    <button
      className={classes}
      onClick={callback}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
