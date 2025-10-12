import React, {createContext, useState} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Container, Form } from 'reactstrap';
import ErrorBoundary from '../../ErrorBoundary';

import "./ChallengeAnnouncementFormComponent.styles.css";

export const ChallengeAnnouncementFormContext = createContext();

const ChallengeAnnouncementFormComponent = () => {
   const navigate = useNavigate();
   const [challengeAnnouncementDetails, setChallengeAnnouncementDetails] = useState({ title: '', description: '', coverImageSource: '', coverImageLink: '', videosInChallenge: [] });

   const onHandleSubmitChallengeAnnouncement = e => {
      e.preventDefault();
      alert(`=====CHALLENGE ANNOUNCEMENT SUBMITTED!!!=====${'\n'} ${'\t'}${JSON.stringify(challengeAnnouncementDetails)}. ${'\n'}=============================================`)
   }

   return (
      <ChallengeAnnouncementFormContext.Provider value={{ challengeAnnouncementDetails, setChallengeAnnouncementDetails }}>
         <ErrorBoundary fallback={
            <h1 className='text-danger'>SHIT... Something Went Wrong Rendering Challenge Ann. Form Component!!!</h1>
         }>
            <Container className='challengeAnnouncementForm-container'>
               <Form onSubmit={onHandleSubmitChallengeAnnouncement}  className='challenge-announcement-form-component p-3'>
                  <Outlet />
               </Form>
            </Container>            
         </ErrorBoundary>
      </ChallengeAnnouncementFormContext.Provider>
   )
}

export default ChallengeAnnouncementFormComponent