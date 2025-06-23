import { createContext, useState, useEffect } from 'react';

//Components - Lazy loaded.
import WelcomeNavbar from './components/navigationbars/welcome/WelcomeNavbar';

//Dependencies.
import { lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { fetchDataAPI } from './functions/fetchapi';

//Pages - Lazy loaded.
const AboutUsPage = lazy(() => import('./pages/about/AboutUsPage'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));
const Homepage = lazy(() => import('./pages/home/Homepage'));
const RegistrationPage = lazy(() => import('./pages/registration/RegistrationPage'));
const WelcomePage = lazy(() => import('./pages/welcome/WelcomePage'));
const CurrentUserHomepage = lazy(() => import('./pages/private_pages/userhomepage/CurrentUserHomepage'));
const CurrentChallenges = lazy(() => import("./components/home/CurrentChallenges"));

import './App.css';

export const dataContext = createContext();
  
function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [currentChallenges, setCurrentChallenges] = useState([]);
  const [mainRoutes, setMainRoutes] = useState([{ name: 'welcome', path: '/' }, { name: 'home', path: '/home' }, { name: 'about', path: '/about' }, { name: 'contact', path: '/contact' }])  

  useEffect(() => {
    console.log("*** USE EFFECT(fn, []) IN APP.JSX HAS RAN!!! ***");

    const fetchResult = fetchDataAPI('http://localhost:3003/currentUser');
    fetchResult
      .then(data => setCurrentUser(prv => ({ ...prv, ...data })))
      .catch(error => console.error({ message: '!!! ERROR !!! from fetchResult/currentUser.', errorMessage: error.message, error, errorCode: error.code, status: error.status }))
      .finally(() => console.log(`Final result for currentUser: ${JSON.stringify(currentUser)}.`))
    
    return () => {
      
    };
  }, [])

  return (
    <BrowserRouter>
      <dataContext.Provider value={{currentUser, setCurrentUser, allUsers, setAllUsers, currentChallenges, setCurrentChallenges, mainRoutes, setMainRoutes}}>
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
          <Route path='/currentUser/:user' element={<CurrentUserHomepage />}>
            <Route path='' element={<h3>If you are seeing this, then you don't have child pages.</h3>} />
          </Route>
          {/* ====================== */}
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </dataContext.Provider>
    </BrowserRouter>
  )
}

export default App
