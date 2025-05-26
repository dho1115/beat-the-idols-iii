import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Container } from 'reactstrap';

import "./Homepage.styles.css";

const Homepage = () => {
  const location = useLocation();

  return (
    <div className='my-5'>
      <header className='homepage-header'>
        <h1>Welcome To The Home Page!!!</h1>
      </header>
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}

export default Homepage