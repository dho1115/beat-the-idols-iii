import React, {createContext, useState} from 'react'
import { Outlet } from 'react-router-dom'
import { Form } from 'reactstrap';
import ErrorBoundary from '../../ErrorBoundary';

import "./ChallengeAnnouncementFormComponent.styles.css";

export const ChallengeAnnouncementFormContext = createContext();

const ChallengeAnnouncementFormComponent = () => {
   const [challengeAnnouncementDetails, setChallengeAnnouncementDetails] = useState({ title: '', description: '', coverImageSource: '' });

   const onHandleSubmitChallengeAnnouncement = e => {
      e.preventDefault();
   }

   return (
      <ChallengeAnnouncementFormContext.Provider value={{ challengeAnnouncementDetails, setChallengeAnnouncementDetails }}>
         <ErrorBoundary fallback={
            <h1 className='text-danger'>SHIT... Something Went Wrong Rendering Challenge Ann. Form Component!!!</h1>
         }>
            <Form onSubmit={onHandleSubmitChallengeAnnouncement}  className='challenge-announcement-form-component'>
               <Outlet />
            </Form>
         </ErrorBoundary>
      </ChallengeAnnouncementFormContext.Provider>
   )
}

export default ChallengeAnnouncementFormComponent