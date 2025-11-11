import React, { useContext, useRef, useEffect, Suspense } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useNavigate } from 'react-router-dom';
import { dataContext } from '../../../App';
import { Container } from 'reactstrap';

//components.
import ChallengeWrapper from '../../templates/challenge_wrapper/ChallengeWrapper';

import '../Challenges.styles.css';

const AnnouncementsComponent = () => {
   const { challengeAnnouncements } = useContext(dataContext);
   const challengeAnnouncementsRef = useRef();
   const navigate = useNavigate();

   useEffect(() => {
      if (challengeAnnouncements.length) {
         if (challengeAnnouncements.length >= 5) {
            challengeAnnouncementsRef.current.style.gridTemplateColumns = "auto auto auto auto auto"
         } else {
            challengeAnnouncementsRef.current.style.gridTemplateColumns = challengeAnnouncements.map(val => `${(100 / 4) - 1}%`).join(" ");
         }
      }
      
   }, [challengeAnnouncements.length])

   if (challengeAnnouncements.length) {      
      return (
         <Container className='challenge-announcements-container p-3' ref={challengeAnnouncementsRef}>
            <ErrorBoundary fallback={<h3>Error Rendering Announcement Values!!!</h3>}>
               <Suspense fallback={<h3>...Loading.</h3>}>
                  {
                     challengeAnnouncements.map(({ announcement: { _challengeAnnouncementID, _announcementOwnerID, cover_img, headline, description, announcementEndsOn } }, idx) => (
                        <ErrorBoundary fallback={<h3>ERROR RENDERING ANNOUNCEMENT WRAPPER!!!</h3>}>
                           <ChallengeWrapper key={idx}
                              announcementID={_challengeAnnouncementID}
                              coverImg={cover_img}
                              title={headline}
                              description={description}
                              expires = {announcementEndsOn}
                              button_text={<strong>CHALLENGE DETAILS.</strong>}
                              _ownerID={_announcementOwnerID}
                              idx={idx}
                              clickLogic={() => navigate(`/currentUser/${_announcementOwnerID}/view/announcement/${_challengeAnnouncementID}`)}
                           />
                        </ErrorBoundary>
                     ))
                  }
               </Suspense>
            </ErrorBoundary>
         </Container>
      )
   }
   return (
      <Container className='p-3 m-1' style={{backgroundColor: 'bisque', border: '3.5px solid firebrick'}}>
         <h1>Sorry... no challenge announcements for you to look at (at least, not yet).</h1>
      </Container>
   )
}

export default AnnouncementsComponent