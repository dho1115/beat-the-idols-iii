import React from 'react'

//Dependencies.
import { Link } from 'react-router-dom';
import logo from "../../../media/images/BeatTheIdols_NoBackground.png";

import "./WelcomeNavbar.styles.css";

const WelcomeNavbar = () => {
  return (
    <nav className='welcome-navbar p-1 sticky-top' style={{position: 'absolute', top: '0%', left: '0%', right: '0%'}}>
      <a class="navbar-brand" href="/" style={{ width: '3vw' }}><img src={logo} className='img-thumbnail welcome-nav-img' /></a>
      <div className='welcome-link-container p-0'>
        <Link to="/"><strong style={{color: 'whitesmoke'}}>LINK 1</strong></Link>
        <Link to="/"><strong style={{color: 'whitesmoke'}}>LINK 2</strong></Link>
        <Link to="/"><strong style={{color: 'whitesmoke'}}>LINK 3</strong></Link>
      </div>      
    </nav>
  )
}

export default WelcomeNavbar