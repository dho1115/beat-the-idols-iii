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
  // alert("READ notes.txt!!!")
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [currentChallenges, setCurrentChallenges] = useState([]);
  const [welcomeLinks, setWelcomeLinks] = useState([{ name: 'welcome', path: '/' }, { name: 'home', path: '/home' }, { name: 'about', path: '/about' }, { name: 'contact', path: '/contact' }, {name: 'LOGIN/SIGN UP!!!', path: '/register'}]);

  useEffect(() => {
    fetchDataAPI('http://localhost:3003/currentUser')
      .then(_currentUser => {
        setCurrentUser(prv => ({ ...prv, ..._currentUser }));
  
        return fetchDataAPI("http://localhost:3003/allUsers");
      })
      .then(_allUsers => {
        console.log({ message: "fetch allUsers *** SUCCESS!!! ***", _allUsers });
        setAllUsers(prv => ([...prv, ..._allUsers]));

        return fetchDataAPI("http://localhost:3003/currentChallenges");
      }).then(_currentChallenges => {
        console.log({ message: "fetch currentChallenges *** SUCCESS!!! ***", _currentChallenges });
        setCurrentChallenges(prv => ([...prv, ..._currentChallenges]));
      })
      .catch(error => console.error({ message: "Promise.all error inside App.jsx!!!", error, errorMessage: error.message, errorStatus: error.status }));    
    return () => {
      
    };
  }, [])

  useEffect(() => {
    const updatedWelcomeLinks = (currentUser.id && currentUser.username) ?
      [...welcomeLinks.filter(({ path }) => path != '/register'), { name: `${currentUser.username}'s homepage`, path: `/currentUser/${currentUser.username}` }]
      :
      welcomeLinks;
      setWelcomeLinks(updatedWelcomeLinks);
    return () => {
      
    };
  }, [currentUser.id, currentUser.username])

  return (
    <BrowserRouter>
      <dataContext.Provider value={{currentUser, setCurrentUser, allUsers, setAllUsers, currentChallenges, setCurrentChallenges, welcomeLinks, setWelcomeLinks}}>
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
            (currentUser.id && currentUser.username)
            &&
            <Route path='/currentUser/:user' element={<CurrentUserHomepage />}>
              <Route path='' element={<h3>If you are seeing this, then you don't have child pages.</h3>} />
            </Route>
          }          
          {/* ====================== */}
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </dataContext.Provider>
    </BrowserRouter>
  )
}

export default App
