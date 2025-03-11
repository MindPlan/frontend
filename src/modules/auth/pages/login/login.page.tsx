import React, {useEffect, useState} from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { initLoginAnimation } from '~/modules/auth/animations/login/login-animation';
import './login.page.scss';
import TitleAnimation from "../../components/titles/title-animation/title-animation.component.tsx";
import SubtitleAnimation from "../../components/subtitles/subtitle-animation/subtitle-animation.component.tsx";
import {AuthInfos} from '~modules/auth/utils/auth.data';
import AuthPageWrapper from "../../components/auth-page-wrapper/auth-page-wrapper.component.tsx";
import {SignInForm} from "../../components/forms/sign-in/sign-in-form.component.tsx";

const LoginPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    return initLoginAnimation();
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % AuthInfos.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  
  return (
    <div className="login login__container">
      <AuthPageWrapper userEmail={userEmail} isSubmitted={isSubmitted}>
        {!isSubmitted && (
          <SignInForm />
        )}
      </AuthPageWrapper>
      
      <div className='login__animation-container animation-container'>
        <div id='login-animation-container' />
        
        <div className='animation-container__text-container'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={index}
              initial={{opacity: 0, y: 0}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: 0}}
              transition={{duration: 1.5}}
            >
              <TitleAnimation text={AuthInfos[index].title}/>
              <SubtitleAnimation text={AuthInfos[index].description}/>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
