import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

//Components.
import AddVideosToChallenge from './AddVideosToChallenge';
import UploadVideo from 'src/components/templates/video/upload/UploadVideo';
import VideoWrapper from 'src/components/templates/video_wrapper/VideoWrapper';
import YouTubeVideo from 'src/components/templates/video/you_tube/YouTubeVideo';
import ShowChallengeVideos from './ShowChallengeVideos';

//Context
import { dataContext } from '../../../App';

import "../Challenges.styles.css";

const AnnouncementDetailsComponent = () => {
   const { user, id } = useParams(); //_userid, challenge announcement id.
   const { challengeAnnouncements, currentUser, allUsers, videos } = useContext(dataContext);
   const [showEligibleVideosForChallenge, setShowEligibleVideosForChallenge] = useState(false);

   const announcementDetails = challengeAnnouncements.find(({ announcement: { _challengeAnnouncementID } }) => _challengeAnnouncementID == id) //challengeAnnouncement object for this challenge.
   
   const announcementOwner = allUsers.find(val => val.id == user);

   const { challenge, announcement } = announcementDetails;

   const { announcementEndsOn, cover_img, description, posted, videosInChallenge, _announcementOwnerID, _challengeAnnouncementID } = announcement;

   const ownerForThisAnnouncement = allUsers.find(user => user.id == _announcementOwnerID);

   const showEligibleVideos = () => {
      const idForVideosInThisAnnouncement = videosInChallenge.map((video) => video.id)
      const eligibleVideos = videos.filter(video => (video._userID == currentUser.id) && !idForVideosInThisAnnouncement.includes(video.id))
      return eligibleVideos;
   }

   useEffect(() => {
      return (() => {
         setShowEligibleVideosForChallenge(false);
      })
   }, [])

   return (
      <div className='m-1 p-1'>
         <div className='announcementDetailsProfile w-100'>
            <div className='m-1'>
               <h3>Announcement posted on {posted}.</h3>
               <h1>This Announcement Expires: <span style={{color: 'maroon'}}>{announcementEndsOn}</span></h1>
               <h3>Announcement ID: {_challengeAnnouncementID}.</h3>
               <h3>Owner: <strong className='text-danger'>{ownerForThisAnnouncement.username} (owner id# {ownerForThisAnnouncement.id})</strong>.</h3>
               <hr />
               <h5>Description: <strong className='text-danger'>{description}</strong>.</h5>
            </div>
            <div className='announcementDetailsCoverImg'>
               <img src={cover_img} className='img-fluid'/>
            </div>
         </div>
         <Container>
            <headline className='p-3'>
               <h3>VIDEOS CURRENTLY IN THIS CHALLENGE:</h3>
            </headline>
            <ShowChallengeVideos challenge_videos={videosInChallenge} />
            {
               !showEligibleVideosForChallenge && <Button color='danger' size='lg' onClick={() => setShowEligibleVideosForChallenge(true)}><strong>JOIN THIS CHALLENGE!!!</strong></Button>
            }            
         </Container>
         <Container className="mb-5 p-t">
            {
               showEligibleVideosForChallenge &&
               (
                  showEligibleVideos().length ?
                  // <h5>{JSON.stringify(showEligibleVideos())}.</h5>
                  <div className='eligible-videos-container m-1'>
                     {
                        showEligibleVideos().map(({ id, _userID, description, username, title, videoType, urlOrFile }) => (
                           <VideoWrapper
                              video_component={videoType == 'you-tube' ? <YouTubeVideo url={urlOrFile} /> : <UploadVideo file={urlOrFile} />}
                              title={title}
                              username={username}
                              button_text="SELECT THIS VIDEO!!!" clickLogic={() => console.log(`video id ${id}, title: ${title} has been selected!!!`)} id={id} _userID={_userID}
                           />
                        )
                           
                        )
                     } 
                  </div>                  
                  :
                  <h5>You have NO eligible videos for this challenge!!!</h5>
               )
            }
            {
               showEligibleVideosForChallenge
               &&
               <Button color='success' size='lg' onClick={() => setShowEligibleVideosForChallenge(false)}>CLOSE THIS PANEL.</Button>
            }
         </Container>
      </div>
   )
}

export default AnnouncementDetailsComponent