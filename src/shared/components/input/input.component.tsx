import React, { HTMLInputTypeAttribute } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from 'react-hook-form';
import './input.component.scss';
import classNames from 'classnames';

interface Props<T extends FieldValues> {
  belongsTo: string;
  name: Path<T>;
  control: Control<T>;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  label?: string;
  RightIcon?: string | JSX.Element;
  LeftIcon?: string;
  defaultValue?: PathValue<T, Path<T>>;
  error?: string;
  success?: boolean;
  disabled?: boolean;
  rules?: RegisterOptions<T, Path<T>>;
  onClick?: () => void;
}

/**
 * @param {string} belongsTo - belongsTo="form" -> the input has a class 'form__input'
 * @param {string} name - html attribute of the input
 * @param {string} label - text above the input
 * @param {svg} RightIcon - right icon in the input
 * @param {svg} LeftIcon - right icon in the input
 * @param {control} control - control from useForm func of 'react-hook-form' lib
 * @param defaultValue - default value of input
 * @param {string} type - html attr of the input
 * @param {string} placeholder - placeholder
 * @param {string} error - error text under the input
 * @param {boolean} success - if operation was successful
 * @param {boolean} disabled - html attr of the input
 * @param rules - rules for <Control rules={rules}> of the input
 * @param onClick - onClick fn
 * */
const Input = <T extends FieldValues>({
  belongsTo,
  name,
  label = '',
  RightIcon,
  LeftIcon,
  control,
  defaultValue,
  type = 'text',
  placeholder = '',
  error = '',
  success = false,
  disabled = false,
  rules,
  onClick,
}: Props<T>) => {
  return (
    <div
      className={classNames(
        `${belongsTo}__input-field`,
        'input-field',
        disabled && 'input-field--disabled',
        !!error?.length && 'input-field--error',
        success && 'input-field--success'
      )}
      onClick={onClick}
    >
      {label && (
        <label htmlFor={name} className='label'>
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => (
          <div className='input-wrapper'>
            {LeftIcon && (
              <div
                className={classNames(
                  'input__icon',
                  disabled && 'input__icon--disabled',
                  error?.length > 0 && 'input__icon--error',
                  success && 'input__icon--success'
                )}
              >
                <LeftIcon />
              </div>
            )}

            <input
              {...field}
              id={name}
              placeholder={placeholder}
              type={type}
              disabled={disabled}
              className={classNames(
                'input',
                !!LeftIcon && 'input--has-left-icon',
                !!RightIcon && 'input--has-right-icon',
                error.length && 'input--error',
                success && 'input--success'
              )}
            />

            {RightIcon && (
              <div
                className={classNames(
                  'input__icon input__icon--right',
                  disabled && 'input__icon--disabled',
                  error?.length > 0 && 'input__icon--error',
                  success && 'input__icon--success'
                )}
              >
                {RightIcon}
              </div>
            )}
          </div>
        )}
      />

      {error && <p className='error-message'>{error}</p>}
    </div>
  );
};

export default Input;
