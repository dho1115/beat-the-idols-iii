import React, { Suspense } from 'react'
import SuspenseFallback from '../../suspense_fallback/SuspenseFallback';
//Dependencies & components.
import { Card, CardBody, CardFooter, CardText, CardTitle } from 'reactstrap';

import "./VideoWrapper.styles.css";

const VideoWrapper = ({ video_component, title, description, button_text, clickLogic, ...args }) => {
   const { username, idx } = args;
   return (
      <Card className='m-1' style={{ border: idx % 2 == 1 ? '3.5px solid lightseagreen' : '3.5px solid red', height: '100%', borderRadius: '15.3px' }}>
         <Suspense fallback={<SuspenseFallback />}>
            <div className='w-100 p-0 card-video-div'>
               {video_component}
            </div>
            <CardTitle className='p-1'>
               <strong>
                  {title.length > 15 ? title.substring(0, 15) + "..." : title}
               </strong>
            </CardTitle>
            <CardBody className='px-1'>
               <strong>Posted By: {username}</strong>
               {
                  description &&
                  <CardText className='px-1' style={{paddingBottom: '5px', height: '100%'}}>
                     {description}
                  </CardText>
               }
            </CardBody>            
            {
               (button_text && clickLogic)
               &&
               <CardFooter className='w-100' style={{backgroundColor: 'black'}}>
                  <button type="button" className="btn btn-danger btn-block w-100" onClick={clickLogic || null}>{button_text}</button>
               </CardFooter>
            }
         </Suspense>
      </Card>
   )
}

export default VideoWrapper