import React, { FC } from 'react';
import './button.component.scss';
import classNames from "classnames";

interface ButtonProps {
  belongsTo: string;
  children: string;
  callback: () => void;
  isSecondary?: boolean;
  isDisabled?: boolean;
  small?: boolean;
  LeftIcon?: string;
  RightIcon?: string;
}

export const Button: FC<ButtonProps> = ({
  belongsTo,
  children,
  callback,
  isSecondary = false,
  isDisabled = false,
  small = false,
  LeftIcon,
  RightIcon,
}) => {
  const classes = classNames(
    `${belongsTo}__button`,
    'button',
    isSecondary && 'button--secondary',
    small && 'button--small',
  );
  
  return (
    <button
      className={classes}
      onClick={callback}
      disabled={isDisabled}
    >
      {LeftIcon && <LeftIcon/>}
      
      {children}
      
      {RightIcon && <RightIcon/>}
    </button>
  );
}
