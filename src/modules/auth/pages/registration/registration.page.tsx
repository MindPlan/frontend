import React, { useEffect, useState } from 'react';
import { initRegistrationAnimation } from '~modules/auth/animations/registration/registration-animation';
import AuthPageWrapper from '~modules/auth/components/auth-page-wrapper/auth-page-wrapper.component';
import './registration.scss';
import '~modules/auth/animations/registration/registration-animation.scss';
import TitleAnimation from '../../components/titles/title-animation/title-animation.component';
import SubtitleAnimation from '../../components/subtitles/subtitle-animation/subtitle-animation.component';
import { SignUpForm } from '~/modules/auth/components/forms/sign-up-form.component';
import { AuthInfos } from '~modules/auth/utils/auth.data';
import { AnimatePresence, motion } from 'framer-motion';

const RegistrationPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const cleanup = initRegistrationAnimation();
    return () => cleanup && cleanup();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % AuthInfos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='registration registration__container'>
      <AuthPageWrapper userEmail={userEmail} isSubmitted={isSubmitted}>
        {!isSubmitted && (
          <SignUpForm
            onSuccess={(email) => {
              setUserEmail(email);
              setIsSubmitted(true);
            }}
          />
        )}
      </AuthPageWrapper>
      <div className='registration__animation-container animation-container'>
        <div
          className='registration-animation'
          id='registration-animation-container'
        ></div>
        <div className='animation-container__text-container'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 1.5 }}
            >
              <TitleAnimation text={AuthInfos[index].title} />
              <SubtitleAnimation text={AuthInfos[index].description} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
