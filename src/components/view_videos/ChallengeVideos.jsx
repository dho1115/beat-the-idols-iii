import React, { useContext } from 'react';
//Components and Dependencies.
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap'
import VideoWrapper from '../templates/video_wrapper/VideoWrapper';
import UploadVideo from '../templates/video/upload/UploadVideo';
import YouTubeVideo from '../templates/video/you_tube/YouTubeVideo';
import { dataContext } from '../../App'

import './ChallengeVideos.styles.css';


const ChallengeVideos = () => {
   const { videos } = useContext(dataContext);
   const {user, filter} = useParams(); //Allows the user to either see [user] videos only or "all" videos (see filterQuery).

   const filterQuery = {
      all: videos.map(video => video), //all videos.
      [user]: videos.filter(video => video._userID == user) //videos for currentUser.
   }

   return (
      <Container className='challenge-videos-container'>
         {
            filterQuery[filter].length ?
               filterQuery[filter].map(({ id, _userID, username, title, description, urlOrFile, videoType }, idx) => {
                  return (
                     <div className='p-1 m-1' style={{ border: '1.5px solid firebrick', backgroundColor: idx%2 == 1 ? 'white' : 'lightgreen' }}>
                        {/* <h5>video id: {id}</h5>
                        <h5>_userID: {_userID}</h5>
                        <h5>username: {username}</h5>
                        <h3>title: {title}</h3>
                        <h5>file or url: {urlOrFile}</h5>
                        <h5>videoType: {videoType}</h5>
                        <h5>description: {description}</h5> */}
                     </div>
                  )
               })
               :
               <h1 className='text-danger'><i>Sorry... there are no challenges for you!!!</i></h1>
         }
      </Container>
   )
}

export default ChallengeVideos