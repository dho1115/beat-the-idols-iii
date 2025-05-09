import React from 'react'
import FrontImage from '../../media/images/RockConcert_NoBG.png';

import "./WelcomeComponent.styles.css";

const FrontMedia = () => {
  return (
    <img src={FrontImage} className='front-img' />
  )
}

export default FrontMedia