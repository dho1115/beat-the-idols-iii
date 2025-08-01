import { createContext, useState, useEffect } from 'react';

//Components - Lazy loaded.
import AddVideo from './components/forms/add_video/AddVideo';
import ChallengeForm from './components/forms/challenge/ChallengeForm';
import ChallengeVideos from './components/view_videos/ChallengeVideos';
import WelcomeNavbar from './components/navigationbars/welcome/WelcomeNavbar';

//Dependencies.
import { lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { fetchDataAPI } from './functions/fetchapi';
import { welcomeNavbarLinks } from './components/navigationbars/welcome/welcome_navbar_links';
import { PostDataAPI } from './functions/postapi';

//Pages - Lazy loaded.
const AboutUsPage = lazy(() => import('./pages/about/AboutUsPage'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));
const CurrentUserHomepage = lazy(() => import('./pages/private_pages/userhomepage/CurrentUserHomepage'));
const CurrentChallenges = lazy(() => import("./components/home/CurrentChallenges"));
const Homepage = lazy(() => import('./pages/home/Homepage'));
const RegistrationPage = lazy(() => import('./pages/registration/RegistrationPage'));
const WelcomePage = lazy(() => import('./pages/welcome/WelcomePage'));

import './App.css';

export const dataContext = createContext();
  
function App() {
  // alert("New Notes. Read!!!")
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [challengeAnnouncements, setChallengeAnnouncements] = useState([])
  const [currentChallenges, setCurrentChallenges] = useState([]);
  const [videos, setVideos] = useState([]);
  const [welcomeLinks, setWelcomeLinks] = useState([]);
  const logoutLogic = async () => {
    try {
       const postCurrentUser = await PostDataAPI("http://localhost:3003/currentUser", {});
       
       setCurrentUser({});
              
       return `Successfully updated currentUser: ${JSON.stringify(currentUser)}. postCurrentUser is ${postCurrentUser}.`
    } catch (err) {
      console.error({ message: 'logoutLogic error!!!', err, errMessage: err.message, errCode: err.code, status: err.status })
    }
  } //logout logic.
  
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
    if (currentUser.id && currentUser.username) {
      setWelcomeLinks([...welcomeNavbarLinks(currentUser.username, currentUser.id, { logoutLogic })].filter(({ path }) => path != location.pathname));
    } else setWelcomeLinks([...welcomeNavbarLinks()].filter(({ path }) => path != location.pathname));
    return () => {

    };
  }, [currentUser.id, currentUser.username, location.pathname])

  return (
    <>
      <dataContext.Provider value={{ challengeAnnouncements, setChallengeAnnouncements, currentUser, setCurrentUser, allUsers, setAllUsers, currentChallenges, setCurrentChallenges, videos, setVideos, welcomeLinks, setWelcomeLinks }}>
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
              <Route path="challenge-form" element={<ChallengeForm />} />
              <Route path="add-challenge-video" element={<AddVideo />} />
              <Route path="/view/challengeVideos/:filter" element={<ChallengeVideos />} />
            </Route>
          }          
          {/* ====================== */}
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </dataContext.Provider>
    </>
  )
}

export default App
