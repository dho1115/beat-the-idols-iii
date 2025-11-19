import { createContext, useState, useEffect, lazy } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

//Components.
import ActiveChallenge from './components/home/active-challenge/ActiveChallenge';
import AddChallengeVideos from './components/forms/challenge/challenge_videos/AddChallengeVideos';
import AddVideo from './components/forms/add_video/AddVideo';
import AnnouncementsComponent from './components/home/challenge-announcements/AnnouncementsComponent';
import AnnouncementDetailsComponent from './components/home/challenge-announcements/AnnouncementDetailsComponent';
import ChallengeFormComponent from './components/forms/challenge/ChallengeFormComponent';
import ChallengeFormCover from './components/forms/challenge/challenge-form-cover/ChallengeFormCover';
import ChallengeFormValidation from './components/forms/challenge/challenge_form/ChallengeFormValidation';
import ChallengeVideos from './components/view_videos/ChallengeVideos';
import CurrentChallenges from './components/home/CurrentChallenges';
import WelcomeNavbar from './components/navigationbars/welcome/WelcomeNavbar';

//Dependencies.
import { welcomeNavbarLinks } from './components/navigationbars/welcome/welcome_navbar_links';
import { DateTime } from 'luxon';

//Functions.
import { findExpiredChallenges } from './functions/remainingtime';
import { findExpiredAnnouncements } from './functions/AppJsxFunctions';
import { handleExpiredActiveChallenges } from './functions/AppJsxFunctions';
import { UpdateDataAPI } from './functions/updateapi';
import { InitialFetchDBandUpdateState } from './functions/AppJsxFunctions';
import { fetchDataAPI, fetchDataThenSetState } from './functions/fetchapi';

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
  const [currentUser, setCurrentUser] = useState({ username: '', password: '', email: '', addImage: '', imageSource: '', personalImages: [] });
  const [allUsers, setAllUsers] = useState([]);
  const [challengeAnnouncements, setChallengeAnnouncements] = useState([])
  const [currentChallenges, setCurrentChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [welcomeLinks, setWelcomeLinks] = useState([]);

  const logoutLogic = async () => {
    try {
      await UpdateDataAPI("http://localhost:3003/currentUser", {});

      setCurrentUser({});
    } catch (err) {
      console.error({ message: 'logoutLogic error!!!', err, errMessage: err.message, errCode: err.code, status: err.status })
    }
  } //logout logic.

  useEffect(() => {
    setIsLoading(true)

    Promise.all(
      [
        InitialFetchDBandUpdateState('http://localhost:3003/currentUser', _currentUser => setCurrentUser(prv => ({ ...prv, ..._currentUser })), "currentUser", currentUser),
        InitialFetchDBandUpdateState("http://localhost:3003/allUsers", allUsers => setAllUsers(allUsers), "allUsers", allUsers),
        InitialFetchDBandUpdateState("http://localhost:3003/videos", videos => setVideos(videos), "videos", videos),
        InitialFetchDBandUpdateState("http://localhost:3003/challengeAnnouncements", _challengeAnnouncements => setChallengeAnnouncements(_challengeAnnouncements), "challengeAnnouncements", challengeAnnouncements),
        InitialFetchDBandUpdateState('http://localhost:3003/activeChallenges', _activeChallenges => setCurrentChallenges(_activeChallenges), 'currentChallenges', currentChallenges)
      ]
    )
      .then(() => setIsLoading(false))
      .catch(error => console.error({ message: "Promise.all ERROR!!! - Did you forget that Promise.all(array: []) takes an ARRAY???", error, errorCode: error.code, errorMessage: error.message, errorStack: error.stack }));

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

  useEffect(() => {
    try {
      const expiredAnnouncements = findExpiredAnnouncements(challengeAnnouncements, DateTime);

      console.log({ expiredAnnouncements });

      const expiredChallenges = findExpiredChallenges(currentChallenges, DateTime, "date")

      if (expiredChallenges.length) {
        handleExpiredActiveChallenges(expiredChallenges, videos, currentChallenges, DateTime, data => setVideos(data), location.pathname)
          .then(async value => {
            const fetchCurrentChallenges = await fetchDataThenSetState(fetchDataAPI, "http://localhost:3003/activeChallenges", value => setCurrentChallenges(value));

            const checkForExpiredChallenges = findExpiredChallenges(currentChallenges, DateTime)

            return { ...value, currentChallenges: fetchCurrentChallenges, anyExpiredChallenges: checkForExpiredChallenges };
          })
          .then(value => {
            value.anyExpiredChallenges.length && console.error(`Please wait while we clear out all expired challenges. Expired challenges currently is ${JSON.stringify(value.expiredChallenges)}.`)
            console.log({ value });
            return navigate("/");
          })
          .catch(error => ({ message: "ERROR inside handleExpiredChallenges function call!!!", location: location.pathname, error, errorMessage: error.message, errorName: error.name, expiredChallenges, videos, currentChallenges }));
      }
    } catch (error) {
      console.error({ message: "ERROR inside useEffect(f, [isLoading, currentChallenges.length, challengeAnnouncements.length])", error, errorMessage: error.message })
    };
  }, [isLoading, currentChallenges.length, challengeAnnouncements.length])

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
            <Route path="view/challengeVideos/:filter" element={<ChallengeVideos />} />
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