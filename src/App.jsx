import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Components - Lazy loaded.
import ActiveChallenge from './components/home/active-challenge/ActiveChallenge';
import AddChallengeVideos from './components/forms/challenge/challenge_videos/AddChallengeVideos';
import AddVideo from './components/forms/add_video/AddVideo';
import AnnouncementsComponent from './components/home/challenge-announcements/AnnouncementsComponent';
import AnnouncementDetailsComponent from './components/home/challenge-announcements/AnnouncementDetailsComponent';
import ChallengeForm from './components/forms/challenge/challenge_form/ChallengeForm';
import ChallengeFormComponent from './components/forms/challenge/ChallengeFormComponent';
import ChallengeFormCover from './components/forms/challenge/challenge-form-cover/ChallengeFormCover';
import ChallengeFormValidation from './components/forms/challenge/challenge_form/ChallengeFormValidation';
import ChallengeVideos from './components/view_videos/ChallengeVideos';
import CurrentChallenges from './components/home/CurrentChallenges';
import WelcomeNavbar from './components/navigationbars/welcome/WelcomeNavbar';

//Dependencies.
import { lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { fetchDataAPI, fetchDataThenSetState } from './functions/fetchapi';
import { welcomeNavbarLinks } from './components/navigationbars/welcome/welcome_navbar_links';
import { DateTime } from 'luxon';

//Functions.
import { calculateHighestVote, updateRecordInVideosState, updateVideoRecords } from './components/home/active-challenge/functions';
import { UpdateDataAPI, UpdateDataInDBThenSetState } from './functions/updateapi';
import { findExpiredChallenges, timeRemaining, deleteExpiredChallenges } from './functions/remainingtime';
import { deleteObjectAPI } from './functions/deleteapi';

//Pages - Lazy loaded.
const AboutUsPage = lazy(() => import('./pages/about/AboutUsPage'));
const ContactPage = lazy(() => import('./pages/contact/ContactPage'));
const CurrentUserHomepage = lazy(() => import('./pages/private_pages/userhomepage/CurrentUserHomepage'));
const Homepage = lazy(() => import('./pages/home/Homepage'));
const RegistrationPage = lazy(() => import('./pages/registration/RegistrationPage'));
const WelcomePage = lazy(() => import('./pages/welcome/WelcomePage'));

export const dataContext = createContext();

import './App.css';

function App() {
  // alert("New Notes. Read!!!")
  const location = useLocation();
  const navigate = useNavigate();
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
          Promise.all(
            expired_challenges.map((expiredChallenge) => {
              const { videosInChallenge } = expiredChallenge; //destructure videosInChallenge prop.
              const highestVote = calculateHighestVote(videosInChallenge); //returns this highest vote using Math.max
              const leadersAndLosers = updateVideoRecords(expiredChallenge, highestVote); //add 1 to win/loss/tie and calculates record.
              const videos_updated = updateRecordInVideosState(videos, leadersAndLosers); //updates videos state with leadersAndLosers.

              return UpdateDataInDBThenSetState(UpdateDataAPI, 'http://localhost:3003/videos', videos_updated, () => setVideos(videos_updated))
            })
          )
            .then(() => Promise.all(deleteExpiredChallenges(expired_challenges, deleteObjectAPI)))
            .catch(error => console.error({ message: "Something went wrong with updating videos or deleting challenges!!!", error, errorMessage: error.message, errorCode: error.code }));
        } //LOGIC FOR DELETING ANY EXPIRED CHALLENGES.

        const expired_challenges_ids = expired_challenges.map(({ id }) => id);

        const unexpired_challenges = _currentChallenges.filter(val => !expired_challenges_ids.includes(val.id))
        
        setCurrentChallenges(prv => ([...prv, ...unexpired_challenges]))

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
              <Route path='details' element={<ChallengeFormValidation />} />
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
