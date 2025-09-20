import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

//Components.
import AddVideosToChallenge from './AddVideosToChallenge';
import UploadVideo from '../../templates/video/upload/UploadVideo';
import VideoWrapper from '../../templates/video_wrapper/VideoWrapper';
import YouTubeVideo from '../../templates/video/you_tube/YouTubeVideo';

//Context
import { dataContext } from '../../../App';

import "../Challenges.styles.css";

const AnnouncementDetailsComponent = () => {
   const { user, id } = useParams(); //_userid, challenge announcement id.
   const { challengeAnnouncements, currentUser, allUsers, videos } = useContext(dataContext);
   const { personalImages } = currentUser;
   const [announcement, setAnnouncement] = useState({})
   const [actualChallenge, setActualChallenge] = useState({})
   const [videosInChallenge, setVideosInChallenge] = useState([]);
   const [videosEligibleForChallenge, setvideosEligibleForChallenge] = useState({ show: false, eligibleVideos: [] });

   const announcementDetails = challengeAnnouncements.find(({ announcement: { _challengeAnnouncementID } }) => _challengeAnnouncementID == id)
   
   const announcementOwner = allUsers.find(val => val.id == user);

   const showEligibleVideos = () => {
      const eligibleVideos = videos.filter(({ _userID, id: videoID }) => (_userID == user) && (!announcementDetails.challenge.challengeVideos.includes(videoID)))

      setvideosEligibleForChallenge({ show: !videosEligibleForChallenge.show, eligibleVideos: [...eligibleVideos] });
      return eligibleVideos;
   }

   useEffect(() => {
      const videosInChallenge = videos.filter(({ id }) => announcementDetails.challenge.challengeVideos.includes(id)); //videos that joined challenge.

      setAnnouncement(prv => ({ ...prv, ...announcementDetails.announcement, owner: announcementOwner.username }));
      setActualChallenge(prv => ({ ...prv, ...announcementDetails.challenge }));
      setVideosInChallenge(prv => ([...prv, ...videosInChallenge]));

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
               <img src={personalImages[0]} className='img-fluid'/>
            </div>
         </div>
         <Container>
            <strong>{JSON.stringify(JSON.stringify(announcementDetails.announcement))}</strong>
            <headline className='p-3'>
               <h3>VIDEOS CURRENTLY IN THIS CHALLENGE:</h3>
            </headline>
            <Container className="announcement-videos-container p-3">
               {
                  videosInChallenge.map(({ title, description, videoType, urlOrFile, username }, idx) => (
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
            {
               !videosEligibleForChallenge.show && <Button color='danger' size='lg' onClick={showEligibleVideos}><strong>JOIN THIS CHALLENGE!!!</strong></Button>
            }            
         </Container>
         <Container>
            {
               (videosEligibleForChallenge.show && !videosEligibleForChallenge.eligibleVideos.length)
               &&
               <h1>You have no eligible videos for challenge (probably because they are already in the challenge).</h1>
            }
            {
               (videosEligibleForChallenge.show && videosEligibleForChallenge.eligibleVideos.length)
               &&
               <>
                  {/* <h1>*** SELECT VIDEO(S) TO ADD TO CHALLENGE ***</h1>
                  <div className="eligibleVideosDiv">
                        {
                        videosEligibleForChallenge.eligibleVideos.map((val, idx) => {
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
                  </div> */} {/* Moved to AddVideosToChallenge.jsx */}
               </>
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