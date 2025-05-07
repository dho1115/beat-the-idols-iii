import React from 'react'

import backVideo from '../../media/videos/RockBand4.mp4';

const BackMedia = () => {
  return (
    <video muted width="100%" height="100%" className='back-video'>
      <source src={backVideo} type='video/mp4' />
      <source src={backVideo} type='video/ogg' />
      <h5>Sorry... your browser does not support this video.</h5>
    </video>
  )
}

export default BackMedia