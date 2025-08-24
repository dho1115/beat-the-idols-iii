import React, { useContext } from 'react';

import { dataContext } from '../../App';
import { Container } from 'reactstrap';

const ChallengeAnnouncements = () => {
   const { challengeAnnouncements } = useContext(dataContext);

   if (challengeAnnouncements.length) {
      return (
         <div>
            {
               ChallengeAnnouncements.map((val, idx) => (
                  <div className='m-1 p-1' key={idx}>
                     <strong>{JSON.stringify({...val})}</strong>
                  </div>
               ))
            }
         </div>
      )
   }
   return (
      <Container className='p-3 m-1' style={{backgroundColor: 'bisque', border: '3.5px solid firebrick'}}>
         <h1>Sorry... no challenge announcements for you to look at (at least, not yet).</h1>
      </Container>
   )
}

export default ChallengeAnnouncements