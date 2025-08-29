import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form } from 'reactstrap'
import { DateTime } from 'luxon';
import { v4 } from 'uuid';
import { Outlet } from 'react-router-dom'
import ErrorBoundary from '../../ErrorBoundary';
import ChallengeFormError from './ChallengeFormError';

import { dataContext } from '../../../App'

export const ChallengeDetailsContext = createContext();

import './ChallengeFormComponent.styles.css';

const ChallengeFormComponent = () => {
   const navigate = useNavigate()
   const [challengeDetails, setChallengeDetails] = useState({ id: null, posted: null, title: '', description: '', inviteOthers: '' /* challenge announcement */, announcementDeadline: "0000-00-00", challengeCoverType: '', challengeCoverImage: '', challengeExpires: "0000-00-00", winningVotes: 0, challengeVideos: [] /* each video should have a record prop */, howChallengeEnds: '' });
   const { videos, currentUser } = useContext(dataContext);

   const defaultExpirationDate = () => {
      if (challengeDetails.inviteOthers) {
      const deadlineString = challengeDetails.announcementDeadline; //DEADLINE FOR PEOPLE TO APPLY (announcementDeadline).
      const deadline = DateTime.fromISO(deadlineString)
      const defaultExpiration = deadline.plus({ months: 5 }).toFormat('yyyy-MM-dd');
         
         return defaultExpiration;
      }

      const defaultExpiration = DateTime.local().plus({ months: 5 }).toFormat("yyyy-MM-dd");
      
      return defaultExpiration;
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      const posted = DateTime.local().toFormat('yyyy-MM-dd');
      const _videoID = v4();
      let submitChallengeDetails = challengeDetails.howChallengeEnds == 'votes' ?
         { posted, id: _videoID, ...challengeDetails, _videoID, challengeExpires: defaultExpirationDate() /* If user selects 'votes', we do NOT want the challenge to never expire, so this is the default expiration date */ }
         :
         { posted, id: _videoID, ...challengeDetails, _videoID }

      if (!challengeDetails.inviteOthers) {
         delete submitChallengeDetails.announcementDeadline;
         navigate(`/currentUser/${currentUser.id}/view/challenges/active`)
      } else {
         navigate(`/currentUser/${currentUser.id}/challenge-announcement-form`) //navigate to announcement form if user inviting others.
      }
   }

   useEffect(() => {
      return () => setChallengeDetails({ id: null, posted: null, title: '', inviteOthers: '', announcementDeadline: "0000-00-00", description: '', challengeCoverImage: '', challengeCoverType: '', winningVotes: 0, challengeExpires: '', challengeVideos: [] });
   }, [])

   if (videos.length <= 2) return <ChallengeFormError videos={videos} />
   return (      
      <Container>
         <ErrorBoundary
            fallback={
               <div style={{height: '100vh', backgroundColor: 'lightgoldenrodyellow', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  <h1 className='text-danger'>SOMETHING WENT WRONG INSIDE CHALLENGEFORM.JSX!!!</h1>
               </div>
            }
         >
            <ChallengeDetailsContext.Provider value={{ challengeDetails, setChallengeDetails }}>
               <Form className='challenge-component-form p-3 m-1' onSubmit={handleSubmit}>
                  <Outlet />
               </Form>               
            </ChallengeDetailsContext.Provider>
         </ErrorBoundary>
      </Container>      
   )
}

export default ChallengeFormComponent