import React, { HTMLInputTypeAttribute, SVGProps } from 'react';
import {Control, Controller, FieldValues, Path, PathValue} from 'react-hook-form';
import './input.component.scss';
import classNames from "classnames";

interface Props<T extends FieldValues> {
  belongsTo: string;
  name: Path<T>;
  control: Control<T>;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  RightIcon?: React.FC<SVGProps<SVGSVGElement>>;
  defaultValue?: PathValue<T, Path<T>>;
  error?: string;
  disabled?: boolean;
}

const Input = <T extends FieldValues>({
  belongsTo,
  name,
  label = '',
  RightIcon,
  control,
  defaultValue,
  type = 'text',
  placeholder = '',
  error = '',
  disabled = false,
}: Props<T>) => {
  return (
    <div className={classNames(`${belongsTo}__input-field`, 'input-field')}>
      {label && (
        <label
          htmlFor={name}
          className={classNames(
            'label',
            error.length && 'label-error',
          )}
        >
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({field}) => (
          <>
            <input
              {...field}
              id={name}
              placeholder={placeholder}
              type={type}
              disabled={disabled}
              className={classNames(
                'input',
                error.length && 'input-error',
              )}
            />
            {RightIcon && (
              <span className="icon">
                <RightIcon className="icon__svg"/>
              </span>
            )}
          </>
        )}
      />
      {error && (
        <p className="error-message">
          {error}
        </p>
      )}
    </div>
  )
}

export default Input;