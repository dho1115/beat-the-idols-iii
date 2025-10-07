import React, { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Container } from 'reactstrap';

import SuspenseFallback from '../../components/suspense_fallback/SuspenseFallback';
import ErrorBoundary from '../../components/ErrorBoundary';

//Components;
import HomeNavbar from '../../components/navigationbars/home_navbar/HomeNavbar';

//Miscellaneous
import { HomeNavbarLinks } from '../../components/home/HomeNavbarLinks';

import "./Homepage.styles.css";

const Homepage = () => {
  const location = useLocation();

  return (
    <ErrorBoundary fallback={<h3>Something went wrong in {location.pathname}!!!</h3>}>
      <Suspense fallback={<SuspenseFallback />}>
        <div style={{marginTop: '2.25%'}}>
          <HomeNavbar arrayOfLinks={[...HomeNavbarLinks]} />
          <Container>
            <Outlet />
          </Container>
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}

export default Homepage
