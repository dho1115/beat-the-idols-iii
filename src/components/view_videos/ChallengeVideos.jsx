import React, { useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Container } from 'reactstrap'
import { dataContext } from '../../App'

import './ChallengeVideos.styles.css';

const ChallengeVideos = () => {
   const { videos } = useContext(dataContext);
   const {user, filter} = useParams();

   const filterQuery = {
      all: videos.map(video => video),
      [user]: videos.filter(video => video._userID == user)
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