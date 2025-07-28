import React from 'react'

//Dependencies & components.
import { Card, CardText, CardTitle } from 'reactstrap';

const VideoWrapper = ({video_component, title, description, button_text, clickLogic}) => {
  return (
    <Card style={{border: '1.5px solid black', borderRadius: '15px'}}>
      <div className='w-100 p-0 card-video-div'>
         {video_component}
      </div>
      <CardTitle>
         <strong>{title}</strong>
      </CardTitle>
      <CardText>
         {description}
      </CardText>
      <div className='w-100'>
         <button type="button" className="btn btn-danger btn-lg btn-block" onClick={clickLogic || null}>{button_text}</button>
      </div>
    </Card>
  )
}

export default VideoWrapper