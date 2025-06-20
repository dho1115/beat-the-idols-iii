import React, { Suspense, useContext } from 'react'

//Dependencies.
import { dataContext } from '../../../App';
import { Outlet } from 'react-router-dom';
import { Container } from 'reactstrap';

//Components.
import SuspenseFallback from '../../../components/suspense_fallback/SuspenseFallback';

const CurrentUserHomepage = () => {
   const { currentUser } = useContext(dataContext);
   const { id, username, email } = currentUser;
   try {
      return (
         <div className='current-user-homepage-div py-5'>
            <Suspense falllback={<SuspenseFallback />}>
               <header className='current-user-homepage-header'>
                  <h1>Homepage of <span color='danger'>{username} - {email}.</span>.</h1>
               </header>
            </Suspense>

            <Suspense fallback={<SuspenseFallback />}>
               <Outlet />
            </Suspense>            
         </div>
      )
   } catch (error) {
      return (
         <div>
            <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <h1>There seems to be an error (see below):</h1>
               <strong>{JSON.stringify(error)}.</strong>
            </Container>
         </div>
      )
   }
}

export default CurrentUserHomepage