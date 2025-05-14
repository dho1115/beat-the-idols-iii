import React from 'react';
import { Suspense } from 'react';

//Dependencies
import { Parallax } from 'react-scroll-parallax';

//Components.
import Header from '../../components/welcome/Header';
import SecondSection from '../../components/welcome/SecondSection';
import SuspenseFallback from '../../components/suspense_fallback/SuspenseFallback';

import "./WelcomePage.styles.css";

const WelcomePage = () => {

  return (    
    <div className='welcome-page-wrapper p-0'>      
      <Header />
      <SecondSection />      
    </div>
  )
}

export default WelcomePage