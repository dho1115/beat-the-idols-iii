import React, { Suspense, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Container } from 'reactstrap';

import SuspenseFallback from '../../components/suspense_fallback/SuspenseFallback';
import ErrorBoundary from '../../components/ErrorBoundary';

import "./Homepage.styles.css";
import CurrentChallenges from '../../components/home/CurrentChallenges';

const Homepage = () => {
  const location = useLocation();

  return (
    <ErrorBoundary fallback={<h3>Something went wrong in {location.pathname}!!!</h3>}>
      <Suspense fallback={<SuspenseFallback />}>
        <div className='my-5'>
          <header className='homepage-header'>
            <h1>Welcome To The Home Page!!!</h1>
          </header>
          <Container>
            <Outlet />
          </Container>
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}

export default Homepage