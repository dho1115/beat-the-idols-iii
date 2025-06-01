import { createContext, useState } from 'react';
import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

//Components.
import WelcomeNavbar from './components/navigationbars/welcome/WelcomeNavbar';

//Components - Lazy loaded.
const CurrentChallenges = lazy(() => import("./components/home/CurrentChallenges"));

//Pages - Lazy loaded.
const AboutUsPage = lazy(() => import('./pages/about/AboutUsPage'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));
const Homepage = lazy(() => import('./pages/home/Homepage'));
const RegistrationPage = lazy(() => import('./pages/registration/RegistrationPage'));
const WelcomePage = lazy(() => import('./pages/welcome/WelcomePage'));
const CurrentUserHomepage = lazy(() => import('./pages/private_pages/userhomepage/CurrentUserHomepage'));

import './App.css';

export const dataContext = createContext()

function App() {
  const [currentUser, setCurrentUser] = useState({});

  return (
    <BrowserRouter>
      <dataContext.Provider value={{currentUser, setCurrentUser}}>
        <WelcomeNavbar />
        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/home/*' element={<Homepage />}>
            <Route path='current-challenges' element={<CurrentChallenges />} />
          </Route>
          <Route path='/about' element={<AboutUsPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='/register' element={<RegistrationPage />} />
          {/* === PRIVATE ROUTES === */}
          {
            currentUser._userID
            &
            <>
              <Route path='/currentUser/:currentUser._userID/*' element={<CurrentUserHomepage />}>
              </Route>
            </>
          }
          {/* ====================== */}
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </dataContext.Provider>
    </BrowserRouter>
  )
}

export default App
