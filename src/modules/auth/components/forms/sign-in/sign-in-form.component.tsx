import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import './sign-in.form.scss';

import { validator } from '~shared/utils/validator.util.ts';
import { authService } from '~modules/auth/services/auth.service.ts';

import { LoginRequest } from '~modules/auth/types/login-request.type.ts';
import { LoginResponse } from '~modules/auth/types/login-response.type.ts';

import Input from '~shared/components/input/input.component.tsx';
import Button from '~shared/components/button/button.component.tsx';
import useAuthStore from '~store/auth.store.ts';


export const SignInForm: React.FC = () => {
  const { login } = useAuthStore();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<LoginRequest>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const mutation = useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (res: LoginResponse) => login(res['access'], res['refresh']),
    onError: (error) => {
      console.error('Registration failed', error);
      alert('Something went wrong. Please try again.');
    },
  });
  
  const onSubmit = (data: LoginRequest) => {
    mutation.mutate(data);
  };
  
  // It is needed to remove errors, otherwise user does not have ability to click on input
  const onInputClick = () => {
    clearErrors()
  }
  
  return (
    <form className='sign-in-form'>
      <Input
        belongsTo='sign-in-form'
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
        belongsTo='sign-in-form'
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
      
      <Button
        belongsTo='sign-in-form'
        callback={handleSubmit(onSubmit)}
        isDisabled={mutation.isPending }
      >
        Sign Up
      </Button>
    </form>
  );
};
