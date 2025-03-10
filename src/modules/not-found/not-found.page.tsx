import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NotFoundData } from './utils/not-found.data';
import './not-found-page.scss';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className='not-found not-found__container'>
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
                {instruction.text}{' '}
                {instruction.link && (
                  <span
                    onClick={navigateToDashboard}
                    className='not-found__link'
                  >
                    {instruction.link}
                  </span>
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
