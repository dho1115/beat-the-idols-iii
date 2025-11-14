import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { dataContext } from '../../../App';

//components
import YouTubeVideo from '../../templates/video/you_tube/YouTubeVideo';
import UploadVideo from '../../templates/video/upload/UploadVideo';
import VideoWrapper from '../../templates/video_wrapper/VideoWrapper';

import "../Challenges.styles.css";

const AddVideosToChallenge = ({ showEligibleVideos }) => {
   const { id: _challengeAnnouncementID } = useParams;

   const handleAddVideoToChallenge = (id, _userID, title, username) => {
      console.log(`Added ${title} by ${username} (_videoID #${id}) into the challenge!!!`)
   }

   return (
      <div className='eligible-videos-container p-3 my-3'>
         {
            showEligibleVideos().map(({ id, _userID, description, username, title, videoType, urlOrFile }, idx) => (
               <VideoWrapper
                  key={idx}
                  video_component={videoType == 'you-tube' ? <YouTubeVideo url={urlOrFile} /> : <UploadVideo file={urlOrFile} />}
                  title={title}
                  username={username}
                  button_text="SELECT THIS VIDEO!!!" clickLogic={() => handleAddVideoToChallenge(id, _userID, title, username)}
               />))
         }
      </div>
   )
}

export default AddVideosToChallenge

