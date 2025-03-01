import React from 'react';
import './sign-up-form.scss';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { authService } from '~modules/auth/services/auth.service';
import { RegistrationRequest } from '~auth/types/registration-request.type';

import Input from '~shared/components/input/input.component';
import { Button } from '~shared/components/button';
import Checkbox from "~shared/components/checkbox/checkbox.component.tsx";

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

  return (
    <form className='sign-up-form'>
      <Input
        belongsTo='sign-up'
        name='name'
        control={control}
        placeholder='First name'
        error={errors.name?.message}
      />
      
      <Input
        belongsTo='sign-up'
        name='surname'
        control={control}
        placeholder='Last name'
        error={errors.surname?.message}
      />
      
      <Input
        belongsTo='sign-up'
        name='email'
        control={control}
        placeholder='Email address'
        type='email'
        error={errors.email?.message}
      />
      
      <Input
        belongsTo='sign-up'
        name='password'
        control={control}
        placeholder='Password'
        type='password'
        error={errors.password?.message}
        rules={{
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
          validate: {
            hasUppercase: (value: string) =>
              /[A-Z]/.test(value) ||
              'Password must contain at least one uppercase letter',
            hasDigit: (value: string) =>
              /\d/.test(value) || 'Password must contain at least one digit',
            hasSymbol: (value: string) =>
              /[!@#$%^&*(),.?":{}|<>_]/.test(value) ||
              'Password must contain at least one special character',
          },
        }}
      />
      
      <Checkbox
        belongsTo="sign-up"
        name='agreeToTerms'
        control={control}
        labelText="I agree to the processing of Personal Data"
      />
  
      {errors.agreeToTerms && (
        <p className='error-message'>{errors.agreeToTerms.message}</p>
      )}

      <Button
        belongsTo='sign-up'
        callback={handleSubmit(onSubmit)}
        isDisabled={mutation.isPending }
      >
        Sign Up
      </Button>
    </form>
  );
};
