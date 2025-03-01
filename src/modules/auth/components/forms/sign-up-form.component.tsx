import './sign-up-form.scss';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { authService } from '~modules/auth/services/auth.service';
import { RegistrationRequest } from '~auth/types/registration-request.type';

import Input from '~shared/components/input/input.component.tsx';
import Button from '~shared/components/button.tsx';
import Checkbox from "~shared/components/checkbox/checkbox.component.tsx";

import { validator } from "~shared/utils/validator.util.ts";

interface SignUpFormValues extends RegistrationRequest {
  agreeToTerms: boolean;
}

interface SignUpFormProps {
  onSuccess: (email: string) => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<SignUpFormValues>({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      agreeToTerms: false,
    },
  });

  const mutation = useMutation({
    mutationFn: (data: SignUpFormValues) => authService.registration(data),
    onSuccess: (_, variables) => {
      alert(
        'Registration successful! Please check your email to confirm your account.'
      );
      onSuccess(variables.email);
    },
    onError: (error) => {
      console.error('Registration failed', error);
      alert('Something went wrong. Please try again.');
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    mutation.mutate(data);
  };
  
  // It is needed to remove errors, otherwise user does not have ability to click on input
  const onInputClick = () => {
    clearErrors()
  }

  return (
    <form className='sign-up-form'>
      <Input
        belongsTo='sign-up-form'
        name='name'
        control={control}
        placeholder='First name'
        error={errors.name?.message}
        rules={{
          required: 'is required',
          minLength: {
            value: 8,
            message: 'Length of the first name must be at lest 3 characters.'
          }
        }}
        onClick={onInputClick}
      />
      
      <Input
        belongsTo='sign-up-form'
        name='surname'
        control={control}
        placeholder='Last name'
        error={errors.surname?.message}
        rules={{
          required: 'is required',
          minLength: {
            value: 8,
            message: 'Length of the last name must be at lest 3 characters.'
          }
        }}
        onClick={onInputClick}
      />
      
      <Input
        belongsTo='sign-up-form'
        name='email'
        control={control}
        placeholder='Email address'
        type='email'
        error={errors.email?.message}
        rules={{
          required: 'E-mail is required',
          validate: (email: string) => validator.validateEmail(email),
        }}
        onClick={onInputClick}
      />
      
      {/*
        TODO for Vira: add a clickable eye-icon to the password input.
        
        I would recommend to create HOC creator
        const ClickableIcon = (Icon: string, onClick: () => void): ReactNode(i hope) => {}
        And provide this icon to this Input.
      */}
      
      <Input
        belongsTo='sign-up-form'
        name='password'
        control={control}
        placeholder='Password'
        type='password'
        error={errors.password?.message}
        rules={{
          required: 'Password is required',
          validate: (password: string) => validator.validatePassword(password),
        }}
        onClick={onInputClick}
      />
      
      <Checkbox
        belongsTo="sign-up-form"
        name='agreeToTerms'
        control={control}
        labelText="I agree to the processing of Personal Data"
      />
  
      {errors.agreeToTerms && (
        <p className='error-message'>{errors.agreeToTerms.message}</p>
      )}

      <Button
        belongsTo='sign-up-form'
        callback={handleSubmit(onSubmit)}
        isDisabled={mutation.isPending }
      >
        Sign Up
      </Button>
    </form>
  );
};
