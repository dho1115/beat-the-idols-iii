import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap';

//Context
import { dataContext } from '../../../App';

import "../Challenges.styles.css";

const AnnouncementDetailsComponent = () => {
   const { user, id } = useParams();
   const { challengeAnnouncements } = useContext(dataContext);

   const announcementDetails = challengeAnnouncements.find(({ announcement: { _challengeAnnouncementID } }) => _challengeAnnouncementID == id)
   
   return (
      <div>
         <header>
            <h3>CHALLENGE #{id} OWNED BY {user}.</h3>
         </header>
         <Container>
            <strong>{JSON.stringify(JSON.stringify(announcementDetails.announcement))}</strong>
         </Container>
      </div>
   )
}

export default AnnouncementDetailsComponent