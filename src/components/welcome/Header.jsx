import React from 'react';

import BackMedia from './BackMedia';
import FrontMedia from './FrontMedia';
import Logo from '../../media/images/BeatTheIdols_NoBackground.png';

import "./WelcomeComponent.styles.css";

const Header = () => {
  return (
    <div className='header'> {/* I May need to make the HEADER the wrapper */}
      <BackMedia />
      <img src={Logo} className='logo' />
      <FrontMedia />
    </div>
  )
}

export default Header