import React from 'react'
import FrontImage from '../../media/images/RockConcert_NoBG.png';

import "./WelcomeComponent.styles.css";

const FrontMedia = () => {
  return (
    <div className='front-media-div'>
      <img src={FrontImage} className='front-media-img' />
    </div>
  )
}

export default FrontMedia