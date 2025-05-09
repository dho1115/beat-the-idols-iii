import React, { useRef, useEffect } from 'react'

import { Parallax } from 'react-parallax';

import backVideo from '../../media/videos/RockBand4.mp4';

import './WelcomeComponent.styles.css'

const BackMedia = () => {  
  return (
    <video muted autoPlay loop playsInline className='back-video'>
      <source src={backVideo} type='video/mp4' />
      <source src={backVideo} type='video/ogg' />
      <h5>Sorry... your browser does not support this video.</h5>
    </video>
  )
}

export default BackMedia