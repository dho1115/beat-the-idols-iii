import React from 'react';
import { Suspense } from 'react';

//Components.
import Header from '../../components/welcome/Header';
import SecondSection from '../../components/welcome/SecondSection';
import SuspenseFallback from '../../components/suspense_fallback/SuspenseFallback';

import "./WelcomePage.styles.css";

const WelcomePage = () => {

  return (    
    <div className='welcome-page-wrapper p-0'>
      <Suspense fallback={SuspenseFallback}>  
        <Header />
        <SecondSection />
      </Suspense>      
    </div>
  )
}

export default WelcomePage