import React, { Suspense, useContext, useEffect } from 'react'

//Dependencies.
import { dataContext } from '../../../App';
import { Outlet } from 'react-router-dom';
import { Container } from 'reactstrap';
import { PostDataAPI } from '../../../functions/postapi';

//Components.
import SuspenseFallback from '../../../components/suspense_fallback/SuspenseFallback';

const CurrentUserHomepage = () => {
   const { currentUser, setCurrentUser, welcomeLinks, setWelcomeLinks } = useContext(dataContext);
   const { username, email } = currentUser;

   const logoutCurrentUserPromise = () => new Promise((res, rej) => {
      setCurrentUser({});
      if (!currentUser.username && !currentUser.id) res({ message: "SUCCESSFULLY LOGGED OUT CURRENT USER FROM STATE!!!", currentUser });
      else rej({ message: "ERROR TRYING TO LOG OUT CURRENT USER FROM STATE!!!", currentUser });
   })

   const logoutpromise = () => Promise.all([logoutCurrentUserPromise(), PostDataAPI("http://localhost:3003/currentUser", { })])
      .then(result => {
         console.log({ result });
         const updatedWelcomeLinks = [...welcomeLinks].filter(({ name }) => name.endsWith("'s homepage"));
         setWelcomeLinks([...updatedWelcomeLinks, { name: 'LOGIN/SIGN UP!!!', path: '/register' }]);
      })
      .catch(error => console.error({ message: "logoutpromise ERROR!!!", error, errorMessage: error.message, errorCode: error.code }));


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