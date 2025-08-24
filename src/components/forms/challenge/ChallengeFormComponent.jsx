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
   const [challengeDetails, setChallengeDetails] = useState({ id: null, posted: null, title: '', description: '', inviteOthers: '', deadline: "0000-00-00", challengeCoverType: '', challengeCoverImage: '', challengeExpires: '', challengeVideos: [] });

   const { videos } = useContext(dataContext);

   const handleSubmit = (e) => {
      e.preventDefault();
      const posted = DateTime.local().toFormat('yyyy-MM-dd');
      const _videoID = v4();
      let submitChallengeDetails = { posted, id: _videoID, ...challengeDetails, _videoID };
      if (!challengeDetails.inviteOthers) delete submitChallengeDetails.deadline;
   }

   useEffect(() => {
      return () => setChallengeDetails({ id: null, posted: null, title: '', inviteOthers: '', deadline: "0000-00-00", challengeCoverType: '', challengeExpires: '', challengeVideos: [] });
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