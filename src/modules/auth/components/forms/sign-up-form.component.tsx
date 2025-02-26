import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { authService } from '~modules/auth/services/auth.service';
import Input from '~shared/components/input/input.component';
import './sign-up-form.scss';
import { RegistrationRequest } from '~auth/types/registration-request.type';
import { Button } from '~shared/components/button';

interface SignUpFormValues extends RegistrationRequest {
  repeatPassword: string;
  agreeToTerms: boolean;
}

interface SignUpFormProps {
  onSuccess: (email: string) => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      repeatPassword: '',
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
      <div className='sign-up-form__field'>
        <Input
          belongsTo='sign-up'
          name='name'
          control={control}
          placeholder='First name'
          error={errors.name?.message}
        />
      </div>
      <div className='sign-up-form__field'>
        <Input
          belongsTo='sign-up'
          name='surname'
          control={control}
          placeholder='Last name'
          error={errors.surname?.message}
        />
      </div>
      <div className='sign-up-form__field'>
        <Input
          belongsTo='sign-up'
          name='email'
          control={control}
          placeholder='Email address'
          type='email'
          error={errors.email?.message}
        />
      </div>
      <div className='sign-up-form__field'>
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
              hasUppercase: (value) =>
                /[A-Z]/.test(value) ||
                'Password must contain at least one uppercase letter',
              hasDigit: (value) =>
                /\d/.test(value) || 'Password must contain at least one digit',
              hasSymbol: (value) =>
                /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                'Password must contain at least one special character',
            },
          }}
        />
      </div>
      <div className='sign-up-form__field'>
        <Input
          belongsTo='sign-up'
          name='repeatPassword'
          control={control}
          placeholder='Repeat your password'
          type='password'
          error={errors.repeatPassword?.message}
          rules={{
            required: 'Please confirm your password',
            validate: (value) =>
              value === watch('password') || 'Passwords do not match',
          }}
        />
      </div>

      <Controller
        name='agreeToTerms'
        control={control}
        rules={{ required: 'You must agree to continue' }}
        render={({ field }) => (
          <label className='checkbox'>
            <input type='checkbox' {...field} /> I agree to the processing of
            Personal Data
          </label>
        )}
      />
      {errors.agreeToTerms && (
        <p className='error-message'>{errors.agreeToTerms.message}</p>
      )}

      <Button
        belongsTo='sign-up'
        children='Sign Up'
        callback={handleSubmit(onSubmit)}
        isDisabled={mutation.isPending}
      />
    </form>
  );
};
