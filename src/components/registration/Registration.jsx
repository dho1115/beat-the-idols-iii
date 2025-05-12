import React from 'react'

//Dependencies.
import { Card } from 'reactstrap';

import "./Registration.styles.css"

const Registration = ({ title, link, mediaFormat }) => {
   
   if (mediaFormat === 'video') {
      return (
         <Card className='registration-card' onClick={() => console.log("Toggle the Modal.")}>
            <video muted loop autoPlay className='registration-video'>
               <source src={link} type="video/mp4" />
               <source src={link} type="video/ogg" />
               Your browser does not support the video tag.
            </video>
            <h3 className='registration-title'>{title}</h3>
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
            <h1>Please enter 'video' or 'image' for the third argument (mediaFormat).</h1>
         </div>
      )
   }
}

export default Registration