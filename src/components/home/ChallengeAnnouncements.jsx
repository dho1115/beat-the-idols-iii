import React, { useContext, useRef, useEffect } from 'react';
import { dataContext } from '../../App';
import { Container } from 'reactstrap';

import './Challenges.styles.css';

const ChallengeAnnouncements = () => {
   const { challengeAnnouncements } = useContext(dataContext);
   const challengeAnnouncementsRef = useRef();

   useEffect(() => {
      if (challengeAnnouncements.length > 1) {
         challengeAnnouncementsRef.current.style.gridTemplateColumns = "auto auto auto"
      }
   }, [challengeAnnouncements.length])

   if (challengeAnnouncements.length) {
      
      return (
         <Container className='challenge-announcements-container' ref={challengeAnnouncementsRef}>
            {
               challengeAnnouncements.map((val, idx) => (
                  <div className='m-1 p-1' key={idx} style={{overflowWrap: 'anywhere', overflow: 'hidden', border: idx%2==1 ? '1.5px solid green' : '1.5px solid firebrick', backgroundColor: idx%2==1 ? 'lightpink' : 'lightyellow'}}>
                     <strong>{JSON.stringify({ ...val })}</strong>
                     <div className='w-100'>
                        <button className='w-100 btn btn-success' onClick={() => alert(JSON.stringify({...val}))}>DETAILS!!!</button>
                     </div>
                  </div>
               ))
            }
         </Container>
      )
   }
   return (
      <Container className='p-3 m-1' style={{backgroundColor: 'bisque', border: '3.5px solid firebrick'}}>
         <h1>Sorry... no challenge announcements for you to look at (at least, not yet).</h1>
      </Container>
   )
}

export default ChallengeAnnouncements