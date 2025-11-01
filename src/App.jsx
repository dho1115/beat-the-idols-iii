import { createContext, useState, useEffect } from 'react';

//Components - Lazy loaded.
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
import { lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { fetchDataAPI, fetchDataThenSetState } from './functions/fetchapi';
import { welcomeNavbarLinks } from './components/navigationbars/welcome/welcome_navbar_links';
import { DateTime } from 'luxon';

//Functions.
import { handleExpiredActiveChallenges } from './functions/AppJsxFunctions';
import { PatchDataAPI } from './functions/patchapi';
import { UpdateDataAPI } from './functions/updateapi';
import { findExpiredChallenges } from './functions/remainingtime';
import { deleteObjectAPI } from './functions/deleteapi';
import { InitialFetchDBandUpdateState } from './functions/AppJsxFunctions';
import { updateFinalStatusesForVideos } from './components/home/active-challenge/functions';

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
  const [currentUser, setCurrentUser] = useState({ username: '', password: '', email: '', addImage: '', imageSource: '', personalImages: [] });
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
      .then(array => setIsLoading(false))
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
    // const expiredChallenges = findExpiredChallenges(currentChallenges, DateTime);

    // if (currentChallenges.length && expiredChallenges.length && videos.length) {
    //   const challengeVideosFinalStatuses = expiredChallenges
    //     .map(expiredChallenge => updateFinalStatusesForVideos(expiredChallenge, location.pathname))
    //     .reduce((accumulator, array) => {
    //       accumulator = [...accumulator, ...array];
    //       return accumulator;
    //     }, []) //[{finalStatus, _videoID, video_data}]
      
    //   challengeVideosFinalStatuses.forEach(async ({ _videoID, finalStatus }) => {
    //     const { record } = videos.find(({ id }) => id == _videoID);
    //     const { wins, losses, ties } = record;
    //     if (finalStatus == 'WINNER') {
    //       const wins_updated = wins + 1;
    //       const winPct_updated = (wins_updated) / (wins_updated + losses + ties);
          
    //       await PatchDataAPI(`http://localhost:3003/videos/${_videoID}`, { record: { ...record, wins: wins_updated, winPct: winPct_updated } });
    //     }
    //     else if (finalStatus == 'LOSER') {
    //       const losses_updated = losses + 1;
    //       const winPct_updated = wins / (wins + losses_updated + ties);
          
    //       await PatchDataAPI(`http://localhost:3003/videos/${_videoID}`, { record: { ...record, losses: losses_updated, winPct: winPct_updated } });
    //     }
    //     else {
    //       const ties_updated = ties + 1;
    //       const winPct_updated = wins / (wins + losses + ties_updated);
          
    //       await PatchDataAPI(`http://localhost:3003/videos/${_videoID}`, { record: { ...record, ties: ties_updated, winPct: winPct_updated } });
    //     }
    //   })

    //   fetchDataThenSetState(fetchDataAPI, "http://localhost:3003/videos", data => setVideos(data))
    //     .then(data => {
    //       console.log({ data });
    //       if (data.length) {
    //         expiredChallenges.forEach(({ id }) =>
    //           deleteObjectAPI(`http://localhost:3003/activeChallenges/${id}`)
    //             .catch(error => console.error({ message: "ERROR with deleteObjectAPI!!!", url_to_delete: `http://localhost:3003/activeChallenges/${id}`, error, errorMessage: error.message, errorStack: error.stack, errorName: error.name })))
    //       }
    //       else throw new Error({ message: `ERROR!!! data has not set (yet). data is still ${JSON.stringify(data)}.`, data })
    //     })
    //     .catch(error => ({ message: "Error in fetchDataThenSetState!!!", location: location.pathname, error, errorMessage: error.message, errorName: error.name, errorStack: error.stack }));
    // }
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