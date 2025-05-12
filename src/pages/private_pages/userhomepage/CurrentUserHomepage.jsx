import React, {Suspense} from 'react'
import { Outlet } from 'react-router-dom';
import { Container } from 'reactstrap';

//Components.
import SuspenseFallback from '../../../components/suspense_fallback/SuspenseFallback';

const CurrentUserHomepage = ({ _userID, username }) => {
   try {
      return (
         <div className='current-user-homepage-div'>
            <header className='current-user-homepage-header'>
               <h1>Homepage of <span color='danger'>{username}</span>.</h1>
            </header>

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