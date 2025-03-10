import React from 'react';
import { Link } from 'react-router-dom';
import { NotFoundData } from './utils/not-found.data';
import { AnimatedImage } from './animations/animated-image.component';
import textureSrc from '~assets/animation-images/not-found-animation.png';
import './not-found-page.scss';
import './animations/not-found-animation.scss';

const NotFoundPage: React.FC = () => {
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
        <h2 className='not-found__title'>{NotFoundData.title}</h2>

        <h3 className='not-found__subtitle'>{NotFoundData.subtitle}</h3>

        <p className='not-found__subtitle-explanation'>
          {NotFoundData.subtitleExpl}
        </p>

        <div className='not-found__instructions-container'>
          <h4 className='not-found__try-text'>{NotFoundData.tryText}</h4>

          <ul className='not-found__instructions'>
            {NotFoundData.instructions.map((instruction, index) => (
              <li
                key={`instruction-${index}`}
                className='not-found__instruction'
              >
                {instruction.text}
                {instruction.link && (
                  <Link to='/dashboard' className='not-found__link'>
                    {instruction.link}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
