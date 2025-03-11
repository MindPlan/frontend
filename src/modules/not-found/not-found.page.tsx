import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '~store/auth.store.ts';

import { AnimatedImage } from './animations/animated-image.component';
import textureSrc from '~assets/animation-images/not-found-animation.png';

import './not-found-page.scss';
import './animations/not-found-animation.scss';

const NotFoundPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  
  return (
    <div className='not-found not-found__container'>
      <div
        id='not-found-lower-animation-container'
        className='not-found__animation-container'
      >
        <AnimatedImage
          textureSrc={textureSrc}
          containerId='not-found-lower-animation-container'
        />
      </div>

      <div
        id='not-found-upper-animation-container'
        className='not-found__animation-container'
      >
        <AnimatedImage
          textureSrc={textureSrc}
          containerId='not-found-upper-animation-container'
        />
      </div>

      <div className='not-found__content-container'>
        <h2 className='not-found__title'>404</h2>

        <h3 className='not-found__subtitle'>Oops! Looks like you're lost.</h3>

        <p className='not-found__subtitle-explanation'>
          The page you’re looking for does not exist or has been removed.
        </p>

        <div className='not-found__instructions-container'>
          <h4 className='not-found__try-text'>Try this:</h4>

          <ul className='not-found__instructions'>
            <li className='not-found__instruction'>Check the URL</li>
            
            <li className='not-found__instruction'>Use the search bar</li>
            
            <li className='not-found__instruction'>
              Go back to the
              
              <Link to={isAuthenticated ? '/dashboard' : '/login'} className='not-found__link'>
                {isAuthenticated ? 'Dashboard' : 'Login'}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
