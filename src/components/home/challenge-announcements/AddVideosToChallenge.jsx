import React from 'react';
import { useParams } from 'react-router-dom';
//components
import YouTubeVideo from '../../templates/video/you_tube/YouTubeVideo';
import UploadVideo from '../../templates/video/upload/UploadVideo';
import VideoWrapper from '../../templates/video_wrapper/VideoWrapper';

const AddVideosToChallenge = ({ eligibleVideos }) => {
   const { id } = useParams;
   return (
      <>
         <h3>SELECT FROM THE VIDEOS BELOW TO ADD TO THIS CHALLENGE:</h3>
         <div className="eligibleVideosDiv">
               {
                  eligibleVideos.map((val, idx) => {
                     const video_component = val.videoType == 'you-tube' ? <YouTubeVideo url={val.urlOrFile} title={val.title} /> : <UploadVideo file={val.urlOrFile} />
                     
                     return (
                        <VideoWrapper
                           key={idx}
                           idx={idx}
                           video_component={video_component}
                           username={val.username}
                           title={val.title}
                           description={val.description}
                           button_text="ADD THIS VIDEO!!!"
                           clickLogic={() => console.log(`About to add ${JSON.stringify(val)} to challenge-announcement ${id}!!!`)}
                        />
                     )
                  })
               }
         </div>
      </>
   )
}

export default AddVideosToChallenge