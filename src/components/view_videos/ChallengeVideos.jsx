import React, { useContext } from 'react';
//Components and Dependencies.
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap'
import VideoWrapper from '../templates/video_wrapper/VideoWrapper';
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
               filterQuery[filter].map(({ id, ...rest }) => (
                  <div key={id}>
                     <strong>{JSON.stringify({id, ...rest})}</strong>
                  </div>
               ))
               :
               <h1 className='text-danger'><i>Sorry... there are no challenges for you!!!</i></h1>
         }
      </Container>
   )
}

export default ChallengeVideos