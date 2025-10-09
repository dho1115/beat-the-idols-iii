import React, { useContext, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button, Container } from 'reactstrap';

//functions.
import { updateAndAddProperty } from './functions';

//components.
import VideoWrapper from '../templates/video_wrapper/VideoWrapper';

import { dataContext } from '../../App';

import "./Challenges.styles.css";

const CurrentChallengeDetails = () => {
   const navigate = useNavigate();
   const { _challengeID } = useParams();
   const { allUsers, currentChallenges, videos, setVideos } = useContext(dataContext);

   const validateParams = currentChallenges.find(({ id }) => id == _challengeID)

   if (validateParams) {
      const { challengeCoverImage, challengeEndsOn, _challengeOwnerID, challengeVideoIDs, description, title, winningVotes } = currentChallenges.find(val => val._challengeID == _challengeID);

      const videosInChallenge = videos.filter(({ id }) => challengeVideoIDs.includes(id));

      const challengeOwnerObject = allUsers.find(val => val.id == _challengeOwnerID);

      return (
         <div>
            <div className='challenge-details-header my-3'>
               <div className='challenge-details-description-div p-3'>
                  <h3>Challenge ID: <span className='text-danger'>{_challengeID}</span></h3>
                  <h3>OWNER: {challengeOwnerObject.username} (id# {_challengeOwnerID})</h3>
                  <h3>EXPIRES: {challengeEndsOn}.</h3>
                  <h3>TITLE: <span className='text-danger'>{title}</span>.</h3>
                  <h3>DESCRIPTION:<span className='text-danger'>{description}</span>.</h3>
                  {
                     winningVotes && <h3>First video to reach <span className='text-danger'>{winningVotes}</span> votes wins!!!.</h3>
                  }
               </div>
               <div className='challenge-details-img-div'>
                  <img src={challengeCoverImage} alt='challenge cover img' className='challenge-details-img' />
               </div>
            </div>
            <Container className='videosInChallengeDetails'>
               {
                  videosInChallenge.map((val, idx) => (
                     <div style={{overflowWrap: 'anywhere', border: '3px solid black', backgroundColor: idx%2==1 ? 'antiquewhite' : 'bisque'}} className='m-1'>
                        <h5>{JSON.stringify(val)}</h5>
                        <Button size='md' color='warning'>VOTE FOR THIS VIDEO!!!</Button>
                     </div>
                  ))
               }
            </Container>
         </div>
      )
   } else {
      return <Navigate to="/" replace={false} />
   }
   
}

export default CurrentChallengeDetails