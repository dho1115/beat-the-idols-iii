import React, { useContext } from 'react';
import { Suspense } from 'react';

//Components.
import Header from '../../components/welcome/Header';
import SecondSection from '../../components/welcome/SecondSection';
import SuspenseFallback from '../../components/suspense_fallback/SuspenseFallback';
import { dataContext } from '../../App';

import "./WelcomePage.styles.css";

const WelcomePage = () => {
  // alert("From WelcomePage.jsx (route = '/'): PLEASE CHECK YOUR todo.txt!!!")
  const {currentUser} = useContext(dataContext);
  const { id, username } = currentUser;

  console.log({currentUser})

  return (    
    <div className='welcome-page-wrapper p-0'>
      <Suspense fallback={SuspenseFallback}>
        <Header id={id} username={username} />
        <SecondSection />
      </Suspense>      
    </div>
  )
}

export default WelcomePage