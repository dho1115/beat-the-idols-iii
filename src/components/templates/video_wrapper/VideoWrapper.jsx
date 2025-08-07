import React from 'react'

//Dependencies & components.
import { Card, CardText, CardTitle } from 'reactstrap';

import "./VideoWrapper.styles.css";

const VideoWrapper = ({ video_component, title, description, button_text, clickLogic, ...args }) => {
   const { username, idx } = args;
   return (
      <Card style={{border: idx%2==1 ? '3.5px solid lightseagreen' : '3.5px solid yellow', borderRadius: '15px'}}>
         <div className='w-100 p-0 card-video-div'>
            {video_component}
         </div>
         <CardTitle className='p-1'>
            <strong>{title}</strong>
         </CardTitle>
         <CardText className='px-1'><strong>Posted By: {username}</strong></CardText>
         <CardText className='px-1' style={{paddingBottom: '5px'}}>
            {description}
         </CardText>
         {
            (button_text && clickLogic)
            &&
            <div className='w-100'>
               <button type="button" className="btn btn-danger btn-lg btn-block" onClick={clickLogic || null}>{button_text}</button>
            </div>
         }
      </Card>
   )
}

export default VideoWrapper