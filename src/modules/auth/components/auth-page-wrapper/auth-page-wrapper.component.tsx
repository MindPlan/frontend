import React, { ReactNode, useState } from 'react';
import { AppleIcon, ArrowBackIcon } from '~assets/svg/index';
import Logo from '~assets/svg/logo.svg';
import TitleSecondary from '~modules/auth/components/titles/title-secondary/title-secondary.component';
import SubtitleSecondary from '../../components/subtitles/subtitle-secondary/subtitle-secondary.component';
import './auth-page-wrapper.scss';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from "@react-oauth/google";
import { authService } from "../../services/auth.service.ts";

interface AuthPageWrapperProps {
  children: ReactNode;
  isSubmitted: boolean;
  userEmail: string;
}

const AuthPageWrapper: React.FC<AuthPageWrapperProps> = ({
  children,
  isSubmitted,
  userEmail,
}) => {
  const navigate = useNavigate();
  const [showInput, setShowInput] = useState<boolean>(false);

  const goToLandingPage = () => {
    navigate('/');
  };

  const handleReload = () => {
    window.location.reload();
  };

  const goToLoginPage = () => {
    navigate('/login');
  };

  return (
    <div className='auth auth__wrapper'>
      <header className='auth__header'>
        <div className='auth__logo-container' onClick={handleReload}>
          <Logo />
        </div>

        <div className='auth__back-button' onClick={goToLandingPage}>
          <ArrowBackIcon className='auth__arrow-back' />
          <span className='auth__back-text'>Go back</span>
        </div>
      </header>
      <div
        className={
          isSubmitted
            ? 'auth__content-container--wide'
            : 'auth__content-container'
        }
      >
        <div className='auth__content'>
          <div
            className={
              isSubmitted
                ? 'auth__title-container--wide'
                : 'auth__title-container'
            }
          >
            <TitleSecondary
              text={
                isSubmitted ? 'Confirm your email' : 'Take Control of Your Time'
              }
            />
          </div>
          <div className='auth__subtitle-container'>
            <SubtitleSecondary
              text={
                isSubmitted
                  ? `The link has been sent to ${userEmail}`
                  : 'Sign up to start  your 30 days free trial'
              }
            />
          </div>
          {showInput && (
            <input
              type='text'
              placeholder='Enter something...'
              className='auth__input'
            />
          )}
          {isSubmitted ? (
            <button onClick={() => setShowInput(true)}>Connect</button>
          ) : (
            <>
              <div className='auth__loginwith-container loginwith-container'>
                <div className='loginwith-container__icon-container'>
                  <GoogleLogin
                    onSuccess={async ({ credential }) => {
                      await authService.sendGoogleJWT(credential, 'registration');
                    }}
                    onError={() => {
                      console.log('Login Failed');
                    }}
                    
                    size='large'
                    shape='circle'
                    type='icon'
                    theme="filled_blue"
                  />
                </div>
                <div className='loginwith-container__icon-container'>
                  <AppleIcon width='24px' height='24px' />
                </div>
              </div>
              <div className='auth__auth-divider auth-divider'>
                <div className='auth-divider__insertion'>
                  <span>or</span>
                </div>
              </div>
            </>
          )}
        </div>
        <div>{children}</div>
        <div className='auth__login-text'>
          Already have an account?{' '}
          <span onClick={goToLoginPage} className='auth__login'>
            Log in
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthPageWrapper;
