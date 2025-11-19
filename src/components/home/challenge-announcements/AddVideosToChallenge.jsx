import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//components
import YouTubeVideo from '../../templates/video/you_tube/YouTubeVideo';
import UploadVideo from '../../templates/video/upload/UploadVideo';
import VideoWrapper from '../../templates/video_wrapper/VideoWrapper';

//contexts.
import { dataContext } from '../../../App';

//functions.
import { UpdateDataInDBThenSetState } from 'src/functions/updateapi';

import "../Challenges.styles.css";

const AddVideosToChallenge = ({ showEligibleVideos }) => {
   const [videoSubmissionStatus, setVideoSubmissionStatus] = useState(false);

   const { challengeAnnouncements, setChallengeAnnouncements } = useContext(dataContext);
   const { id: _challengeAnnouncementID } = useParams();

   const handleAddVideoToChallenge = async args => {
      try {
         setVideoSubmissionStatus(true);
         const { description, posted, ...challengeArgs } = args;
         const challengeVideoObject = { ...challengeArgs, challengeAccessories: { votes: 0, finalStatus: 'pending' } };

         const thisAnnouncementUpdated = challengeAnnouncements
            .map(announcement => {
               if (announcement.id == _challengeAnnouncementID) {
                  announcement.announcement.videosInChallenge.push(challengeVideoObject);
                  announcement.challenge.videosInChallenge.push(challengeVideoObject)
               }
               return announcement;
            }).find(announcement => announcement.id == _challengeAnnouncementID); //This is the { announcement } that will go into UpdateDataInDBTheSetState function (below).

         const updateDBandState = await UpdateDataInDBThenSetState(`http://localhost:3003/challengeAnnouncements/${_challengeAnnouncementID}`, thisAnnouncementUpdated, data => setChallengeAnnouncements(data))

         setVideoSubmissionStatus(false)

         return updateDBandState;
      } catch (error) {
         console.error({ message: "handleAddVideoToChallenge function call ERROR!!!", error, errorMessage: error.message, errorName: error.name, errorStack: error.stack });
      }
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