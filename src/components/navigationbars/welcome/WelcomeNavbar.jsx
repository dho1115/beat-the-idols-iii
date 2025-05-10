import React from 'react'

//Dependencies.
import { Link } from 'react-router-dom';

import "./WelcomeNavbar.styles.css";

import logo from "../../../media/images/BeatTheIdols_NoBackground.png";

const WelcomeNavbar = () => {
  return (
    <nav className='welcome-navbar p-1 sticky-top'>
      <a class="navbar-brand bg bg-dark" href="/" style={{backgroundColor: "#333"}}><img src={logo} className='img-thumbnail welcome-nav-img' /></a>
      <Link to="/">LINK 1</Link>
      <Link to="/">LINK 2</Link>
      <Link to="/">LINK 3</Link>
    </nav>
  )
}

export default WelcomeNavbar