import React from 'react';
import { Suspense } from 'react';

//Dependencies
import { Parallax } from 'react-scroll-parallax';

//Components.
import Header from '../../components/welcome/Header';
import SuspenseFallback from '../../components/suspense_fallback/SuspenseFallback';

import "./WelcomePage.styles.css";

const WelcomePage = () => {

  return (    
    <div className='welcome-page-wrapper p-0'>
      <Suspense fallback={<SuspenseFallback />}>
        <Header />

      </Suspense>
    </div>
  )
}

export default WelcomePage