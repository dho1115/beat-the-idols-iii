import React, { createContext, useContext, useState, useEffect } from 'react';

import { Container } from 'reactstrap'
import { Outlet } from 'react-router-dom'
import ErrorBoundary from '../../ErrorBoundary';
import ChallengeFormError from './ChallengeFormError';

import { dataContext } from '../../../App'

export const ChallengeDetailsContext = createContext();

const ChallengeFormComponent = () => {
   const [challengeDetails, setChallengeDetails] = useState({ id: null, posted: null, title: '', inviteOthers: '', deadline: "0000-00-00", challengeExpires: '', challengeVideos: [] });

   const { videos } = useContext(dataContext);

   useEffect(() => {
      return () => setChallengeDetails({ id: null, posted: null, title: '', inviteOthers: '', deadline: "0000-00-00", challengeExpires: '', challengeVideos: [] });
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
               <Outlet />
            </ChallengeDetailsContext.Provider>
         </ErrorBoundary>
      </Container>      
   )
}

export default ChallengeFormComponent