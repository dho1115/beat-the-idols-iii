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
   const navigate = useNavigate();
   const { videos, currentUser, setChallengeAnnouncements, setCurrentChallenges } = useContext(dataContext);

   const [challengeAnnouncement, setChallengeAnnouncement] = useState({ id: '', _announcementOwnerID: '', headline: '', description: '', announcementEndsOn: '0000-00-00', _challengeAnnouncementID: '' })
   
   const [challengeDetails, setChallengeDetails] = useState({ id: '', _challengeID: '', _challengeOwnerID: '', posted: null, title: '', description: '', challengeCoverType: '', challengeCoverImage: '', challengeExpires: '0000-00-00', winningVotes: 0, challengeVideos: [], howChallengeEnds: '', challengeAnnouncementID: '' });

   const [dateAlert, setDateAlert] = useState(false);

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

      const form_content = challengeDetails.howChallengeEnds == 'votes' ?
         { ...challengeDetails, posted, challengeEndsOn: defaultExpirationDate() /* default expiration date */ }
         :
         { ...challengeDetails, posted };
      
      setChallengeDetails(prv => ({ ...prv, ...form_content }));

      if (challengeAnnouncement._challengeAnnouncementID) {
         const form_challenge_announcement = { posted, challengeVideos: [...challengeDetails.challengeVideos], _announcementOwnerID: currentUser.id }

         setChallengeAnnouncement(prv => ({ ...prv, ...form_challenge_announcement })); //set challengeAnnouncement only if user selected it.

         setChallengeAnnouncements(prv => ([...prv, challengeAnnouncement])); //from dataContext in App.jsx.
         
         navigate(`/currentUser/${currentUser.id}/view/challenges/announcements`)
      } else {
         setCurrentChallenges(prv => ([...prv, challengeDetails])); //from dataContext in App.jsx.

         navigate(`/currentUser/${currentUser.id}/view/challenges/active`)
      }
   }

   useEffect(() => {
      const _challengeID = v4();
      setChallengeDetails(prv => ({ ...prv, _challengeID, id: _challengeID, _challengeOwnerID: currentUser.id }));

      return () => {         
         setChallengeDetails({ id: '', posted: '', title: '', inviteOthers: '', announcementDeadline: "0000-00-00", description: '', challengeCoverImage: '', challengeCoverType: '', winningVotes: 0, challengeExpires: '', challengeVideos: [], _challengeAnnouncementID: '' });

         setChallengeAnnouncement({ id: '', _announcementOwnerID: '', headline: '', description: '', announcementEndsOn: '0000-00-00', _challengeAnnouncementID: '' })
      }
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
            <ChallengeDetailsContext.Provider value={{ challengeDetails, setChallengeDetails, challengeAnnouncement, setChallengeAnnouncement, dateAlert, setDateAlert }}>
               <Form className='challenge-component-form p-3 m-1' onSubmit={handleSubmit}>
                  <Outlet />
               </Form>               
            </ChallengeDetailsContext.Provider>
         </ErrorBoundary>
      </Container>      
   )
}

export default ChallengeFormComponent