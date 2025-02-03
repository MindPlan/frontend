import React, { FC } from 'react';
import classNames from "classnames";

interface ButtonProps {
  belongsTo: string;
  label: string;
  onClick: () => void;
  isSecondary?: boolean;
  isDisabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  belongsTo,
  label,
  onClick,
  isSecondary = false,
  isDisabled = false,
}) => {
  const classes = classNames(
    `${belongsTo}__button`,
    'button',
    { 'button--secondary': isSecondary },
  )
  
  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={isDisabled}
    >
      {label}
    </button>
  )
}
