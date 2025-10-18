import { createContext, useState, useEffect } from 'react';

//Components - Lazy loaded.
import ActiveChallenge from './components/home/active-challenge/ActiveChallenge';
import AddChallengeVideos from './components/forms/challenge/challenge_videos/AddChallengeVideos';
import AddVideo from './components/forms/add_video/AddVideo';
import AnnouncementsComponent from './components/home/challenge-announcements/AnnouncementsComponent';
import AnnouncementDetailsComponent from './components/home/challenge-announcements/AnnouncementDetailsComponent';
import ChallengeForm from './components/forms/challenge/challenge_form/ChallengeForm';
import ChallengeFormComponent from './components/forms/challenge/ChallengeFormComponent';
import ChallengeFormCover from './components/forms/challenge/challenge-form-cover/ChallengeFormCover';
import ChallengeVideos from './components/view_videos/ChallengeVideos';
import WelcomeNavbar from './components/navigationbars/welcome/WelcomeNavbar';

//Dependencies.
import { lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { fetchDataAPI } from './functions/fetchapi';
import { welcomeNavbarLinks } from './components/navigationbars/welcome/welcome_navbar_links';
import { UpdateDataAPI } from './functions/updateapi';
import { DateTime } from 'luxon';

//Functions.
import { calculateHighestVote, updateVideoRecords } from './components/home/active-challenge/functions';
import { findExpiredChallenges, timeRemaining, deleteExpiredChallenges } from './functions/remainingtime';
import { deleteObjectAPI } from './functions/deleteapi';

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
  const [currentUser, setCurrentUser] = useState({username: '', password: '', email: '', addImage: '', imageSource: '', personalImages: []});
  const [allUsers, setAllUsers] = useState([]);
  const [challengeAnnouncements, setChallengeAnnouncements] = useState([])
  const [currentChallenges, setCurrentChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [welcomeLinks, setWelcomeLinks] = useState([]);

  const logoutLogic = async () => {
    try {
      const updateCurrentUser = await UpdateDataAPI("http://localhost:3003/currentUser", {});
       
       setCurrentUser({});
    } catch (err) {
      console.error({ message: 'logoutLogic error!!!', err, errMessage: err.message, errCode: err.code, status: err.status })
    }
  } //logout logic.
  
  useEffect(() => {
    fetchDataAPI('http://localhost:3003/currentUser')
      .then(_currentUser => {
        setIsLoading(true);
        setCurrentUser(prv => ({ ...prv, ..._currentUser }));
        return fetchDataAPI("http://localhost:3003/allUsers");
      })
      .then(_allUsers => {
        setAllUsers(prv => ([...prv, ..._allUsers]));
        return fetchDataAPI("http://localhost:3003/activeChallenges");
      })
      .then(_currentChallenges => {
        const expired_challenges = findExpiredChallenges(_currentChallenges, DateTime, timeRemaining);

        if (expired_challenges.length) {
          Promise.all(deleteExpiredChallenges(expired_challenges, deleteObjectAPI))
            .then(response => {
              console.log({ message: 'DELETE IS SUCCESSFUL!!!', response });
              return fetchDataAPI("http://localhost:3003/activeChallenges");
            })
            .then(_currentChallenges => setCurrentChallenges(prv => ([...prv, ..._currentChallenges])))
            .catch(error => console.error({ message: "ERROR DELETING EXPIRED CHALLENGE (App.jsx)!!!", error, errorMessage: error.message, code: error.code }));

          return fetchDataAPI("http://localhost:3003/videos")
        } //LOGIC FOR DELETING ANY EXPIRED CHALLENGES.

        setCurrentChallenges(prv => ([...prv, ..._currentChallenges]))

        return fetchDataAPI("http://localhost:3003/videos");
      })
      .then(allVideos => {
        setVideos(prv => ([...prv, ...allVideos]))
        setIsLoading(false);
      })
      .catch(error => console.error({ message: "Promise.all error inside App.jsx!!!", error, errorMessage: error.message, errorStatus: error.status }));
    return () => {
      setVideos([]);
      setCurrentChallenges([])
    };
  }, [])

  useEffect(() => {
    if (currentUser.id && currentUser.username) {
      setWelcomeLinks(
        [
          ...welcomeNavbarLinks(
            currentUser.username, //username
            currentUser.id, //id
            { logoutLogic, all: 'all' } //options
          )
        ].filter(({ path }) => path != location.pathname));
    } else setWelcomeLinks([...welcomeNavbarLinks()].filter(({ path }) => path != location.pathname));
    return () => {

    };
  }, [currentUser.id, currentUser.username, location.pathname])

  return (
    <dataContext.Provider value={{ challengeAnnouncements, setChallengeAnnouncements, currentUser, setCurrentUser, allUsers, setAllUsers, currentChallenges, setCurrentChallenges, isLoading, videos, setVideos, welcomeLinks, setWelcomeLinks }}>
      <WelcomeNavbar />
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/home/*' element={<Homepage />}>
          <Route path='current-challenges' element={<CurrentChallenges />} />
          <Route path='active-challenge/:_challengeID' element={
            currentChallenges.length ?
              <ActiveChallenge /> : <Homepage />
          } />
          <Route path='challenge-announcements' element={<AnnouncementsComponent />} />
        </Route>
        <Route path='/about' element={<AboutUsPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/register' element={<RegistrationPage />} />
        {/* === PRIVATE ROUTES === */}
        {
          (currentUser.id && currentUser.username)
          &&
          <Route path='/currentUser/:user' element={<CurrentUserHomepage />}>
            <Route path="challenge-form/*" element={<ChallengeFormComponent />}>
              <Route path='details' element={<ChallengeForm />} />
              <Route path='add-video' element={<AddChallengeVideos />} />
              <Route path='cover' element={<ChallengeFormCover />} />
            </Route>
            <Route path="add-challenge-video" element={<AddVideo />} />
            <Route path="view/challengeVideos/:filter" element= {<ChallengeVideos />} />
            <Route path="view/challenges/active" element={<CurrentChallenges />} />
            <Route path="view/challenges/announcements/*" element={<AnnouncementsComponent />} />
            <Route path="view/announcement/:id" element={ <AnnouncementDetailsComponent />} />
          </Route>
        }          
        {/* ====================== */}
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </dataContext.Provider>
  )
}

export default App
