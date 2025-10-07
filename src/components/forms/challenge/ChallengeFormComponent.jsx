import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form } from 'reactstrap'
import { DateTime } from 'luxon';
import { v4 } from 'uuid';
import { Outlet } from 'react-router-dom'
import ErrorBoundary from '../../ErrorBoundary';
import ChallengeFormError from './ChallengeFormError';
import { defaultExpirationDate } from './functions';

import { dataContext } from '../../../App'

export const ChallengeDetailsContext = createContext();

import './ChallengeFormComponent.styles.css';

const ChallengeFormComponent = () => {
   const navigate = useNavigate();
   const { videos, currentUser, setChallengeAnnouncements, setCurrentChallenges } = useContext(dataContext);

   const [challengeAnnouncement, setChallengeAnnouncement] = useState({ id: '', _announcementOwnerID: '', headline: '', description: '', cover_img: '', announcementEndsOn: '0000-00-00', _challengeAnnouncementID: '' });
   
   const [challengeDetails, setChallengeDetails] = useState({ id: '', _challengeID: '', _challengeOwnerID: '', posted: null, title: '', description: '', challengeCoverType: '', challengeCoverImage: '', challengeEndsOn: '0000-00-00', winningVotes: 0, challengeVideoIDs: [], howChallengeEnds: '', challengeAnnouncementID: '' });

   const [dateAlert, setDateAlert] = useState(false);

   const handleSubmit = (e) => {
      e.preventDefault();
      const posted = DateTime.local().toFormat('yyyy-MM-dd');

      const form_content = challengeDetails.howChallengeEnds == 'votes' ?
         { ...challengeDetails, posted, challengeEndsOn: defaultExpirationDate(challengeDetails, challengeAnnouncement, DateTime) }
         :
         { ...challengeDetails, posted };

      if (challengeAnnouncement._challengeAnnouncementID) {
         const form_challenge_announcement = { posted, _announcementOwnerID: currentUser.id, challengeVideoIDs: [...challengeDetails.challengeVideoIDs], cover_img: challengeDetails.challengeCoverImage }

         setChallengeAnnouncements(prv => ([...prv, { announcement: { ...challengeAnnouncement, ...form_challenge_announcement }, challenge: { ...challengeDetails } }])); //from dataContext in App.jsx.
         
         navigate(`/currentUser/${currentUser.id}/view/challenges/announcements`)
      } else {
         setCurrentChallenges(prv => ([...prv, {...challengeDetails, ...form_content}])); //from dataContext in App.jsx.

         navigate(`/currentUser/${currentUser.id}/view/challenges/active`)
      }
   }

   useEffect(() => {
      const _challengeID = v4();
      setChallengeDetails(prv => ({ ...prv, _challengeID, id: _challengeID, _challengeOwnerID: currentUser.id }));

      return () => {         
         setChallengeDetails({ id: '', posted: '', title: '', inviteOthers: '', announcementDeadline: "0000-00-00", description: '', challengeCoverImage: '', challengeCoverType: '', winningVotes: 0, challengeEndsOn: '', challengeVideoIDs: [], _challengeAnnouncementID: '' });

         setChallengeAnnouncement({ id: '', _announcementOwnerID: '', headline: '', description: '', announcementEndsOn: '0000-00-00', cover_img: '', _challengeAnnouncementID: '' })
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