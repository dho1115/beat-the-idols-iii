import React from 'react'

import "./UploadVideo.styles.css";

const UploadVideo = ({ file }) => {
  const link = file;
  return (
    <video muted loop autoPlay className='upload-video-wrapper'>
      <source src={link} type='video/mp4' />
      <source src={link} type='video/ogg' />
      <strong>Your browser does not support the video tag.</strong>
    </video>
  )
}

export default UploadVideo