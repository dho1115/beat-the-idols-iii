import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

//Components.
import UploadVideo from '../../templates/video/upload/UploadVideo';
import VideoWrapper from '../../templates/video_wrapper/VideoWrapper';
import YouTubeVideo from '../../templates/video/you_tube/YouTubeVideo';

//Context
import { dataContext } from '../../../App';

import "../Challenges.styles.css";
import { video } from 'motion/react-client';

const AnnouncementDetailsComponent = () => {
   const { user, id } = useParams();
   const { challengeAnnouncements, allUsers, videos } = useContext(dataContext);

   const [announcement, setAnnouncement] = useState({})
   const [actualChallenge, setActualChallenge] = useState({})
   const [videosInChallenge, setVideosInChallenge] = useState([]);
   const [videosEligibleForChallenge, setvideosEligibleForChallenge] = useState({ show: false, videos: [] });
   const announcementDetails = challengeAnnouncements.find(({ announcement: { _challengeAnnouncementID } }) => _challengeAnnouncementID == id)

   const announcementOwner = allUsers.find(val => val.id == user);

   const showEligibleVideos = () => {
      const eligibleVideos = videos.filter(({ _userID, id: videoID }) => (_userID == user) && (!videosInChallenge.includes(videoID)))

      setvideosEligibleForChallenge({ show: !videosEligibleForChallenge.show, videos: [...eligibleVideos] });
      return eligibleVideos;
   }

   useEffect(() => {
      setAnnouncement(prv => ({ ...prv, ...announcementDetails.announcement, owner: announcementOwner.username }));
      setActualChallenge(prv => ({ ...prv, ...announcementDetails.challenge }));
      setVideosInChallenge(prv => ([...prv, ...announcementDetails.challenge.challengeVideos]));

      return (() => {
         setvideosEligibleForChallenge({ show: false, videos: [] });
         setVideosInChallenge([]);
         setActualChallenge({});
         setAnnouncement({});
      })
   }, [])
   
   return (
      <div className='m-1 p-1'>
         <div className='announcementDetailsProfile w-100'>
            <div className='m-1'>
               <h3>Announcement ID: {id}</h3>
               <h3>Owner: <strong className='text-danger'>{announcement.owner}</strong>.</h3>
               <hr />
               <h5>Description: <strong className='text-danger'>{announcement.description}</strong>.</h5>
            </div>
            <div className='announcementDetailsCoverImg'>
               <img src={announcement.cover_img} className='img-fluid'/>
            </div>
         </div>
         <Container>
            <strong>{JSON.stringify(JSON.stringify(announcementDetails.announcement))}</strong>
            <headline className='p-3'>
               <h3>VIDEOS CURRENTLY IN THIS CHALLENGE:</h3>
            </headline>
            <Container className="announcement-videos-container p-3">
               {
                  videos.map(({ title, description, videoType, urlOrFile, username }, idx) => (
                     <VideoWrapper
                        key={idx}
                        color={idx%2==1 ? "red" : "yellow"}
                        title={title}
                        description={description}
                        video_component={
                           videoType == 'you-tube' ?
                              <YouTubeVideo url={urlOrFile} title={title} />
                              :
                              <UploadVideo file={urlOrFile} />
                        }
                        username={username}
                        button_text={null}
                        clickLogic={false}
                     />
                  ))
               }
            </Container>
            <Button color='danger' size='lg' onClick={showEligibleVideos}><strong>JOIN THIS CHALLENGE!!!</strong></Button>
         </Container>
         <Container>
            <header><h1>VIDEOS ELIGIBLE FOR CHALLENGE:</h1></header>
            {
               (videosEligibleForChallenge.show && !videosEligibleForChallenge.videos.length)
               &&
               <h1>You have no eligible videos for challenge (probably because they are already in the challenge).</h1>
            }
            {
               (videosEligibleForChallenge.show && videosEligibleForChallenge.length)
               &&
               <div>
                  <strong>{JSON.stringify(videosEligibleForChallenge.videos)}</strong>
               </div>
            }
            {
               videosEligibleForChallenge.show
               &&
               <Button color='success' size='lg' onClick={() => setvideosEligibleForChallenge(prv => ({ ...prv, show: false }))}>CLOSE THIS PANEL.</Button>
            }
         </Container>
      </div>
   )
}

export default AnnouncementDetailsComponent