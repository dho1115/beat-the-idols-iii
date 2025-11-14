import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//components
import YouTubeVideo from '../../templates/video/you_tube/YouTubeVideo';
import UploadVideo from '../../templates/video/upload/UploadVideo';
import VideoWrapper from '../../templates/video_wrapper/VideoWrapper';

//Contexts.
import { dataContext } from '../../../App';

import "../Challenges.styles.css";

const AddVideosToChallenge = ({ showEligibleVideos }) => {
   const [videoSubmissionStatus, setVideoSubmissionStatus] = useState(false);

   const { challengeAnnouncements, setChallengeAnnouncements } = useContext(dataContext);
   const { id: _challengeAnnouncementID } = useParams();

   const handleAddVideoToChallenge = args => {
      setVideoSubmissionStatus(true);
      const { description, posted, ...challengeArgs } = args;
      const challengeVideoObject = { ...challengeArgs, challengeAccessories: { votes: 0, finalStatus: 'pending' } };

      const updatedChallengeAnnouncements = challengeAnnouncements.map(announcement => {
         if (announcement.id == _challengeAnnouncementID) {
            announcement.announcement.videosInChallenge.push(challengeVideoObject);
            announcement.challenge.videosInChallenge.push(challengeVideoObject)
         }

         return announcement;
      })

      setChallengeAnnouncements(updatedChallengeAnnouncements);
      setVideoSubmissionStatus(false)

      console.log("===== CHALLENGE ANNOUNCEMENT UPDATED!!! =====");
      console.log(`challengeAnnouncment id ${_challengeAnnouncementID} has been updated with ${JSON.stringify(challengeVideoObject)}. The state, updatedChallengeAnnouncements is now: `, updatedChallengeAnnouncements);
      console.log("=============================================");
   }

   useEffect(() => {
      console.log("===== CHALLENGE ANNOUNCEMENT UPDATED!!! =====");
      console.log(`challengeAnnouncment id ${_challengeAnnouncementID} has been updated: `, challengeAnnouncements);
      console.log("=============================================");
   }, [videoSubmissionStatus])

   return (
      <div className='eligible-videos-container p-3 my-3'>
         {
            showEligibleVideos().map((val, idx) => (
               <VideoWrapper
                  key={idx}
                  urlOrFile={val.urlOrFile}
                  video_component={val.videoType == 'you-tube' ? <YouTubeVideo url={val.urlOrFile} /> : <UploadVideo file={val.urlOrFile} />}
                  record={val.record}
                  title={val.title}
                  username={val.username}
                  button_text="ADD TO CHALLENGE!!!" clickLogic={() => handleAddVideoToChallenge(val)}
               />
            ))
         }
      </div>
   )
}

export default AddVideosToChallenge

