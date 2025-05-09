import React from 'react';

import BackMedia from './BackMedia';
import FrontMedia from './FrontMedia';
import Logo from '../../media/images/BeatTheIdols_NoBackground.png';

const Header = () => {
  return (
    <div className='header'>
      <BackMedia />
      <img src={Logo} />
      <FrontMedia />
    </div>
  )
}

export default Header