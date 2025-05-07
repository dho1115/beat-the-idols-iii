import React from 'react';

//Dependencies
import { Parallax, ParallaxProvider } from 'react-scroll-parallax';

//Media
import FrontMedia from '../../components/welcome/FrontMedia';
import BackMedia from '../../components/welcome/BackMedia';
import Logo from '../../media/images/BeatTheIdols_NoBackground.png';

import "./WelcomePage.styles.css";

const WelcomePage = () => {
  return (
    <ParallaxProvider>
      <div className='welcome-page-div'>
        <Parallax speed={-15}>
          <BackMedia />
        </Parallax>
        <FrontMedia />
      </div>
    </ParallaxProvider>
  )
}

export default WelcomePage