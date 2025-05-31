import React from 'react'

//Dependencies.
import { Card } from 'reactstrap';

import "./Registration.styles.css"

const Registration = ({ title, link, mediaFormat, toggle }) => {
   
   if (mediaFormat === 'uploadedVideo') {
      return (
         <Card className='registration-card mx-3' onClick={toggle}>
            <video muted loop autoPlay className='registration-video'>
               <source src={link} type="video/mp4" />
               <source src={link} type="video/ogg" />
               Your browser does not support the video tag.
            </video>
            <h1 className='registration-title'>{title}</h1>
         </Card>
      )
   } else if (mediaFormat === 'image') {
      return (
         <Card className='registration-card' onClick={() => console.log("Toggle the Modal.")}>
            <img src={link} className='registration-img' />
            <h3 className='registration-title'>{title}</h3>
         </Card>
      )
   } else {
      return (
         <div>
            <h3>SORRY... YOU MUST ENTER "uploadedVideo" or "image" for mediaFormat prop.</h3>
         </div>
      )
   }
}

export default Registration