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

   const [challengeAnnouncement, setChallengeAnnouncement] = useState({ id: null, headline: '', description: '', announcementEndsOn: '0000-00-00' })
   
   const [challengeDetails, setChallengeDetails] = useState({ id: '', posted: null, title: '', description: '', challengeCoverType: '', challengeCoverImage: '', challengeEndsOn: '0000-00-00', winningVotes: 0, challengeVideos: [], howChallengeEnds: '', challengeAnnouncementID: '' });

   const _challengeID = v4();

   const { videos, currentUser } = useContext(dataContext);

   const defaultExpirationDate = () => {
      if (challengeDetails.challengeAnnouncementID) {
         const deadlineString = challengeAnnouncement.announcementEndsOn;
         const deadline = DateTime.fromISO(deadlineString)
         const defaultChallengeExpiration = deadline.plus({ months: 5 }).toFormat('yyyy-MM-dd');
         
         return defaultChallengeExpiration;
      }

      const defaultChallengeExpiration = DateTime.local().plus({ months: 5 }).toFormat("yyyy-MM-dd");
      
      return defaultChallengeExpiration;
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      const posted = DateTime.local().toFormat('yyyy-MM-dd');
      challengeDetails.howChallengeEnds == 'votes' ?
         { id: _challengeID, posted, ...challengeDetails, _challengeID, challengeEndsOn: defaultExpirationDate() /* default expiration date */ }
         :
         { posted, id: _challengeID, ...challengeDetails, _challengeID }
      
      navigate(`/currentUser/${currentUser.id}/view/challenges/active`)
   }

   useEffect(() => {
      return () => setChallengeDetails({ id: '', posted: null, title: '', inviteOthers: '', announcementDeadline: "0000-00-00", description: '', challengeCoverImage: '', challengeCoverType: '', winningVotes: 0, challengeExpires: '', challengeVideos: [], _challengeAnnouncementID: '' });
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
            <ChallengeDetailsContext.Provider value={{ challengeDetails, setChallengeDetails, challengeAnnouncement, setChallengeAnnouncement, _challengeID }}>
               <Form className='challenge-component-form p-3 m-1' onSubmit={handleSubmit}>
                  <Outlet />
               </Form>               
            </ChallengeDetailsContext.Provider>
         </ErrorBoundary>
      </Container>      
   )
}

export default ChallengeFormComponent