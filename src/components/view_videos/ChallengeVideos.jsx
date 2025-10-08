import React, { useContext, useRef, useEffect } from 'react';
//Components and Dependencies.
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap'
import VideoWrapper from '../templates/video_wrapper/VideoWrapper';
import UploadVideo from '../templates/video/upload/UploadVideo';
import YouTubeVideo from '../templates/video/you_tube/YouTubeVideo';
import { dataContext } from '../../App'

import './ChallengeVideos.styles.css';

const ChallengeVideos = () => {
   const videosContainerRef = useRef();
   const { videos } = useContext(dataContext);
   const {user, filter} = useParams(); //Allows the user to either see [user] videos only or "all" videos (see filterQuery).

   const filterQuery = {
      all: videos.map(video => video), //all videos.
      [user]: videos.filter(video => video._userID == user) //videos for currentUser.
   }

   useEffect(() => {
      if (filterQuery[filter].length > 1) {
         videosContainerRef.current.style.gridTemplateColumns = videos.length < 5 ? videos.map(val => `${(100/videos.length)-0.5}%`).join(" ") : "19% 19% 19% 19% 19%"
      }
   }, [])

   return (
      <Container ref={videosContainerRef} className={ filterQuery[filter].length? 'challenge-videos-container p-3' : 'no-videos'}>
         {
            filterQuery[filter].length ?
               filterQuery[filter].map(({ id, _userID, username, title, description, urlOrFile, record, videoType }, idx) => {
                  if (videoType == "you-tube") {
                     return <VideoWrapper key={idx} record={record} video_component={<YouTubeVideo url={urlOrFile} title={title} />} title={title} description={description} id={id} _userID={_userID} username={username} idx={idx}/>
                  }
                  
               })
               :
               <h1 className='text-danger'><i>Sorry... there are no challenges for you!!!</i></h1>
         }
      </Container>
   )
}

export default ChallengeVideos