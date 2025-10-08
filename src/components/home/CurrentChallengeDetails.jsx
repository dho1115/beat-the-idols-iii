import React, { useContext, useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Button, Container } from 'reactstrap';

import { dataContext } from '../../App';

import "./Challenges.styles.css";


const CurrentChallengeDetails = () => {
   const navigate = useNavigate();
   const { _challengeID } = useParams();
   const { currentChallenges, currentUser } = useContext(dataContext);

   const validateParams = currentChallenges.find(({ id }) => id == _challengeID)

   if (validateParams) {
      const { challengeCoverImage, challengeEndsOn, _challengeOwnerID, challengeVideoIDs, description, title, winningVotes } = currentChallenges.find(val => val._challengeID == _challengeID);
      return (
         <div>
            <div className='challenge-details-header my-3'>
               <div className='challenge-details-description-div'>
                  <h3>Challenge ID: <span className='text-danger'>{_challengeID}</span></h3>
                  <h3>EXPIRES: {challengeEndsOn}.</h3>
                  <h3>TITLE: <span className='text-danger'>{title}</span>.</h3>
                  <h3><span className='text-danger'>{description}</span>.</h3>
                  {
                     winningVotes && <h3>First video to reach <span className='text-danger'>{winningVotes}</span> votes wins!!!.</h3>
                  }
               </div>
               <div className='challenge-details-img-div'>
                  <img src={challengeCoverImage} alt='challenge cover img' className='challenge-details-img' />
               </div>
            </div>
            <Container>
               <strong>{challengeVideoIDs}</strong>
            </Container>
         </div>
      )
   } else {
      return <Navigate to="/" replace={false} />
   }
   
}

export default CurrentChallengeDetails