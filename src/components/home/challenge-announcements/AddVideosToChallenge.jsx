import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { dataContext } from '../../../App';

//components
import YouTubeVideo from '../../templates/video/you_tube/YouTubeVideo';
import UploadVideo from '../../templates/video/upload/UploadVideo';
import VideoWrapper from '../../templates/video_wrapper/VideoWrapper';

import "../Challenges.styles.css";

const AddVideosToChallenge = ({ eligibleVideos, actualChallenge, setActualChallenge, setVideosInChallenge, showEligibleVideos, challengeVideoIDs }) => {
   const { id:announcementID } = useParams();
   const { challengeAnnouncements, setChallengeAnnouncements } = useContext(dataContext);

      const handleAddVideoToChallenge = ({ description, id, posted, title, urlOrFile, username, videoType, _userID }) => {
      setVideosInChallenge(prv => ([...prv, { description, id, posted, title, urlOrFile, username, videoType, _userID }]));
      
      setActualChallenge(prv => ({ ...prv, challengeVideoIDs: [...challengeVideoIDs, id] }));
      const challengeAnnouncementsUpdated = challengeAnnouncements.map(announcement_OBJECT => {
         if (announcement_OBJECT.announcement.id == announcementID) {
            announcement_OBJECT.challenge.challengeVideoIDs = [...announcement_OBJECT.challenge.challengeVideoIDs, id];
         }
         return announcement_OBJECT;
      })
      
      setChallengeAnnouncements(challengeAnnouncementsUpdated);
   }

   useEffect(() => {
      showEligibleVideos()
   }, [actualChallenge.challengeVideoIDs.length])

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
                           clickLogic={() => handleAddVideoToChallenge(val)}
                        />
                     )
                  })
               }
         </div>
      </>
   )
}

export default AddVideosToChallenge

